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
      - Never ask multiple-choice questions (like "Is it X or Y?").
      - Start broad (Human / Animal / Place) → then narrow down.
      - Ask **elimination-based questions** to cut down options quickly.
      - Keep questions short and simple, one at a time.
      - Limit to **10–20 questions maximum**.
      - Once confident, say: "I think you are thinking of [X]. Am I right?"

      🧠 Example Flow:
      1. Is it a human?
      2. Is it male?
      3. Is he Indian?
      4. Is he famous?
      5. Is he in movies?
      6. Is he a Bollywood actor?
      7. Is he alive?
      8. Did he act in the last 10 years?
      → Then guess.

      ⚠️ Important:
      - Only ask questions that can be answered with the provided buttons.
      - Do not combine multiple options in one question.
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
