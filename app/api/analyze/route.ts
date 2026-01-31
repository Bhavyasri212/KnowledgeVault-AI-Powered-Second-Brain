import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
      Analyze this content for a personal knowledge base.
      Title: ${title}
      Content: ${content.substring(0, 5000)}

      Tasks:
      1. Write a short summary. Start it with "⚡ Insight: ".
2. Extract 3 relevant keywords/tags.

      Return ONLY valid JSON in this format:
      {
        "summary": "Your summary here...",
        "tags": ["tag1", "tag2", "tag3"]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    const jsonStr = responseText.replace(/```json|```/g, "").trim();

    const firstBrace = jsonStr.indexOf("{");
    const lastBrace = jsonStr.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1) {
      throw new Error("Invalid JSON response from AI");
    }

    const cleanJson = jsonStr.substring(firstBrace, lastBrace + 1);
    const data = JSON.parse(cleanJson);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("❌ Analyze API Error:", error.message || error);

    return NextResponse.json(
      { error: error.message || "Failed to analyze content" },
      { status: 500 },
    );
  }
}
