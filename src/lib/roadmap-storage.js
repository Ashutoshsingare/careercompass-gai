import { supabase } from "@/integrations/supabase/client";

export async function saveRoadmap(roadmap) {
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
      skills: data.skills,
      tools: data.tools,
      phases: data.phases,
    }, 
    error: null 
  };
}

export async function getSavedRoadmaps() {
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
      skills: item.skills,
      tools: item.tools,
      phases: item.phases,
    })), 
    error: null 
  };
}

export async function deleteRoadmap(id) {
  const { error } = await supabase
    .from("saved_roadmaps")
    .delete()
    .eq("id", id);

  if (error) {
    return { error: new Error(error.message) };
  }

  return { error: null };
}

export function roadmapToData(saved) {
  return {
    title: saved.title,
    subtitle: saved.subtitle || undefined,
    skills: saved.skills,
    tools: saved.tools,
    phases: saved.phases,
  };
}
