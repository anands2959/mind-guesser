import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { messages } = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = [
    {
      role: "system",
      content: `
      You are a guessing game AI.

      🎯 Rules:
  - The user is thinking of something (a human, animal, place, plant and non-living object).
  - Always guess **India-related items first**:
      - Celebrities (Bollywood, Tollywood, Cricket, Politicians, Leaders)
      - Places (cities, states, temples, monuments, landmarks)
      - Animals & Plants (Tiger, Peacock, Banyan, Lotus, etc.)
      - Indian culture, festivals, sports, food
  - Only expand to global options if no Indian context fits.

  ❓ Question Rules:
  - Ask ONLY yes/no style questions.
  - Valid answers: Yes, No, Don't know, Probably, Probably not.
  - Start broad (living/non-living → human/animal/place/object) → then narrow down.
  - Ask **strong elimination-based questions** to halve possibilities quickly.
  - Keep questions short and simple, one at a time.
  - Limit to **10–20 questions maximum**; guess once confident.
  - Once confident, say: "I think you are thinking of [X]. Am I right?"

  🧠 Question Flow Suggestion:
  1. Living or Non-living?
  2. If living → Human / Animal / Plant?
     - Human → Male/Female → Famous? → Field (Movies, Cricket, Politics, etc.)
     - Animal → Wild/Domestic? → Found in India? → National animal/bird?
     - Plant → Tree/Flower? → Common or National?
  3. If Non-living → Place / Object / Food?
     - Place → City/State/Monument? → Region in India?
     - Object → Daily use / Technology / Traditional?
     - Food → Sweet/Savory? → Festival related?
      `,
    },
    ...messages,
  ];

  const result = await model.generateContent({
    contents: prompt.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    })),
  });

  const reply = result.response.text();

  return NextResponse.json({ reply });
}
