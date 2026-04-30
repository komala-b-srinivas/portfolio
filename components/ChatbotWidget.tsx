"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBreakpoint } from "../hooks/useBreakpoint";

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
      content: "Hello, I am Jarvis. How can I assist you with Komala's technical specifications today?",
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useBreakpoint();

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

  const chatWidth = isMobile ? "calc(100vw - 32px)" : "420px";
  const chatHeight = isMobile ? "70vh" : "600px";
  const rightPos = isMobile ? "16px" : "40px";
  const bottomPos = isMobile ? "16px" : "40px";
  const btnSize = isMobile ? "56px" : "72px";

  return (
    <div style={{ position: "fixed", bottom: bottomPos, right: rightPos, zIndex: 2000 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-card"
            style={{
              width: chatWidth,
              height: chatHeight,
              marginBottom: "12px",
              display: "flex",
              flexDirection: "column",
              border: "1px solid var(--border-glow)",
              boxShadow: "0 24px 80px rgba(0, 0, 0, 0.6)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{
              padding: isMobile ? "16px 20px" : "28px 28px",
              borderBottom: "1px solid var(--border)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--accent-teal)", boxShadow: "0 0 15px var(--accent-teal)" }} />
                <h3 style={{ fontSize: "16px", fontWeight: 800, color: "white", margin: 0, letterSpacing: "-0.01em" }}>JARVIS</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "22px", padding: "4px 8px", lineHeight: 1 }}
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              padding: isMobile ? "16px" : "24px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}>
              {messages.map((m) => (
                <div key={m.id} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
                  <div style={{
                    padding: "12px 16px",
                    borderRadius: "12px",
                    fontSize: "14px",
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
                <div style={{ alignSelf: "flex-start", padding: "12px 16px", background: "rgba(255, 255, 255, 0.03)", borderRadius: "12px", border: "1px solid var(--border)" }}>
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ fontSize: "10px", color: "var(--accent-teal)", fontWeight: 800, letterSpacing: "0.2em" }}
                  >
                    PROCESSING...
                  </motion.div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: isMobile ? "14px 16px" : "24px",
              borderTop: "1px solid var(--border)",
              background: "rgba(0, 0, 0, 0.2)",
            }}>
              <form onSubmit={handleSend} style={{ display: "flex", gap: "10px" }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  style={{
                    flex: 1,
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "11px 14px",
                    color: "white",
                    fontSize: "14px",
                    outline: "none",
                    minWidth: 0,
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: "44px", height: "44px", flexShrink: 0,
                    borderRadius: "8px",
                    background: "var(--accent-teal)",
                    border: "none", color: "black",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "18px", fontWeight: 800,
                  }}
                >
                  →
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button — chat bubble */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: btnSize,
          height: btnSize,
          borderRadius: "50%",
          background: isOpen ? "oklch(0.15 0 0)" : "oklch(1 0 0)",
          backdropFilter: "blur(20px)",
          border: "none",
          boxShadow: isOpen
            ? "0 4px 24px oklch(0 0 0 / 50%)"
            : "0 4px 24px oklch(0 0 0 / 35%), 0 0 0 1px oklch(1 0 0 / 10%)",
          color: isOpen ? "oklch(1 0 0)" : "oklch(0 0 0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
          transition: "background 0.25s ease, box-shadow 0.25s ease, color 0.25s ease",
        }}
      >
        {/* Online indicator dot */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: "absolute",
              top: "6px", right: "6px",
              width: "10px", height: "10px",
              borderRadius: "50%",
              background: "#4ade80",
              border: "2px solid oklch(1 0 0)",
              zIndex: 1,
            }}
          />
        )}

        {isOpen ? (
          /* X when open */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          /* Chat bubble when closed */
          <svg width={isMobile ? "22" : "26"} height={isMobile ? "22" : "26"} viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </motion.button>
    </div>
  );
}
