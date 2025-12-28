import { AppLayout } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import {
  User,
  Mail,
  MapPin,
  GraduationCap,
  Edit,
  Github,
  Linkedin,
  Globe,
  Trophy,
  Flame,
  Star,
  Calendar,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

const userProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@university.edu",
  location: "San Francisco, CA",
  university: "Stanford University",
  major: "Computer Science",
  year: "Junior",
  careerGoal: "Full Stack Developer",
  joinDate: "March 2024",
};

const socialLinks = [
  { icon: Github, label: "GitHub", url: "github.com/alexj" },
  { icon: Linkedin, label: "LinkedIn", url: "linkedin.com/in/alexj" },
  { icon: Globe, label: "Portfolio", url: "alexjohnson.dev" },
];

const badges = [
  { name: "JavaScript Master", icon: Star, color: "chart-5" },
  { name: "React Pro", icon: Trophy, color: "primary" },
  { name: "14 Day Streak", icon: Flame, color: "chart-5" },
  { name: "First Project", icon: Target, color: "chart-4" },
];

const stats = [
  { label: "Career Readiness", value: 72 },
  { label: "Roadmap Progress", value: 65 },
  { label: "Resume Score", value: 78 },
  { label: "Skill Coverage", value: 58 },
];

export default function Profile() {
  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Your <span className="gradient-text">Profile</span>
          </h1>
          <p className="text-muted-foreground">
            Manage your account and track your career progress
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <GlassCard hover glow>
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <User className="w-12 h-12 text-primary-foreground" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <Edit className="w-4 h-4 text-foreground" />
                </button>
              </div>

              <h2 className="text-xl font-display font-bold text-foreground mb-1">
                {userProfile.name}
              </h2>
              <p className="text-sm text-primary mb-4">{userProfile.careerGoal}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  {userProfile.email}
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {userProfile.location}
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <GraduationCap className="w-4 h-4" />
                  {userProfile.university}
                </div>
              </div>

              <div className="flex justify-center gap-3 mt-6">
                {socialLinks.map((link, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 rounded-lg bg-secondary hover:bg-muted transition-colors flex items-center justify-center"
                  >
                    <link.icon className="w-5 h-5 text-foreground" />
                  </button>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-6">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </GlassCard>

          {/* Stats & Progress */}
          <GlassCard className="lg:col-span-2" hover>
            <h2 className="text-lg font-display font-semibold text-foreground mb-6">
              Career Progress Overview
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <ProgressRing progress={stat.value} size={100}>
                    <span className="text-lg font-bold text-foreground">
                      {stat.value}%
                    </span>
                  </ProgressRing>
                  <p className="text-sm text-muted-foreground mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-2xl font-bold text-foreground">58</p>
                  <p className="text-sm text-muted-foreground">Hours Learned</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-2xl font-bold text-foreground">156</p>
                  <p className="text-sm text-muted-foreground">Tasks Completed</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-2xl font-bold text-foreground">14</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Badges */}
          <GlassCard hover>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-chart-5" />
              <h2 className="text-lg font-display font-semibold text-foreground">
                Earned Badges
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-3 rounded-xl border text-center",
                    `bg-${badge.color}/10 border-${badge.color}/30`
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center",
                      `bg-${badge.color}/20`
                    )}
                  >
                    <badge.icon className={cn("w-5 h-5", `text-${badge.color}`)} />
                  </div>
                  <p className="text-xs font-medium text-foreground">
                    {badge.name}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Account Info */}
          <GlassCard className="lg:col-span-2" hover>
            <h2 className="text-lg font-display font-semibold text-foreground mb-6">
              Account Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                  <p className="font-medium text-foreground">{userProfile.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium text-foreground">{userProfile.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">University</p>
                  <p className="font-medium text-foreground">{userProfile.university}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Major</p>
                  <p className="font-medium text-foreground">{userProfile.major}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Year</p>
                  <p className="font-medium text-foreground">{userProfile.year}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Member Since</p>
                  <p className="font-medium text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {userProfile.joinDate}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </AppLayout>
  );
}
