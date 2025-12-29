import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, type } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Processing ${type || 'chat'} request with ${messages?.length || 0} messages`);

    // Different system prompts based on type
    let systemPrompt = "";
    
    if (type === "roadmap") {
      systemPrompt = `You are an expert career coach and learning path designer. Create personalized, actionable career roadmaps.

CRITICAL: You MUST respond with ONLY a valid JSON object (no markdown, no extra text). Use this exact format:

{
  "title": "Career Role Name",
  "subtitle": "Your personalized career roadmap is ready.",
  "skills": [
    "Skill 1",
    "Skill 2",
    "Skill 3 (with details if needed)",
    "..."
  ],
  "tools": [
    "Tool Category: Tool1, Tool2, Tool3",
    "Another Category: Tool1, Tool2",
    "..."
  ],
  "phases": [
    {
      "name": "Phase 1: Foundation",
      "duration": "4-6 weeks",
      "topics": [
        "Topic 1 to learn",
        "Topic 2 to learn",
        "..."
      ]
    },
    {
      "name": "Phase 2: Core Skills",
      "duration": "6-8 weeks",
      "topics": ["..."]
    },
    {
      "name": "Phase 3: Advanced",
      "duration": "6-8 weeks", 
      "topics": ["..."]
    },
    {
      "name": "Phase 4: Career Launch",
      "duration": "4 weeks",
      "topics": ["..."]
    }
  ]
}

Include 8-15 skills, 5-8 tool categories, and 4 phases with 5-10 topics each. Be specific and actionable.`;
    } else if (type === "resume") {
      systemPrompt = `You are an expert resume analyst and career advisor. Analyze resumes and provide actionable feedback.

CRITICAL: You MUST respond with ONLY a valid JSON object (no markdown, no extra text):

{
  "overallScore": 75,
  "sections": [
    {"name": "Contact Info", "score": 90, "status": "good", "feedback": "..."},
    {"name": "Summary", "score": 65, "status": "needs-work", "feedback": "..."},
    {"name": "Experience", "score": 80, "status": "good", "feedback": "..."},
    {"name": "Skills", "score": 70, "status": "needs-work", "feedback": "..."},
    {"name": "Education", "score": 85, "status": "good", "feedback": "..."},
    {"name": "Projects", "score": 50, "status": "critical", "feedback": "..."}
  ],
  "strengths": ["Strength 1", "Strength 2", "Strength 3"],
  "improvements": ["Improvement 1", "Improvement 2", "Improvement 3", "Improvement 4"],
  "skillGaps": [
    {"skill": "Skill Name", "current": 40, "target": 80},
    {"skill": "Another Skill", "current": 30, "target": 70}
  ]
}

Be constructive and specific.`;
    } else {
      systemPrompt = `You are Career Compass AI, an intelligent career guidance assistant powered by Google Gemini. You help students and professionals navigate their career journeys with personalized advice.

Your capabilities include:
- Creating personalized learning roadmaps
- Analyzing resumes and suggesting improvements
- Providing interview preparation guidance
- Recommending skills to develop
- Suggesting career paths based on interests and skills
- Offering industry insights and trends

Be friendly, encouraging, and specific in your advice. Use markdown formatting for structured responses. When discussing roadmaps or learning paths, break them into clear phases with actionable steps.

Remember to:
- Ask clarifying questions when needed
- Provide specific, actionable advice
- Be encouraging but realistic
- Consider the user's current level and goals`;
    }

    console.log("Calling Career Compass AI Gateway...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`AI Gateway error: ${response.status} - ${errorText}`);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    console.log("Streaming response from AI Gateway...");

    // Return the streaming response
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Error in career-chat function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
