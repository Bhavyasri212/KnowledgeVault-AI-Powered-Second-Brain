import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GET(req: Request) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Missing Auth Token" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  const authSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  );

  const { data, error } = await authSupabase
    .from("knowledge_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Missing Auth Token" },
        { status: 401 },
      );
    }

    const authSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      },
    );

    const {
      data: { user },
      error: authError,
    } = await authSupabase.auth.getUser();

    if (!user || authError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { title, content, type, sourceUrl } = body;

    let summary = "";
    let tags: string[] = [];

    if (content) {
      try {
        const model = genAI.getGenerativeModel({
          model: "gemini-3-flash-preview",
        });

        const prompt = `
Analyze the following text.

1. Write a short summary. Start it with "⚡ Insight: ".
2. Extract 3 relevant keywords/tags.


Return the output strictly as a JSON object:
{
  "summary": "...",
  "tags": ["tag1", "tag2", "tag3"],
  
}

Text to analyze:
"${content}"
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleanJson = text.replace(/```json|```/g, "").trim();
        const aiData = JSON.parse(cleanJson);

        summary = aiData.summary;
        tags = aiData.tags;
      } catch (aiError) {
        console.error("Gemini AI Error:", aiError);
        summary = "Summary unavailable";
        tags = ["manual"];
      }
    }

    const { data, error } = await authSupabase
      .from("knowledge_items")
      .insert([
        {
          title,
          content,
          type,
          summary,
          tags,
          sourceUrl: sourceUrl || null,
          user_id: user.id,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
