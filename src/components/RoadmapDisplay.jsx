import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Wrench,
  Calendar,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { saveRoadmap } from "@/lib/roadmap-storage";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export function RoadmapDisplay({ data, showSaveButton = true, onSaved }) {
  const [openPhases, setOpenPhases] = useState([0]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const togglePhase = (index) => {
    setOpenPhases((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save roadmaps.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    const { error } = await saveRoadmap(data);
    setIsSaving(false);

    if (error) {
      toast({
        title: "Failed to save",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setIsSaved(true);
      toast({
        title: "Roadmap saved!",
        description: "You can access it from your saved roadmaps.",
      });
      onSaved?.();
    }
  };

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold gradient-text mb-2">
              {data.title}
            </h2>
            <p className="text-muted-foreground">
              {data.subtitle || "Your personalized career roadmap is ready."}
            </p>
          </div>
          {showSaveButton && (
            <Button
              variant={isSaved ? "default" : "outline"}
              size="sm"
              onClick={handleSave}
              disabled={isSaving || isSaved}
              className="shrink-0"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Bookmark className={cn("w-4 h-4 mr-2", isSaved && "fill-current")} />
              )}
              {isSaved ? "Saved" : "Save Roadmap"}
            </Button>
          )}
        </div>
      </div>

      {/* Skills & Tools Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Required Skills */}
        <GlassCard hover>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-display font-semibold text-foreground">
              Required Skills
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg bg-secondary/80 text-sm text-foreground border border-border/40 hover:border-primary/30 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </GlassCard>

        {/* Tools & Technologies */}
        <GlassCard hover>
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-display font-semibold text-foreground">
              Tools & Technologies
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.tools.map((tool, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg bg-accent/10 text-sm text-foreground border border-accent/20 hover:border-accent/40 transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Learning Roadmap Phases */}
      <GlassCard hover>
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-chart-3" />
          <h3 className="text-lg font-display font-semibold text-foreground">
            Month-wise Learning Roadmap
          </h3>
        </div>

        <div className="space-y-3">
          {data.phases.map((phase, index) => (
            <Collapsible
              key={index}
              open={openPhases.includes(index)}
              onOpenChange={() => togglePhase(index)}
            >
              <CollapsibleTrigger className="w-full">
                <div
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer",
                    openPhases.includes(index)
                      ? "bg-primary/10 border-primary/30"
                      : "bg-secondary/30 border-border/40 hover:border-primary/20"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                        openPhases.includes(index)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {index + 1}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-foreground">{phase.name}</p>
                      {phase.duration && (
                        <p className="text-xs text-muted-foreground">
                          {phase.duration}
                        </p>
                      )}
                    </div>
                  </div>
                  {openPhases.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 ml-11 p-4 rounded-lg bg-secondary/20 border border-border/20">
                  <ul className="space-y-2">
                    {phase.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-foreground">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

// Parser function to extract structured roadmap data from AI response
export function parseRoadmapFromText(text, userGoal) {
  try {
    // Try to parse as JSON first
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.skills && parsed.tools && parsed.phases) {
        return {
          title: parsed.title || userGoal,
          subtitle: parsed.subtitle || "Your personalized career roadmap is ready.",
          skills: parsed.skills,
          tools: parsed.tools,
          phases: parsed.phases,
        };
      }
    }
  } catch {
    // Not JSON, try to parse markdown
  }

  // Fallback: Extract from markdown format
  const skills = [];
  const tools = [];
  const phases = [];

  // Extract skills section
  const skillsMatch = text.match(/(?:required skills|skills to learn|key skills)[:\s]*([\s\S]*?)(?=\n(?:tools|technologies|phase|##)|$)/i);
  if (skillsMatch) {
    const skillLines = skillsMatch[1].match(/[-*•]\s*(.+)/g);
    if (skillLines) {
      skillLines.forEach(line => {
        const skill = line.replace(/^[-*•]\s*/, "").trim();
        if (skill && skill.length < 100) skills.push(skill);
      });
    }
  }

  // Extract tools section
  const toolsMatch = text.match(/(?:tools|technologies)[:\s]*([\s\S]*?)(?=\n(?:phase|roadmap|##)|$)/i);
  if (toolsMatch) {
    const toolLines = toolsMatch[1].match(/[-*•]\s*(.+)/g);
    if (toolLines) {
      toolLines.forEach(line => {
        const tool = line.replace(/^[-*•]\s*/, "").trim();
        if (tool && tool.length < 100) tools.push(tool);
      });
    }
  }

  // Extract phases
  const phaseMatches = text.matchAll(/(?:phase\s*(\d+)|##\s*phase\s*(\d+))[:\s]*([^\n]*)\n([\s\S]*?)(?=(?:phase\s*\d|##\s*phase|$))/gi);
  for (const match of phaseMatches) {
    const phaseNum = match[1] || match[2];
    const phaseName = match[3]?.trim() || `Phase ${phaseNum}`;
    const content = match[4] || "";
    
    const topics = [];
    const topicLines = content.match(/[-*•]\s*(.+)/g);
    if (topicLines) {
      topicLines.forEach(line => {
        const topic = line.replace(/^[-*•]\s*/, "").trim();
        if (topic && topic.length < 200) topics.push(topic);
      });
    }

    if (topics.length > 0) {
      phases.push({
        name: phaseName,
        topics,
      });
    }
  }

  // If we found meaningful data, return it
  if (skills.length > 0 || tools.length > 0 || phases.length > 0) {
    return {
      title: userGoal,
      subtitle: "Your personalized career roadmap is ready.",
      skills: skills.length > 0 ? skills : ["Programming Fundamentals", "Problem Solving", "Communication"],
      tools: tools.length > 0 ? tools : ["VS Code", "Git", "GitHub"],
      phases: phases.length > 0 ? phases : [{
        name: "Phase 1: Foundation",
        topics: ["Learn the basics", "Practice regularly"]
      }],
    };
  }

  return null;
}