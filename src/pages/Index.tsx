import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAuth } from "@/contexts/AuthContext";
import {
  Compass,
  Sparkles,
  Bot,
  FileText,
  Map,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
  Zap,
  Target,
  Brain,
  LogIn,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Career Agent",
    description: "Get personalized career guidance powered by Google Gemini's advanced reasoning.",
    color: "primary",
  },
  {
    icon: FileText,
    title: "Resume Analyzer",
    description: "AI-powered skill gap detection and resume optimization suggestions.",
    color: "accent",
  },
  {
    icon: Map,
    title: "Smart Roadmap",
    description: "Dynamic learning paths that adapt to your progress and goals.",
    color: "chart-3",
  },
  {
    icon: Target,
    title: "Opportunity Matcher",
    description: "Discover internships, hackathons, and jobs matched to your profile.",
    color: "chart-4",
  },
];

const stats = [
  { value: "10K+", label: "Students Guided" },
  { value: "95%", label: "Placement Rate" },
  { value: "500+", label: "Partner Companies" },
  { value: "50+", label: "Skill Tracks" },
];

export default function Index() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
            <Compass className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            Career Compass AI
          </span>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/ai-agent">
                <Button variant="gradient">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Agent
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign in
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="gradient">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-slide-up">
            <Zap className="w-4 h-4" />
            Powered by Google Gemini AI
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 animate-slide-up animation-delay-100">
            Navigate Your Career with{" "}
            <span className="gradient-text glow-text">AI Precision</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up animation-delay-200">
            Your intelligent career companion that creates personalized roadmaps, 
            analyzes your skills, and connects you with opportunities—all powered 
            by advanced AI.
          </p>

          <div className="flex items-center justify-center gap-4 animate-slide-up animation-delay-300">
            <Link to="/ai-agent">
              <Button variant="gradient" size="xl">
                <Brain className="w-5 h-5 mr-2" />
                Generate My Roadmap
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="glass" size="xl">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 animate-slide-up animation-delay-400">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools and AI-powered insights to accelerate your career journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <GlassCard
              key={i}
              hover
              className={`animate-slide-up animation-delay-${(i + 1) * 100}`}
            >
              <div
                className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                  feature.color === "primary"
                    ? "bg-primary/20 text-primary"
                    : feature.color === "accent"
                    ? "bg-accent/20 text-accent"
                    : feature.color === "chart-3"
                    ? "bg-chart-3/20 text-chart-3"
                    : "bg-chart-4/20 text-chart-4"
                }`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <GlassCard className="text-center py-16 relative overflow-hidden" glow>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
          <div className="relative z-10">
            <Award className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Join thousands of students who've accelerated their careers with 
              personalized AI guidance.
            </p>
            <Link to="/ai-agent">
              <Button variant="gradient" size="xl">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </GlassCard>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              Career Compass AI © 2024
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="w-4 h-4" />
            Powered by Google Gemini
          </div>
        </div>
      </footer>
    </div>
  );
}
