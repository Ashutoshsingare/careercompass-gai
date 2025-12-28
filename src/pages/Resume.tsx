import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  XCircle,
  TrendingUp,
  Target,
  Lightbulb,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

const analysisResults = {
  score: 72,
  sections: [
    { name: "Contact Info", score: 100, status: "good" },
    { name: "Summary", score: 65, status: "needs-work" },
    { name: "Experience", score: 80, status: "good" },
    { name: "Skills", score: 70, status: "needs-work" },
    { name: "Education", score: 90, status: "good" },
    { name: "Projects", score: 45, status: "critical" },
  ],
  strengths: [
    "Clear contact information",
    "Good experience section structure",
    "Relevant education background",
  ],
  improvements: [
    "Add more quantifiable achievements",
    "Include 2-3 relevant projects with links",
    "Expand technical skills section",
    "Write a compelling professional summary",
  ],
  skillGaps: [
    { skill: "React.js", current: 60, target: 85 },
    { skill: "Node.js", current: 40, target: 75 },
    { skill: "System Design", current: 25, target: 70 },
    { skill: "AWS", current: 30, target: 60 },
  ],
};

export default function Resume() {
  const [hasUploaded, setHasUploaded] = useState(true); // For demo

  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Resume <span className="gradient-text">Analyzer</span>
            </h1>
            <p className="text-muted-foreground">
              AI-powered analysis to optimize your resume for your target roles
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button variant="gradient">
              <Upload className="w-4 h-4 mr-2" />
              Upload New Resume
            </Button>
          </div>
        </div>

        {hasUploaded ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Score Overview */}
            <GlassCard hover glow>
              <div className="flex flex-col items-center text-center">
                <ProgressRing progress={analysisResults.score} size={180}>
                  <div className="text-center">
                    <p className="text-4xl font-display font-bold text-foreground">
                      {analysisResults.score}
                    </p>
                    <p className="text-sm text-muted-foreground">Resume Score</p>
                  </div>
                </ProgressRing>
                <div className="mt-6 w-full">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Industry Average</span>
                    <span className="text-foreground font-medium">65</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-[65%] bg-muted-foreground rounded-full" />
                  </div>
                </div>
                <p className="text-sm text-chart-4 mt-4 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Above average! Keep improving.
                </p>
              </div>
            </GlassCard>

            {/* Section Analysis */}
            <GlassCard className="lg:col-span-2" hover>
              <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                Section Analysis
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {analysisResults.sections.map((section, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-4 rounded-lg border",
                      section.status === "good"
                        ? "bg-chart-4/10 border-chart-4/30"
                        : section.status === "needs-work"
                        ? "bg-chart-5/10 border-chart-5/30"
                        : "bg-destructive/10 border-destructive/30"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {section.status === "good" ? (
                          <CheckCircle2 className="w-5 h-5 text-chart-4" />
                        ) : section.status === "needs-work" ? (
                          <AlertCircle className="w-5 h-5 text-chart-5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive" />
                        )}
                        <span className="font-medium text-foreground">
                          {section.name}
                        </span>
                      </div>
                      <span
                        className={cn(
                          "text-lg font-bold",
                          section.status === "good"
                            ? "text-chart-4"
                            : section.status === "needs-work"
                            ? "text-chart-5"
                            : "text-destructive"
                        )}
                      >
                        {section.score}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          section.status === "good"
                            ? "bg-chart-4"
                            : section.status === "needs-work"
                            ? "bg-chart-5"
                            : "bg-destructive"
                        )}
                        style={{ width: `${section.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Strengths */}
            <GlassCard hover>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-chart-4" />
                <h2 className="text-lg font-display font-semibold text-foreground">
                  Strengths
                </h2>
              </div>
              <ul className="space-y-3">
                {analysisResults.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-4 mt-2 shrink-0" />
                    <span className="text-muted-foreground">{strength}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            {/* Improvements */}
            <GlassCard hover>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-chart-5" />
                <h2 className="text-lg font-display font-semibold text-foreground">
                  Improvements
                </h2>
              </div>
              <ul className="space-y-3">
                {analysisResults.improvements.map((improvement, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-chart-5 mt-2 shrink-0" />
                    <span className="text-muted-foreground">{improvement}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            {/* Skill Gap Analysis */}
            <GlassCard hover>
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-display font-semibold text-foreground">
                  Skill Gaps
                </h2>
              </div>
              <div className="space-y-4">
                {analysisResults.skillGaps.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground font-medium">
                        {skill.skill}
                      </span>
                      <span className="text-muted-foreground">
                        {skill.current}% / {skill.target}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden relative">
                      <div
                        className="absolute h-full bg-muted-foreground/30 rounded-full"
                        style={{ width: `${skill.target}%` }}
                      />
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative z-10"
                        style={{ width: `${skill.current}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Get Learning Plan
              </Button>
            </GlassCard>
          </div>
        ) : (
          <GlassCard className="text-center py-20">
            <FileText className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Upload Your Resume
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Get AI-powered insights to improve your resume and stand out to
              recruiters
            </p>
            <Button variant="gradient" size="lg">
              <Upload className="w-5 h-5 mr-2" />
              Upload Resume (PDF)
            </Button>
          </GlassCard>
        )}
      </div>
    </AppLayout>
  );
}
