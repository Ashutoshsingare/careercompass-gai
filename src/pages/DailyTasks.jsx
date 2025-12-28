import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import {
  CalendarCheck,
  Sparkles,
  CheckCircle2,
  Circle,
  Clock,
  Flame,
  Trophy,
  Target,
  BookOpen,
  Code,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

const todaysTasks = [
  {
    id: 1,
    title: "Complete React Hooks chapter",
    type: "learning",
    duration: "45 min",
    points: 50,
    completed: true,
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Solve 2 LeetCode problems",
    type: "practice",
    duration: "1 hour",
    points: 100,
    completed: true,
    icon: Code,
  },
  {
    id: 3,
    title: "Watch system design video",
    type: "learning",
    duration: "30 min",
    points: 30,
    completed: false,
    icon: Video,
  },
  {
    id: 4,
    title: "Review portfolio projects",
    type: "career",
    duration: "20 min",
    points: 25,
    completed: false,
    icon: Target,
  },
  {
    id: 5,
    title: "Practice mock interview",
    type: "career",
    duration: "45 min",
    points: 75,
    completed: false,
    icon: Trophy,
  },
];

const weeklyProgress = [
  { day: "Mon", completed: 5, total: 5 },
  { day: "Tue", completed: 4, total: 5 },
  { day: "Wed", completed: 5, total: 5 },
  { day: "Thu", completed: 3, total: 5 },
  { day: "Fri", completed: 2, total: 5 },
  { day: "Sat", completed: 0, total: 3 },
  { day: "Sun", completed: 0, total: 3 },
];

export default function DailyTasks() {
  const [tasks, setTasks] = useState(todaysTasks);
  
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalPoints = tasks.reduce((acc, t) => acc + (t.completed ? t.points : 0), 0);
  const maxPoints = tasks.reduce((acc, t) => acc + t.points, 0);

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Daily <span className="gradient-text">Tasks</span>
            </h1>
            <p className="text-muted-foreground">
              AI-curated learning tasks based on your roadmap
            </p>
          </div>
          <Button variant="gradient">
            <Sparkles className="w-4 h-4 mr-2" />
            Regenerate Tasks
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Progress */}
          <GlassCard hover>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-semibold text-foreground">
                Today's Progress
              </h2>
              <CalendarCheck className="w-5 h-5 text-primary" />
            </div>
            
            <div className="text-center mb-6">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="url(#taskGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 56}
                    strokeDashoffset={2 * Math.PI * 56 * (1 - completedCount / tasks.length)}
                    className="transition-all duration-500"
                  />
                  <defs>
                    <linearGradient id="taskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-foreground">
                      {completedCount}/{tasks.length}
                    </p>
                    <p className="text-xs text-muted-foreground">Tasks</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">{totalPoints}</p>
                  <p className="text-xs text-muted-foreground">Points Earned</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="text-lg font-bold text-muted-foreground">{maxPoints - totalPoints}</p>
                  <p className="text-xs text-muted-foreground">Points Left</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-chart-5/10 border border-chart-5/20">
              <Flame className="w-5 h-5 text-chart-5" />
              <span className="font-medium text-foreground">14 day streak!</span>
            </div>
          </GlassCard>

          {/* Task List */}
          <GlassCard className="lg:col-span-2" hover>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-semibold text-foreground">
                Today's Learning Plan
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                ~3 hours total
              </div>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                    task.completed
                      ? "bg-chart-4/10 border-chart-4/30"
                      : "bg-secondary/30 border-border/40 hover:border-primary/30"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                      task.completed ? "bg-chart-4/20" : "bg-primary/20"
                    )}
                  >
                    <task.icon
                      className={cn(
                        "w-5 h-5",
                        task.completed ? "text-chart-4" : "text-primary"
                      )}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <p
                      className={cn(
                        "font-medium",
                        task.completed
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      )}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        +{task.points} pts
                      </span>
                    </div>
                  </div>

                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-chart-4" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Weekly Overview */}
          <GlassCard className="lg:col-span-3" hover>
            <h2 className="text-lg font-display font-semibold text-foreground mb-6">
              Weekly Overview
            </h2>
            
            <div className="grid grid-cols-7 gap-4">
              {weeklyProgress.map((day, i) => {
                const percentage = (day.completed / day.total) * 100;
                const isToday = i === 4; // Friday for demo
                
                return (
                  <div
                    key={day.day}
                    className={cn(
                      "text-center p-4 rounded-xl border transition-all",
                      isToday
                        ? "bg-primary/10 border-primary/30"
                        : "bg-secondary/30 border-border/40"
                    )}
                  >
                    <p
                      className={cn(
                        "text-sm font-medium mb-3",
                        isToday ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {day.day}
                    </p>
                    <div className="w-full h-24 bg-secondary rounded-lg overflow-hidden flex flex-col justify-end">
                      <div
                        className={cn(
                          "transition-all duration-500 rounded-t-sm",
                          percentage === 100
                            ? "bg-chart-4"
                            : percentage > 0
                            ? "bg-gradient-to-t from-primary to-accent"
                            : ""
                        )}
                        style={{ height: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-sm font-medium text-foreground mt-2">
                      {day.completed}/{day.total}
                    </p>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>
    </AppLayout>
  );
}
