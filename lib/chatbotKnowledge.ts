export interface IntentResponse {
  keywords: string[];
  response: string;
}

export const knowledgeBase: IntentResponse[] = [
  {
    keywords: ["who", "about", "komala", "background", "summary"],
    response: "Komala is an AI Automation Engineer based in New York. She holds an M.S. in Computer Science from Hofstra University and specializes in building intelligent systems, healthcare AI, and production ML pipelines."
  },
  {
    keywords: ["skills", "technologies", "stack", "know", "tools"],
    response: "Komala's core skills include: \n- AI & LLMs: Prompt Engineering, Groq API, Whisper, LLaMA, NLP.\n- Programming: Python, SQL, REST APIs.\n- ML: PyTorch, XGBoost, MediaPipe.\n- Healthcare AI: HIPAA Compliance, Clinical NLP."
  },
  {
    keywords: ["project", "projects", "work", "portfolio"],
    response: "Some of her key projects include:\n- **Rimon Health AI:** An automated clinical report writing system.\n- **Alive Human Detection:** A patented autonomous rescue robot.\n- **EmPath:** A multimodal pain detection system.\n- **ER Triage AI:** A clinical decision support system."
  },
  {
    keywords: ["rimon", "health", "report", "clinical"],
    response: "At Rimon Health, Komala built an end-to-end AI system that automates neuropsychological evaluation report writing. It reduced clinician report time from 2–3 hours to ~30 minutes using Whisper, LLaMA Vision, and LLaMA 3.3-70B."
  },
  {
    keywords: ["patent", "robot", "rescue", "alive"],
    response: "Komala holds a German utility patent (DE 20 2025 106 621) for an autonomous rescue robot system. It uses multi-sensor fusion (Doppler radar, ultrasonic, camera) to detect living humans during disasters."
  },
  {
    keywords: ["empath", "pain", "multimodal"],
    response: "EmPath is a stacked ensemble multimodal system that detects pain intensity in non-verbal patients. It fuses 35 biosignal features and 22 facial landmarks, outperforming baseline models on the BioVid dataset."
  },
  {
    keywords: ["contact", "email", "hire", "reach", "touch"],
    response: "You can reach Komala via email at komalsrinivas20@gmail.com, or connect with her on LinkedIn (linkedin.com/in/komal-b-srinivas). She's open to AI Automation, Solutions, and PM roles."
  },
  {
    keywords: ["experience", "job", "work history", "resume"],
    response: "Komala is currently an AI Automation Engineer at Rimon Health and a Marketing & Program Support Intern at the Institute of Innovation & Entrepreneurship. Previously, she was a Data Science Intern at ExcelR and a Powertrain Engineer."
  },
  {
    keywords: ["education", "degree", "university", "college"],
    response: "Komala earned her M.S. in Computer Science from Hofstra University (Expected May 2026, GPA: 3.9/4.0), and her B.E. in Electronics & Communication Engineering from MVJ College of Engineering (VTU) in India."
  },
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    response: "Hello! I'm Komala's AI Assistant. I can tell you about her skills, experience, projects, or how to contact her. What would you like to know?"
  }
];

export function getChatbotResponse(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  // Find the best match based on keyword intersection
  let bestMatch: IntentResponse | null = null;
  let maxScore = 0;

  for (const intent of knowledgeBase) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (lowerQuery.includes(kw)) {
        score++;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = intent;
    }
  }

  if (bestMatch && maxScore > 0) {
    return bestMatch.response;
  }

  return "I'm not quite sure about that. You can ask me about her skills, projects, work experience, or how to contact her!";
}
