import { AppLayout } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import {
  Map,
  CheckCircle2,
  Circle,
  Lock,
  ChevronRight,
  Download,
  Sparkles,
  Clock,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

const phases = [
  {
    id: 1,
    title: "Foundation Phase",
    duration: "4 weeks",
    status: "completed",
    progress: 100,
    modules: [
      { name: "HTML & CSS Basics", status: "completed", hours: 10 },
      { name: "JavaScript Fundamentals", status: "completed", hours: 15 },
      { name: "Git & Version Control", status: "completed", hours: 5 },
      { name: "Problem Solving Basics", status: "completed", hours: 8 },
    ],
  },
  {
    id: 2,
    title: "Core Development",
    duration: "8 weeks",
    status: "in-progress",
    progress: 65,
    modules: [
      { name: "React.js Framework", status: "completed", hours: 20 },
      { name: "State Management", status: "in-progress", hours: 12 },
      { name: "Node.js Backend", status: "locked", hours: 18 },
      { name: "Database Design", status: "locked", hours: 15 },
    ],
  },
  {
    id: 3,
    title: "Advanced Skills",
    duration: "6 weeks",
    status: "locked",
    progress: 0,
    modules: [
      { name: "System Design", status: "locked", hours: 20 },
      { name: "Cloud Services (AWS)", status: "locked", hours: 15 },
      { name: "DevOps & CI/CD", status: "locked", hours: 12 },
      { name: "Performance Optimization", status: "locked", hours: 10 },
    ],
  },
  {
    id: 4,
    title: "Career Launch",
    duration: "4 weeks",
    status: "locked",
    progress: 0,
    modules: [
      { name: "Portfolio Building", status: "locked", hours: 15 },
      { name: "Interview Preparation", status: "locked", hours: 20 },
      { name: "Mock Interviews", status: "locked", hours: 10 },
      { name: "Job Applications", status: "locked", hours: 8 },
    ],
  },
];

export default function Roadmap() {
  const totalProgress = Math.round(
    phases.reduce((acc, phase) => acc + phase.progress, 0) / phases.length
  );

  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Your Learning <span className="gradient-text">Roadmap</span>
            </h1>
            <p className="text-muted-foreground">
              Full Stack Developer Path • AI-Generated & Personalized
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="gradient">
              <Sparkles className="w-4 h-4 mr-2" />
              Regenerate
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <GlassCard className="mb-8" hover>
          <div className="flex items-center gap-8">
            <ProgressRing progress={totalProgress} size={140}>
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-foreground">
                  {totalProgress}%
                </p>
                <p className="text-xs text-muted-foreground">Complete</p>
              </div>
            </ProgressRing>
            <div className="flex-1">
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                Overall Progress
              </h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-chart-4">1</p>
                  <p className="text-xs text-muted-foreground">Phase Complete</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">5</p>
                  <p className="text-xs text-muted-foreground">Modules Done</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">58</p>
                  <p className="text-xs text-muted-foreground">Hours Learned</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-chart-3">~8</p>
                  <p className="text-xs text-muted-foreground">Weeks Left</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Phases */}
        <div className="space-y-6">
          {phases.map((phase, phaseIndex) => (
            <GlassCard
              key={phase.id}
              className={cn(
                "relative overflow-hidden",
                phase.status === "locked" && "opacity-60"
              )}
              hover={phase.status !== "locked"}
            >
              {/* Phase Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      phase.status === "completed"
                        ? "bg-chart-4/20 text-chart-4"
                        : phase.status === "in-progress"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {phase.status === "completed" ? (
                      <Trophy className="w-6 h-6" />
                    ) : phase.status === "in-progress" ? (
                      <Map className="w-6 h-6" />
                    ) : (
                      <Lock className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-foreground">
                      Phase {phase.id}: {phase.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {phase.duration}
                      </span>
                      <span>•</span>
                      <span>{phase.modules.length} modules</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">
                      {phase.progress}%
                    </p>
                    <p className="text-xs text-muted-foreground">Progress</p>
                  </div>
                  {phase.status !== "locked" && (
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-secondary rounded-full mb-6 overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    phase.status === "completed"
                      ? "bg-chart-4"
                      : "bg-gradient-to-r from-primary to-accent"
                  )}
                  style={{ width: `${phase.progress}%` }}
                />
              </div>

              {/* Modules */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {phase.modules.map((module, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-4 rounded-lg border transition-all",
                      module.status === "completed"
                        ? "bg-chart-4/10 border-chart-4/30"
                        : module.status === "in-progress"
                        ? "bg-primary/10 border-primary/30"
                        : "bg-secondary/50 border-border/40"
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center",
                          module.status === "completed"
                            ? "bg-chart-4 text-background"
                            : module.status === "in-progress"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {module.status === "completed" ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : module.status === "in-progress" ? (
                          <Circle className="w-4 h-4" />
                        ) : (
                          <Lock className="w-3 h-3" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {module.hours}h
                      </span>
                    </div>
                    <p
                      className={cn(
                        "text-sm font-medium",
                        module.status === "locked"
                          ? "text-muted-foreground"
                          : "text-foreground"
                      )}
                    >
                      {module.name}
                    </p>
                  </div>
                ))}
              </div>

              {/* Connector Line */}
              {phaseIndex < phases.length - 1 && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-border to-transparent" />
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
