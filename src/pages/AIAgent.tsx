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
  Map,
  FileText,
  Brain,
  Lightbulb,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickPrompts = [
  { icon: Map, label: "Generate Roadmap", prompt: "Create a personalized learning roadmap for becoming a Full Stack Developer" },
  { icon: FileText, label: "Resume Tips", prompt: "Give me tips to improve my resume for software engineering roles" },
  { icon: Brain, label: "Interview Prep", prompt: "Help me prepare for technical interviews at top tech companies" },
  { icon: Lightbulb, label: "Skill Gap Analysis", prompt: "Analyze the skills I need to develop for a career in data science" },
];

export default function AIAgent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI Career Agent powered by Google Gemini. I can help you create personalized learning roadmaps, analyze your skills, prepare for interviews, and guide you towards your dream career. What would you like to explore today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (customPrompt?: string) => {
    const messageText = customPrompt || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (will be replaced with actual Gemini API call)
    setTimeout(() => {
      const responses = [
        "Based on your goals, I recommend starting with fundamentals in programming. Here's a structured 3-phase roadmap:\n\n**Phase 1: Foundation (4 weeks)**\n- HTML, CSS basics\n- JavaScript fundamentals\n- Git version control\n\n**Phase 2: Core Skills (8 weeks)**\n- React.js framework\n- Node.js backend\n- Database fundamentals\n\n**Phase 3: Advanced (6 weeks)**\n- System design\n- Cloud services (AWS)\n- DevOps practices\n\nWould you like me to break down any of these phases in more detail?",
        "Great question! Here are some key tips to strengthen your resume:\n\n1. **Quantify achievements** - Use numbers to show impact\n2. **Highlight relevant projects** - Include GitHub links\n3. **Use action verbs** - Start bullets with strong verbs\n4. **Tailor for each role** - Customize for the job description\n5. **Keep it concise** - One page for early career\n\nWould you like me to analyze a specific section of your resume?",
        "For technical interview preparation, I suggest this approach:\n\n**Data Structures & Algorithms**\n- Arrays, Strings, Hash Maps\n- Trees, Graphs, Dynamic Programming\n- Practice on LeetCode (aim for 150+ problems)\n\n**System Design**\n- Learn distributed systems concepts\n- Practice designing scalable systems\n\n**Behavioral**\n- Prepare STAR method stories\n- Research company values\n\nShall I create a detailed study plan for any of these areas?",
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
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
              <div
                key={message.id}
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
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="bg-secondary/50 rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-6 py-3 border-t border-border/40">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {quickPrompts.map((prompt, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  onClick={() => handleSend(prompt.prompt)}
                  disabled={isLoading}
                >
                  <prompt.icon className="w-4 h-4 mr-2" />
                  {prompt.label}
                </Button>
              ))}
            </div>
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
                placeholder="Ask me anything about your career..."
                className="flex-1 bg-secondary/50 border-border/40 focus:border-primary/40"
                disabled={isLoading}
              />
              <Button
                type="submit"
                variant="gradient"
                disabled={!input.trim() || isLoading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </GlassCard>
      </div>
    </AppLayout>
  );
}
