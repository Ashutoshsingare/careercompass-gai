import { AppLayout } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Target,
  Search,
  Briefcase,
  GraduationCap,
  Code,
  MapPin,
  Clock,
  ExternalLink,
  Bookmark,
  Sparkles,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

const opportunities = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechCorp Inc.",
    type: "Internship",
    location: "Remote",
    posted: "2 days ago",
    match: 92,
    skills: ["React", "TypeScript", "Tailwind"],
    saved: true,
  },
  {
    id: 2,
    title: "MLH Fellowship",
    company: "Major League Hacking",
    type: "Fellowship",
    location: "Remote",
    posted: "1 week ago",
    match: 88,
    skills: ["Open Source", "Git", "Collaboration"],
    saved: false,
  },
  {
    id: 3,
    title: "Software Engineer - New Grad",
    company: "StartupXYZ",
    type: "Full-time",
    location: "San Francisco, CA",
    posted: "3 days ago",
    match: 85,
    skills: ["Node.js", "React", "PostgreSQL"],
    saved: true,
  },
  {
    id: 4,
    title: "Web3 Hackathon 2024",
    company: "ETHGlobal",
    type: "Hackathon",
    location: "Virtual",
    posted: "Just now",
    match: 78,
    skills: ["Blockchain", "JavaScript", "Solidity"],
    saved: false,
  },
  {
    id: 5,
    title: "Junior Full Stack Developer",
    company: "FinTech Solutions",
    type: "Full-time",
    location: "New York, NY",
    posted: "5 days ago",
    match: 82,
    skills: ["React", "Node.js", "MongoDB"],
    saved: false,
  },
];

const typeColors = {
  Internship: "bg-primary/20 text-primary border-primary/30",
  Fellowship: "bg-chart-3/20 text-chart-3 border-chart-3/30",
  "Full-time": "bg-chart-4/20 text-chart-4 border-chart-4/30",
  Hackathon: "bg-chart-5/20 text-chart-5 border-chart-5/30",
};

export default function Opportunities() {
  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              <span className="gradient-text">Opportunities</span>
            </h1>
            <p className="text-muted-foreground">
              AI-matched internships, jobs, and hackathons for you
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Bookmark className="w-4 h-4 mr-2" />
              Saved (2)
            </Button>
            <Button variant="gradient">
              <Sparkles className="w-4 h-4 mr-2" />
              Find More
            </Button>
          </div>
        </div>

        {/* Search & Filters */}
        <GlassCard className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search opportunities..."
                className="pl-10 bg-secondary/50 border-border/40"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="default">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="default">
                <MapPin className="w-4 h-4 mr-2" />
                Location
              </Button>
              <Button variant="outline" size="default">
                <Briefcase className="w-4 h-4 mr-2" />
                Type
              </Button>
            </div>
          </div>
        </GlassCard>

        {/* Opportunities Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {opportunities.map((opp) => (
            <GlassCard key={opp.id} hover className="relative">
              {/* Match Badge */}
              <div className="absolute top-4 right-4">
                <div
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    opp.match >= 90
                      ? "bg-chart-4/20 text-chart-4 border border-chart-4/30"
                      : opp.match >= 80
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-muted text-muted-foreground border border-border"
                  )}
                >
                  {opp.match}% Match
                </div>
              </div>

              {/* Header */}
              <div className="mb-4">
                <div
                  className={cn(
                    "inline-block px-2 py-0.5 rounded text-xs font-medium border mb-2",
                    typeColors[opp.type as keyof typeof typeColors]
                  )}
                >
                  {opp.type === "Internship" && <GraduationCap className="w-3 h-3 inline mr-1" />}
                  {opp.type === "Fellowship" && <Code className="w-3 h-3 inline mr-1" />}
                  {opp.type === "Full-time" && <Briefcase className="w-3 h-3 inline mr-1" />}
                  {opp.type === "Hackathon" && <Target className="w-3 h-3 inline mr-1" />}
                  {opp.type}
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground">
                  {opp.title}
                </h3>
                <p className="text-muted-foreground">{opp.company}</p>
              </div>

              {/* Details */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {opp.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {opp.posted}
                </span>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {opp.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-md bg-secondary text-xs font-medium text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="gradient" className="flex-1">
                  Apply Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant={opp.saved ? "default" : "outline"}
                  size="icon"
                >
                  <Bookmark className={cn("w-4 h-4", opp.saved && "fill-current")} />
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
