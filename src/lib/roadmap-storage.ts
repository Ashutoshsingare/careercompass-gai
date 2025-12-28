import { supabase } from "@/integrations/supabase/client";
import type { RoadmapData } from "@/components/RoadmapDisplay";

export interface SavedRoadmap {
  id: string;
  user_id: string;
  title: string;
  subtitle: string | null;
  skills: string[];
  tools: string[];
  phases: { name: string; duration?: string; topics: string[] }[];
  created_at: string;
  updated_at: string;
}

export async function saveRoadmap(roadmap: RoadmapData): Promise<{ data: SavedRoadmap | null; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { data: null, error: new Error("You must be logged in to save roadmaps") };
  }

  const { data, error } = await supabase
    .from("saved_roadmaps")
    .insert({
      user_id: user.id,
      title: roadmap.title,
      subtitle: roadmap.subtitle || null,
      skills: roadmap.skills,
      tools: roadmap.tools,
      phases: roadmap.phases,
    })
    .select()
    .single();

  if (error) {
    return { data: null, error: new Error(error.message) };
  }

  return { 
    data: {
      ...data,
      skills: data.skills as string[],
      tools: data.tools as string[],
      phases: data.phases as { name: string; duration?: string; topics: string[] }[],
    }, 
    error: null 
  };
}

export async function getSavedRoadmaps(): Promise<{ data: SavedRoadmap[]; error: Error | null }> {
  const { data, error } = await supabase
    .from("saved_roadmaps")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return { data: [], error: new Error(error.message) };
  }

  return { 
    data: (data || []).map(item => ({
      ...item,
      skills: item.skills as string[],
      tools: item.tools as string[],
      phases: item.phases as { name: string; duration?: string; topics: string[] }[],
    })), 
    error: null 
  };
}

export async function deleteRoadmap(id: string): Promise<{ error: Error | null }> {
  const { error } = await supabase
    .from("saved_roadmaps")
    .delete()
    .eq("id", id);

  if (error) {
    return { error: new Error(error.message) };
  }

  return { error: null };
}

export function roadmapToData(saved: SavedRoadmap): RoadmapData {
  return {
    title: saved.title,
    subtitle: saved.subtitle || undefined,
    skills: saved.skills,
    tools: saved.tools,
    phases: saved.phases,
  };
}
