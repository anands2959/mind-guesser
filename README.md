# Mind Guesser Game 🎯🧠

**Mind Guesser Game** is an interactive AI-powered game where the AI tries to guess what you are thinking—be it a person, animal, place, plant, or object. Think of something in your mind, and the AI will ask smart yes/no questions to figure it out. The game emphasizes Indian context first, making it fun and relatable for Indian users.  

---

## 📝 Description

Mind Guesser Game allows players to challenge an AI to guess their thoughts. It uses **smart elimination-based questioning** to guess correctly in **10–20 questions**. The AI prioritizes **India-related guesses** (celebrities, places, animals, food, culture) before moving to global options.  

This game is built using **Next.js** and **Google Gemini AI** for intelligent question generation and response analysis.  

---

## 🎮 Features

- **Think and Guess:** AI tries to guess what you’re thinking.  
- **India-first Context:** Focuses on Indian celebrities, places, animals, plants, food, and culture.  
- **Smart Questioning:** Asks elimination-based yes/no questions for fast guessing.  
- **Maximum 20 Questions:** AI guesses within 10–20 questions for efficiency.  
- **Yes/No Answers:** Accepts only `Yes`, `No`, `Don't know`, `Probably`, `Probably not`.  
- **Interactive Chat Interface:** Engaging conversation-like gameplay.  

---

## 🛠️ Technologies Used

- **Next.js** – Frontend and API routes.  
- **React.js** – Dynamic chat interface.  
- **Google Generative AI (Gemini API)** – AI engine for question generation.  
- **JavaScript / TypeScript** – Application logic.  

---

## 🚀 How to Play

1. Think of something in your mind (human, animal, place, plant, object).  
2. The AI will start by asking a broad question:  
   - Example: "Is it living?"  
3. Answer the AI using one of the allowed responses:  
   - `Yes`, `No`, `Don't know`, `Probably`, `Probably not`.  
4. The AI will continue asking elimination-based questions to narrow down possibilities.  
5. After sufficient questioning (max 20 questions), the AI will guess:  
   - Example: "I think you are thinking of Sachin Tendulkar. Am I right?"  
6. You can continue playing with a new thought!  

---

## 📂 Project Structure

mind-guesser/
│
├─ app/
│ ├─ page.tsx # React component for chat interface
│
├─ pages/api/
│ ├─ guess.ts # API route using Google Gemini AI
│
├─ components/
│ ├─ ChatBox.tsx # Chat interface component
│ ├─ Message.tsx # Individual message component
│
├─ .env.local # Store GEMINI_API_KEY
├─ package.json
├─ tsconfig.json
└─ README.md

---

## ⚡ Installation & Setup

1. Clone the repository:  
```git clone https://github.com/yourusername/mind-guesser.git```
   ```cd mind-guesser```

2. Install dependencies:
```npm install```

3. Add your Google Gemini API key in .env.local:

```GEMINI_API_KEY=your_api_key_here```

4. Run the development server:

```npm run dev```

Open your browser and go to http://localhost:3000 to play the game.