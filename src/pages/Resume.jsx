import { useState, useRef } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Resume() {
  const [hasUploaded, setHasUploaded] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [targetRole, setTargetRole] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        // Remove the data URL prefix to get just the base64 content
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    setFileName(file.name);
    setIsAnalyzing(true);

    try {
      // Convert PDF to base64 and send to Gemini for direct analysis
      const pdfBase64 = await fileToBase64(file);
      
      const { data, error } = await supabase.functions.invoke('analyze-resume', {
        body: { pdfBase64, targetRole: targetRole || undefined },
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setAnalysisResults(data);
      setHasUploaded(true);
      
      toast({
        title: "Analysis complete!",
        description: "Your resume has been analyzed successfully.",
      });
    } catch (error) {
      console.error('Resume analysis error:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to analyze resume. Please try again.";
      toast({
        title: "Analysis failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const resetAnalysis = () => {
    setHasUploaded(false);
    setAnalysisResults(null);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
          {hasUploaded && (
            <div className="flex gap-3">
              <Button variant="outline" disabled>
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button variant="gradient" onClick={resetAnalysis}>
                <Upload className="w-4 h-4 mr-2" />
                Upload New Resume
              </Button>
            </div>
          )}
        </div>

        {isAnalyzing ? (
          <GlassCard className="text-center py-20">
            <Loader2 className="w-16 h-16 mx-auto mb-6 text-primary animate-spin" />
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Analyzing Your Resume
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Our AI is reviewing your resume and generating personalized feedback...
            </p>
          </GlassCard>
        ) : hasUploaded && analysisResults ? (
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
                {analysisResults.summary && (
                  <p className="text-sm text-muted-foreground mt-4 text-left">
                    {analysisResults.summary}
                  </p>
                )}
                <div className="mt-4 w-full">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Industry Average</span>
                    <span className="text-foreground font-medium">65</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-[65%] bg-muted-foreground rounded-full" />
                  </div>
                </div>
                {analysisResults.score >= 65 && (
                  <p className="text-sm text-chart-4 mt-4 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Above average! Keep improving.
                  </p>
                )}
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
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-2">
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
                    {section.feedback && (
                      <p className="text-xs text-muted-foreground">{section.feedback}</p>
                    )}
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
          <GlassCard className="text-center py-16">
            <FileText className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Upload Your Resume
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Get AI-powered insights to improve your resume and stand out to
              recruiters
            </p>
            
            <div className="max-w-sm mx-auto space-y-4 mb-8">
              <div className="text-left">
                <Label htmlFor="targetRole" className="text-sm text-muted-foreground">
                  Target Role (optional)
                </Label>
                <Input
                  id="targetRole"
                  placeholder="e.g. Senior Software Engineer"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <Button variant="gradient" size="lg" onClick={handleUploadClick}>
              <Upload className="w-5 h-5 mr-2" />
              Upload Resume (PDF)
            </Button>
            
            <p className="text-xs text-muted-foreground mt-4">
              Supported format: PDF (max 10MB)
            </p>
          </GlassCard>
        )}
      </div>
    </AppLayout>
  );
}
