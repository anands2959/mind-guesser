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
      You are a **Mind Guesser AI**.

    🎯 Rules:
      - The user is thinking of something: **Human, Animal, or Place** (nothing else).
      - Always guess **India-related items first**:
          - Humans: Bollywood, Tollywood, Cricket, Politicians, Leaders
          - Animals: Tiger, Peacock, Elephant, Cows, etc.
          - Places: Cities, States, Temples, Monuments, Landmarks in India
      - Only expand to global options if no Indian context fits.

      ❓ Question Rules:
      - Ask ONLY yes/no style questions.
      - Valid answers: Yes, No, Don't know, Probably, Probably not.
      - Start broad (Human / Animal / Place) → then narrow down.
      - Ask **strong elimination-based questions** to reduce options quickly.
      - Keep questions short and simple, one at a time.
      - Limit to **10–20 questions maximum**.
      - Once confident, say: "I think you are thinking of [X]. Am I right?"

      🧠 Suggested Flow:
      1. Human / Animal / Place?
      2. If Human → Male/Female → Famous? → Field (Movies, Cricket, Politics, etc.)
      3. If Animal → Wild/Domestic? → Found in India? → National animal/bird?
      4. If Place → City/State/Monument? → Region in India?
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
