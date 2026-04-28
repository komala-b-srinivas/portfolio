"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "System initialized. Hello, I am Jarvis. How can I assist you with Komala's technical specifications today?",
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      if (data.text) {
        setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: data.text }]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "40px", right: "40px", zIndex: 2000 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-card"
            style={{
              width: "420px",
              height: "600px",
              marginBottom: "24px",
              display: "flex",
              flexDirection: "column",
              border: "1px solid var(--border-glow)",
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.6)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{ padding: "32px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--accent-teal)", boxShadow: "0 0 15px var(--accent-teal)" }} />
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 800, color: "white", margin: 0, letterSpacing: "-0.01em" }}>JARVIS</h3>
                  <span style={{ fontSize: "10px", color: "var(--accent-teal)", fontWeight: 800, letterSpacing: "0.2em" }}>SYSTEM ONLINE</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "24px" }}>×</button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: "32px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "24px" }}>
              {messages.map((m) => (
                <div key={m.id} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
                  <div style={{
                    padding: "16px 20px",
                    borderRadius: "12px",
                    fontSize: "15px",
                    lineHeight: 1.6,
                    background: m.role === "user" ? "var(--accent-teal)" : "rgba(255, 255, 255, 0.03)",
                    color: m.role === "user" ? "black" : "white",
                    fontWeight: m.role === "user" ? 700 : 400,
                    border: m.role === "user" ? "none" : "1px solid var(--border)",
                  }}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div style={{ alignSelf: "flex-start", padding: "16px 20px", background: "rgba(255, 255, 255, 0.03)", borderRadius: "12px", border: "1px solid var(--border)" }}>
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ fontSize: "10px", color: "var(--accent-teal)", fontWeight: 800, letterSpacing: "0.2em" }}>PROCESSING...</motion.div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{ padding: "32px", borderTop: "1px solid var(--border)", background: "rgba(0, 0, 0, 0.2)" }}>
              <form onSubmit={handleSend} style={{ display: "flex", gap: "16px" }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  style={{ flex: 1, background: "rgba(255, 255, 255, 0.05)", border: "1px solid var(--border)", borderRadius: "8px", padding: "14px 20px", color: "white", fontSize: "15px", outline: "none" }}
                />
                <button type="submit" style={{ width: "52px", height: "52px", borderRadius: "8px", background: "var(--accent-teal)", border: "none", color: "black", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: 800 }}>→</button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: "rgba(3, 3, 5, 0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid var(--accent-teal)",
          boxShadow: "0 0 30px rgba(0, 242, 255, 0.3)",
          color: "var(--accent-teal)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "28px",
        }}
      >
        <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity }}>◈</motion.div>
      </motion.button>
    </div>
  );
}
