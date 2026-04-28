import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    return Response.json(
      { text: "System Error: Groq API Key is missing. Please ensure 'GROQ_API_KEY' is set in your Vercel Environment Variables." },
      { status: 500 }
    );
  }

  const { messages } = await req.json();

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are Jarvis, Komala's Assistant on her portfolio website.
            You must answer questions as her helpful assistant. Keep answers concise, professional, and friendly.

            ABOUT KOMALA:
            - Komala Belur Srinivas is an AI Automation Engineer based in New York.
            - She holds an M.S. in Computer Science from Hofstra University (Expected May 2026).
            - Open to full-time roles in AI Automation, Solutions, and PM.
            - Email: komalsrinivas20@gmail.com. LinkedIn: linkedin.com/in/komal-b-srinivas.

            SKILLS:
            - AI & LLMs: Prompt Engineering, Groq API, Whisper, LLaMA, NLP, Clinical NLP.
            - Programming: Python, SQL, REST APIs, Streamlit.
            - ML: PyTorch, XGBoost, MediaPipe, Supervised/Unsupervised Learning.
            - Healthcare AI: HIPAA Compliance, Clinical Document Automation.

            PROJECTS & PATENTS:
            - Rimon Health AI: Built an end-to-end AI clinical report writing system (reduced time from 3 hours to 30 mins) using Whisper, LLaMA Vision, and LLaMA 3.3-70B.
            - Alive Human Detection: Granted a German Utility Patent (DE 20 2025 106 621) for an autonomous rescue robot using Doppler radar.
            - EmPath: Multimodal pain detection system for non-verbal patients.
            - ER Triage AI: AI-assisted clinical decision support system.

            If someone asks a question you don't know the answer to, politely direct them to contact Komala via email or LinkedIn.
            Do NOT invent information.`,
          },
          ...messages.map((m: any) => ({ role: m.role, content: m.content })),
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq Error:", errorData);
      return Response.json(
        { text: `Groq Service Error: ${errorData.error?.message || "Unknown error"}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    return Response.json({ text: data.choices[0].message.content });
  } catch (error) {
    console.error("Chat API Error:", error);
    return Response.json(
      { text: "The AI service is currently unavailable. Please check your connection or try again later." },
      { status: 500 }
    );
  }
}
