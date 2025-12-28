import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bot,
  Send,
  Sparkles,
  User,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { streamChat } from "@/lib/ai-chat";
import { useToast } from "@/hooks/use-toast";
import { RoadmapDisplay, parseRoadmapFromText } from "@/components/RoadmapDisplay";


export default function AIAgent() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI Career Agent powered by Google Gemini. I can help you create personalized learning roadmaps, analyze your skills, prepare for interviews, and guide you towards your dream career. What would you like to explore today?",
      timestamp: new Date(),
      type: "text",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentGoal, setCurrentGoal] = useState("");
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (customPrompt, promptType, goal) => {
    const messageText = customPrompt || input;
    if (!messageText.trim() || isLoading) return;

    // Detect if this is a roadmap request
    const isRoadmapRequest = promptType === "roadmap" || 
      /roadmap|learning path|career path|how to become|guide.*to.*become/i.test(messageText);
    
    const requestType = isRoadmapRequest ? "roadmap" : "chat";
    
    // Extract goal from the message if not provided
    const extractedGoal = goal || messageText.match(/(?:become|for|to)\s+(?:a\s+)?(.+?)(?:\.|$)/i)?.[1] || messageText;
    if (isRoadmapRequest) {
      setCurrentGoal(extractedGoal);
    }

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Prepare messages for API
    const apiMessages = [{ role: "user", content: messageText }];

    let assistantContent = "";

    await streamChat({
      messages: apiMessages,
      type: requestType,
      onDelta: (delta) => {
        assistantContent += delta;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && last.id.startsWith("streaming-")) {
            return prev.map((m, i) => 
              i === prev.length - 1 ? { ...m, content: assistantContent } : m
            );
          }
          return [
            ...prev,
            {
              id: `streaming-${Date.now()}`,
              role: "assistant",
              content: assistantContent,
              timestamp: new Date(),
              type: "text",
            },
          ];
        });
      },
      onDone: () => {
        setIsLoading(false);
        
        // Try to parse roadmap data if this was a roadmap request
        if (isRoadmapRequest) {
          try {
            // Try to parse JSON from the response
            const jsonMatch = assistantContent.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const roadmapData = JSON.parse(jsonMatch[0]);
              if (roadmapData.skills && roadmapData.tools && roadmapData.phases) {
                setMessages(prev => 
                  prev.map((m, i) => 
                    i === prev.length - 1
                      ? { 
                          ...m, 
                          id: Date.now().toString(),
                          type: "roadmap",
                          roadmapData: {
                            ...roadmapData,
                            title: roadmapData.title || extractedGoal,
                          }
                        }
                      : m
                  )
                );
                return;
              }
            }
          } catch (e) {
            console.log("Could not parse roadmap JSON, falling back to text parsing");
          }
          
          // Try markdown parsing as fallback
          const parsedRoadmap = parseRoadmapFromText(assistantContent, extractedGoal);
          if (parsedRoadmap) {
            setMessages(prev => 
              prev.map((m, i) => 
                i === prev.length - 1
                  ? { 
                      ...m, 
                      id: Date.now().toString(),
                      type: "roadmap",
                      roadmapData: parsedRoadmap
                    }
                  : m
              )
            );
            return;
          }
        }
        
        // Regular text message
        setMessages(prev => 
          prev.map((m, i) => 
            i === prev.length - 1 && m.id.startsWith("streaming-")
              ? { ...m, id: Date.now().toString() }
              : m
          )
        );
      },
      onError: (error) => {
        setIsLoading(false);
        toast({
          title: "Error",
          description: error.message || "Failed to get AI response",
          variant: "destructive",
        });
      },
    });
  };

  const renderMessage = (message) => {
    if (message.type === "roadmap" && message.roadmapData) {
      return (
        <div className="w-full py-4">
          <RoadmapDisplay data={message.roadmapData} />
        </div>
      );
    }

    return (
      <div
        className={cn(
          "flex gap-3",
          message.role === "user" && "flex-row-reverse"
        )}
      >
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
            message.role === "assistant"
              ? "bg-gradient-to-br from-primary to-accent"
              : "bg-secondary"
          )}
        >
          {message.role === "assistant" ? (
            <Bot className="w-4 h-4 text-primary-foreground" />
          ) : (
            <User className="w-4 h-4 text-foreground" />
          )}
        </div>
        <div
          className={cn(
            "max-w-[80%] rounded-xl p-4",
            message.role === "assistant"
              ? "bg-secondary/50 text-foreground"
              : "bg-gradient-to-r from-primary/20 to-accent/10 border border-primary/20"
          )}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="p-8 h-[calc(100vh-2rem)] flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                AI Career Agent
              </h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Powered by Google Gemini
              </p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <GlassCard className="flex-1 flex flex-col overflow-hidden p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div key={message.id}>
                {renderMessage(message)}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="bg-secondary/50 rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Generating your roadmap...
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/40">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-3"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for a career roadmap, e.g., 'Create a roadmap to become a Data Scientist'"
                className="flex-1 bg-secondary/50 border-border/40 focus:border-primary/40"
                disabled={isLoading}
              />
              <Button
                type="submit"
                variant="gradient"
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
          </div>
        </GlassCard>
      </div>
    </AppLayout>
  );
}
