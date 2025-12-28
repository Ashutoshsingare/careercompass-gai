import { AppLayout } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { FlaskConical, Play, Trophy, Clock, CheckCircle2, Lock, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const skillCategories = [
  { name: "Programming Fundamentals", skills: [{ name: "JavaScript Basics", level: 85, status: "mastered", badge: "gold" }, { name: "TypeScript", level: 70, status: "intermediate", badge: "silver" }, { name: "Python", level: 45, status: "beginner", badge: null }] },
  { name: "Frontend Development", skills: [{ name: "React.js", level: 75, status: "intermediate", badge: "silver" }, { name: "CSS & Tailwind", level: 80, status: "advanced", badge: "silver" }, { name: "Next.js", level: 30, status: "beginner", badge: null }] },
  { name: "Backend Development", skills: [{ name: "Node.js", level: 55, status: "intermediate", badge: null }, { name: "REST APIs", level: 65, status: "intermediate", badge: "bronze" }, { name: "Databases", level: 40, status: "beginner", badge: null }] },
];

const assessments = [
  { title: "JavaScript Proficiency", questions: 25, duration: "30 min", difficulty: "Intermediate", completed: true, score: 85 },
  { title: "React Developer", questions: 30, duration: "45 min", difficulty: "Intermediate", completed: true, score: 72 },
  { title: "System Design Basics", questions: 15, duration: "40 min", difficulty: "Advanced", completed: false, score: null },
  { title: "Data Structures", questions: 20, duration: "35 min", difficulty: "Intermediate", completed: false, score: null },
];

export default function SkillLab() {
  return (
    <AppLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-3xl font-display font-bold text-foreground mb-2">Skill <span className="gradient-text">Lab</span></h1><p className="text-muted-foreground">Assess your skills and track your mastery progress</p></div>
          <div className="flex items-center gap-4"><div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-chart-5/10 border border-chart-5/20"><Trophy className="w-5 h-5 text-chart-5" /><span className="font-medium text-foreground">3 Badges Earned</span></div></div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {skillCategories.map((category, i) => (
              <GlassCard key={i} hover>
                <h2 className="text-lg font-display font-semibold text-foreground mb-4">{category.name}</h2>
                <div className="space-y-4">
                  {category.skills.map((skill, j) => (
                    <div key={j} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2"><span className="font-medium text-foreground">{skill.name}</span>{skill.badge && <div className={cn("w-5 h-5 rounded-full flex items-center justify-center", skill.badge === "gold" ? "bg-chart-5" : skill.badge === "silver" ? "bg-muted-foreground" : "bg-chart-5/50")}><Star className="w-3 h-3 text-background" /></div>}</div>
                          <span className={cn("text-sm font-medium", skill.level >= 80 ? "text-chart-4" : skill.level >= 50 ? "text-primary" : "text-muted-foreground")}>{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden"><div className={cn("h-full rounded-full transition-all duration-500", skill.level >= 80 ? "bg-chart-4" : skill.level >= 50 ? "bg-gradient-to-r from-primary to-accent" : "bg-muted-foreground")} style={{ width: `${skill.level}%` }} /></div>
                      </div>
                      <Button variant="outline" size="sm"><Zap className="w-4 h-4 mr-1" />Test</Button>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
          <div className="space-y-6">
            <GlassCard hover>
              <div className="flex items-center gap-2 mb-4"><FlaskConical className="w-5 h-5 text-primary" /><h2 className="text-lg font-display font-semibold text-foreground">Skill Assessments</h2></div>
              <div className="space-y-3">
                {assessments.map((assessment, i) => (
                  <div key={i} className={cn("p-4 rounded-lg border transition-all", assessment.completed ? "bg-chart-4/10 border-chart-4/30" : "bg-secondary/30 border-border/40 hover:border-primary/30")}>
                    <div className="flex items-start justify-between mb-2">
                      <div><p className="font-medium text-foreground">{assessment.title}</p><div className="flex items-center gap-3 text-xs text-muted-foreground mt-1"><span>{assessment.questions} questions</span><span>•</span><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{assessment.duration}</span></div></div>
                      {assessment.completed ? <div className="text-right"><p className="text-lg font-bold text-chart-4">{assessment.score}%</p><CheckCircle2 className="w-4 h-4 text-chart-4 ml-auto" /></div> : <Button variant="ghost" size="sm"><Play className="w-4 h-4" /></Button>}
                    </div>
                    <div className={cn("inline-block px-2 py-0.5 rounded text-xs font-medium", assessment.difficulty === "Advanced" ? "bg-destructive/20 text-destructive" : assessment.difficulty === "Intermediate" ? "bg-primary/20 text-primary" : "bg-chart-4/20 text-chart-4")}>{assessment.difficulty}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
            <GlassCard hover>
              <div className="flex items-center gap-2 mb-4"><Trophy className="w-5 h-5 text-chart-5" /><h2 className="text-lg font-display font-semibold text-foreground">Your Badges</h2></div>
              <div className="grid grid-cols-3 gap-3">
                {["JavaScript", "React", "CSS"].map((badge, i) => (<div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-chart-5/20 to-chart-5/5 border border-chart-5/30 flex flex-col items-center justify-center p-2"><div className="w-10 h-10 rounded-full bg-chart-5 flex items-center justify-center mb-2"><Star className="w-5 h-5 text-background" /></div><p className="text-xs font-medium text-foreground text-center">{badge}</p></div>))}
                {[1, 2, 3].map((_, i) => (<div key={i} className="aspect-square rounded-xl bg-secondary/30 border border-border/40 flex flex-col items-center justify-center p-2"><Lock className="w-8 h-8 text-muted-foreground mb-2" /><p className="text-xs text-muted-foreground">Locked</p></div>))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
