import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { RoadmapDisplay } from "@/components/RoadmapDisplay";
import { getSavedRoadmaps, deleteRoadmap } from "@/lib/roadmap-storage";
import { useToast } from "@/hooks/use-toast";
import {
  Map,
  Trash2,
  Loader2,
  Plus,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function roadmapToData(saved) {
  return {
    title: saved.title,
    subtitle: saved.subtitle || undefined,
    skills: saved.skills,
    tools: saved.tools,
    phases: saved.phases,
  };
}

export default function SavedRoadmaps() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const { toast } = useToast();

  const loadRoadmaps = async () => {
    setLoading(true);
    const { data, error } = await getSavedRoadmaps();
    if (error) {
      toast({
        title: "Error loading roadmaps",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setRoadmaps(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadRoadmaps();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    const { error } = await deleteRoadmap(id);
    setDeletingId(null);

    if (error) {
      toast({
        title: "Failed to delete",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setRoadmaps((prev) => prev.filter((r) => r.id !== id));
      if (selectedRoadmap?.id === id) {
        setSelectedRoadmap(null);
      }
      toast({
        title: "Roadmap deleted",
        description: "The roadmap has been removed.",
      });
    }
  };

  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Saved <span className="gradient-text">Roadmaps</span>
            </h1>
            <p className="text-muted-foreground">
              Access and manage your saved career roadmaps
            </p>
          </div>
          <Link to="/ai-agent">
            <Button variant="gradient">
              <Plus className="w-4 h-4 mr-2" />
              Generate New
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : roadmaps.length === 0 ? (
          <GlassCard className="text-center py-20">
            <Map className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              No saved roadmaps yet
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Generate a career roadmap with AI and save it to access later
            </p>
            <Link to="/ai-agent">
              <Button variant="gradient" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Generate Your First Roadmap
              </Button>
            </Link>
          </GlassCard>
        ) : selectedRoadmap ? (
          <div>
            <Button
              variant="ghost"
              onClick={() => setSelectedRoadmap(null)}
              className="mb-6"
            >
              ← Back to list
            </Button>
            <RoadmapDisplay data={roadmapToData(selectedRoadmap)} showSaveButton={false} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps.map((roadmap) => (
              <GlassCard
                key={roadmap.id}
                hover
                className="cursor-pointer group relative"
              >
                <div onClick={() => setSelectedRoadmap(roadmap)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                      <Map className="w-6 h-6 text-primary" />
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {deletingId === roadmap.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4 text-destructive" />
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete roadmap?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your saved roadmap.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(roadmap.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    {roadmap.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <Calendar className="w-3 h-3" />
                    {new Date(roadmap.created_at).toLocaleDateString()}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {roadmap.skills.slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-secondary text-xs text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                    {roadmap.skills.length > 3 && (
                      <span className="px-2 py-0.5 rounded bg-secondary text-xs text-muted-foreground">
                        +{roadmap.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center text-sm text-primary font-medium">
                    View roadmap
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}