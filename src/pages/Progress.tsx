import { AppLayout } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  TrendingUp,
  Calendar,
  Clock,
  Award,
  Target,
  BookOpen,
  Code,
  Trophy,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const weeklyData = [
  { name: "Mon", hours: 2.5, tasks: 5, score: 75 },
  { name: "Tue", hours: 3, tasks: 6, score: 78 },
  { name: "Wed", hours: 2, tasks: 4, score: 80 },
  { name: "Thu", hours: 4, tasks: 7, score: 82 },
  { name: "Fri", hours: 3.5, tasks: 6, score: 85 },
  { name: "Sat", hours: 1.5, tasks: 3, score: 85 },
  { name: "Sun", hours: 2, tasks: 4, score: 88 },
];

const monthlyProgress = [
  { month: "Jan", readiness: 45 },
  { month: "Feb", readiness: 52 },
  { month: "Mar", readiness: 58 },
  { month: "Apr", readiness: 65 },
  { month: "May", readiness: 72 },
];

const skillProgress = [
  { skill: "React", progress: 75 },
  { skill: "Node.js", progress: 55 },
  { skill: "TypeScript", progress: 70 },
  { skill: "SQL", progress: 45 },
  { skill: "AWS", progress: 30 },
];

const achievements = [
  { title: "7 Day Streak", date: "This week", icon: Trophy, color: "chart-5" },
  { title: "First Project Complete", date: "3 days ago", icon: Award, color: "primary" },
  { title: "100 Problems Solved", date: "Last week", icon: Code, color: "accent" },
  { title: "Course Completed", date: "2 weeks ago", icon: BookOpen, color: "chart-4" },
];

export default function Progress() {
  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Your <span className="gradient-text">Progress</span>
          </h1>
          <p className="text-muted-foreground">
            Track your learning journey and achievements
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <GlassCard hover className="text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold text-foreground">58h</p>
            <p className="text-sm text-muted-foreground">Total Hours</p>
          </GlassCard>
          <GlassCard hover className="text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-accent" />
            <p className="text-2xl font-bold text-foreground">156</p>
            <p className="text-sm text-muted-foreground">Tasks Done</p>
          </GlassCard>
          <GlassCard hover className="text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-chart-4" />
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-sm text-muted-foreground">Skills Learned</p>
          </GlassCard>
          <GlassCard hover className="text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-chart-5" />
            <p className="text-2xl font-bold text-foreground">72%</p>
            <p className="text-sm text-muted-foreground">Career Ready</p>
          </GlassCard>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Career Readiness Chart */}
          <GlassCard className="lg:col-span-2" hover>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-semibold text-foreground">
                Career Readiness Trend
              </h2>
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyProgress}>
                  <defs>
                    <linearGradient id="colorReadiness" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="readiness"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorReadiness)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Recent Achievements */}
          <GlassCard hover>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-chart-5" />
              <h2 className="text-lg font-display font-semibold text-foreground">
                Achievements
              </h2>
            </div>
            <div className="space-y-4">
              {achievements.map((achievement, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${achievement.color}/20`}
                  >
                    <achievement.icon className={`w-5 h-5 text-${achievement.color}`} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {achievement.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Weekly Activity */}
          <GlassCard className="lg:col-span-2" hover>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-semibold text-foreground">
                Weekly Activity
              </h2>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  Hours
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  Tasks
                </span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="tasks" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Skill Progress */}
          <GlassCard hover>
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">
              Skill Progress
            </h2>
            <div className="space-y-4">
              {skillProgress.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground font-medium">{skill.skill}</span>
                    <span className="text-muted-foreground">{skill.progress}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </AppLayout>
  );
}
