"use client";
import { useState, useRef, useEffect } from "react";

const options = ["Yes", "No", "Don't know", "Probably", "Probably not"];

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "model",
      content:
        "Think of something (human, animal, place and non-living object). Ready? Let's start. Is it living?",
    },
  ]);
  const [isUndoAvailable, setIsUndoAvailable] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll when new messages come
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (answer: string) => {
    const newMessages = [...messages, { role: "user", content: answer }];
    setMessages(newMessages);
    setIsUndoAvailable(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "model", content: data.reply }]);
  };

  const resetGame = () => {
    setMessages([
      {
        role: "model",
        content:
          "Think of something (human, animal, place and non-living object). Ready? Let's start. Is it living?",
      },
    ]);
    setIsUndoAvailable(false);
  };

  const undoLast = () => {
    if (!isUndoAvailable) return;

    // Remove last user + last model response
    const updated = [...messages];
    const lastUserIndex = updated.findLastIndex((m) => m.role === "user");
    if (lastUserIndex !== -1) {
      updated.splice(lastUserIndex); // remove everything after last user
      setMessages(updated);
    }

    setIsUndoAvailable(false); // allow only one undo at a time
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Section with Picture */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-emerald-500 to-green-700 p-6">
          <img
            src="logo.png"
            alt="Mind Guess Illustration"
            className="w-3/4 drop-shadow-xl"
          />
        </div>

        {/* Right Section with Chat */}
        <div className="flex flex-col p-6">
          {/* Fixed Header */}
          <div className="mb-4">
            <h1 className="text-3xl font-extrabold text-emerald-600 text-center">
              🤯 Mind Guesser
            </h1>
            <p className="text-center text-gray-500 mt-1 text-sm">
              Answer with <b>Yes</b>, <b>No</b>, <b>Don't know</b>,{" "}
              <b>Probably</b>, or <b>Probably not</b>.
            </p>
          </div>

          {/* Chat Area (scrolls only this box) */}
          <div className="flex-1 min-h-[400px] max-h-[400px] overflow-y-auto border rounded-lg p-4 bg-gray-50 mb-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`mb-3 flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm shadow ${
                    m.role === "user"
                      ? "bg-emerald-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 border rounded-bl-none"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Answer Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => sendMessage(opt)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-5 py-2 rounded-full shadow-md transition"
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-6">
            <button
              onClick={undoLast}
              disabled={!isUndoAvailable}
              className={`text-sm ${
                isUndoAvailable
                  ? "bg-blue-600 font-medium px-4 py-2 rounded-3xl hover:bg-blue-700"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              Undo
            </button>
            <button
              onClick={resetGame}
              className="bg-blue-600 font-medium px-4 py-2 rounded-3xl hover:bg-blue-700"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
