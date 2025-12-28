import { AppLayout } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Target,
  Flame,
  Award,
  BookOpen,
  Clock,
  ChevronRight,
  Zap,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

const recentActivities = [
  { title: "Completed Python Basics", time: "2 hours ago", type: "course" },
  { title: "Resume score improved to 78%", time: "5 hours ago", type: "resume" },
  { title: "New skill: React.js unlocked", time: "Yesterday", type: "skill" },
  { title: "Interview prep session", time: "2 days ago", type: "interview" },
];

const upcomingTasks = [
  { title: "Complete Data Structures module", due: "Today", priority: "high" },
  { title: "Update LinkedIn profile", due: "Tomorrow", priority: "medium" },
  { title: "Apply to 3 internships", due: "This week", priority: "low" },
];

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Welcome back, <span className="gradient-text">Alex</span>! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's your career progress overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Career Readiness"
            value="72%"
            subtitle="8% increase this month"
            icon={TrendingUp}
            trend="up"
            trendValue="+8%"
            color="primary"
          />
          <StatCard
            title="Learning Streak"
            value="14 days"
            subtitle="Best streak: 21 days"
            icon={Flame}
            trend="up"
            trendValue="+3"
            color="chart-5"
          />
          <StatCard
            title="Skills Mastered"
            value="12"
            subtitle="4 in progress"
            icon={Award}
            color="accent"
          />
          <StatCard
            title="Placement Score"
            value="85"
            subtitle="Top 15% of students"
            icon={Target}
            trend="up"
            trendValue="+5"
            color="chart-4"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Progress Overview */}
          <GlassCard className="lg:col-span-2" hover>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Roadmap Progress
              </h2>
              <Link to="/roadmap">
                <Button variant="ghost" size="sm">
                  View Full Roadmap
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8">
              <ProgressRing progress={65} size={160}>
                <div className="text-center">
                  <p className="text-3xl font-display font-bold text-foreground">
                    65%
                  </p>
                  <p className="text-xs text-muted-foreground">Complete</p>
                </div>
              </ProgressRing>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Phase 1: Foundations</span>
                    <span className="text-chart-4 font-medium">Complete ✓</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-full bg-chart-4 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Phase 2: Core Skills</span>
                    <span className="text-primary font-medium">75%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-primary to-accent rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Phase 3: Advanced</span>
                    <span className="text-muted-foreground font-medium">20%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-1/5 bg-muted-foreground rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Today's Tasks */}
          <GlassCard hover>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Today's Tasks
              </h2>
              <Link to="/daily-tasks">
                <Button variant="ghost" size="sm">
                  <Calendar className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingTasks.map((task, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer group"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      task.priority === "high"
                        ? "bg-destructive"
                        : task.priority === "medium"
                        ? "bg-chart-5"
                        : "bg-chart-4"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{task.due}</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>

            <Link to="/daily-tasks">
              <Button variant="outline" className="w-full mt-4">
                <Zap className="w-4 h-4 mr-2" />
                Generate Today's Tasks
              </Button>
            </Link>
          </GlassCard>

          {/* Recent Activity */}
          <GlassCard hover>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Recent Activity
              </h2>
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      activity.type === "course"
                        ? "bg-primary/20 text-primary"
                        : activity.type === "resume"
                        ? "bg-accent/20 text-accent"
                        : activity.type === "skill"
                        ? "bg-chart-4/20 text-chart-4"
                        : "bg-chart-3/20 text-chart-3"
                    }`}
                  >
                    {activity.type === "course" && <BookOpen className="w-4 h-4" />}
                    {activity.type === "resume" && <TrendingUp className="w-4 h-4" />}
                    {activity.type === "skill" && <Award className="w-4 h-4" />}
                    {activity.type === "interview" && <Target className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Quick Actions */}
          <GlassCard className="lg:col-span-2" hover>
            <h2 className="text-xl font-display font-semibold text-foreground mb-6">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/ai-agent" className="block">
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all cursor-pointer group">
                  <Zap className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-medium text-foreground text-sm">Chat with AI</p>
                  <p className="text-xs text-muted-foreground">Get guidance</p>
                </div>
              </Link>
              <Link to="/resume" className="block">
                <div className="p-4 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 hover:border-accent/40 transition-all cursor-pointer group">
                  <TrendingUp className="w-8 h-8 text-accent mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-medium text-foreground text-sm">Analyze Resume</p>
                  <p className="text-xs text-muted-foreground">Get feedback</p>
                </div>
              </Link>
              <Link to="/skill-lab" className="block">
                <div className="p-4 rounded-xl bg-gradient-to-br from-chart-4/20 to-chart-4/5 border border-chart-4/20 hover:border-chart-4/40 transition-all cursor-pointer group">
                  <Award className="w-8 h-8 text-chart-4 mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-medium text-foreground text-sm">Take Assessment</p>
                  <p className="text-xs text-muted-foreground">Test skills</p>
                </div>
              </Link>
              <Link to="/opportunities" className="block">
                <div className="p-4 rounded-xl bg-gradient-to-br from-chart-3/20 to-chart-3/5 border border-chart-3/20 hover:border-chart-3/40 transition-all cursor-pointer group">
                  <Target className="w-8 h-8 text-chart-3 mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-medium text-foreground text-sm">Find Jobs</p>
                  <p className="text-xs text-muted-foreground">Explore</p>
                </div>
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </AppLayout>
  );
}
