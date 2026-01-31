import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// Initialize Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    // 1️⃣ Receive 'messages' array from frontend
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ reply: "No messages provided." });
    }

    // 1️⃣ Get Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json({ reply: "User not authenticated." });
    }

    // 2️⃣ Create user-authenticated Supabase client
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

    // 3️⃣ Get user info
    const {
      data: { user },
      error: authError,
    } = await authSupabase.auth.getUser();

    if (!user || authError) {
      return NextResponse.json({ reply: "User not authenticated." });
    }

    // 4️⃣ Fetch notes (RLS automatically filters by user)
    const { data: notes, error } = await authSupabase
      .from("knowledge_items")
      .select("title, content, type, tags, summary, created_at")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Supabase fetch notes error:", error);
      return NextResponse.json({ reply: "Failed to load notes." });
    }

    if (!notes || notes.length === 0) {
      return NextResponse.json({ reply: "No notes found for this user." });
    }

    // 4️⃣ Build Knowledge Base text
    const contextText = notes
      .map(
        (note) =>
          `[Date: ${new Date(note.created_at).toLocaleDateString()}]\nTitle: ${
            note.title
          }\nType: ${note.type}\nTags: ${note.tags}\nContent: ${
            note.content
          }\nSummary: ${note.summary}\n---`,
      )
      .join("\n");

    // 5️⃣ Build Conversation History
    const historyText = messages
      .slice(0, -1)
      .map(
        (m: any) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`,
      )
      .join("\n");

    const lastMessage = messages[messages.length - 1].content;

    // 6️⃣ Construct system prompt for AI
    const systemPrompt = `
You are 'BrainHub', the user's personal second brain.

RULES:
1. Use the "Knowledge Base" section to answer questions.
2. Use the "Conversation History" to understand context (e.g., if user says "that note").
3. If the answer is found, cite the title.
4. Be concise and helpful.

=== KNOWLEDGE BASE ===
${contextText}

=== CONVERSATION HISTORY ===
${historyText}

=== CURRENT QUESTION ===
${lastMessage}
`;

    // 7️⃣ Generate AI response
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent(systemPrompt);
    const response = result.response.text();

    // 8️⃣ Return AI reply
    return NextResponse.json({ reply: response });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to process your request." },
      { status: 500 },
    );
  }
}
