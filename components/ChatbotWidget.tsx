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
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm Komala's AI Assistant. Ask me anything about her skills, experience, or projects.",
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.text || "Network response was not ok");
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.text,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("Failed to fetch chat:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: error.message || "Sorry, I'm having trouble connecting right now. Please try again later!",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0, 242, 255, 0.6)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            style={{
              position: "fixed",
              bottom: "32px",
              right: "32px",
              zIndex: 100,
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.8)",
              border: "1px solid rgba(0, 242, 255, 0.3)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
              cursor: "pointer",
              backdropFilter: "blur(12px)",
            }}
          >
            <div 
              style={{
                position: "absolute",
                inset: "-2px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))",
                opacity: 0.4,
                zIndex: -1,
              }}
            />
            <MessageSquare size={28} className="text-glow" style={{ color: "var(--accent-cyan)" }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: "fixed",
              bottom: "32px",
              right: "32px",
              zIndex: 100,
              width: "400px",
              height: "600px",
              maxWidth: "calc(100vw - 64px)",
              maxHeight: "calc(100vh - 64px)",
              background: "rgba(10, 10, 15, 0.8)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 24px 64px rgba(0, 0, 0, 0.8)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "24px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(0, 0, 0, 0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "var(--accent-cyan)",
                    boxShadow: "0 0 12px var(--accent-cyan)",
                  }}
                />
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "white",
                    fontFamily: "var(--font-outfit)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  Neural Assistant
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255, 255, 255, 0.4)",
                  cursor: "pointer",
                  display: "flex",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.4)")}
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                    flexDirection: msg.role === "user" ? "row-reverse" : "row",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "12px",
                      background: msg.role !== "user" ? "rgba(0, 242, 255, 0.1)" : "rgba(124, 58, 237, 0.1)",
                      border: `1px solid ${msg.role !== "user" ? "rgba(0, 242, 255, 0.2)" : "rgba(124, 58, 237, 0.2)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {msg.role !== "user" ? <Bot size={18} color="var(--accent-cyan)" /> : <User size={18} color="var(--accent-purple)" />}
                  </div>
                  <div
                    className="glass-panel"
                    style={{
                      padding: "16px 20px",
                      borderRadius: "18px",
                      borderTopLeftRadius: msg.role !== "user" ? "4px" : "18px",
                      borderTopRightRadius: msg.role === "user" ? "4px" : "18px",
                      fontSize: "15px",
                      lineHeight: 1.6,
                      color: "rgba(255, 255, 255, 0.8)",
                      maxWidth: "80%",
                      whiteSpace: "pre-wrap",
                      fontFamily: "var(--font-outfit)",
                      fontWeight: 300,
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "12px",
                      background: "rgba(0, 242, 255, 0.1)",
                      border: "1px solid rgba(0, 242, 255, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Bot size={18} color="var(--accent-cyan)" />
                  </div>
                  <div
                    className="glass-panel"
                    style={{
                      padding: "16px 20px",
                      borderRadius: "18px",
                      borderTopLeftRadius: "4px",
                    }}
                  >
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{ fontSize: "24px", lineHeight: 0.5, color: "var(--accent-cyan)" }}
                    >
                      ...
                    </motion.div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div
              style={{
                padding: "24px",
                borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                background: "rgba(0, 0, 0, 0.3)",
              }}
            >
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  gap: "12px",
                }}
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Query the system..."
                  disabled={isLoading}
                  style={{
                    flex: 1,
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "14px",
                    padding: "14px 20px",
                    color: "white",
                    fontSize: "15px",
                    outline: "none",
                    fontFamily: "var(--font-outfit)",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-cyan)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  style={{
                    background: inputValue.trim() && !isLoading ? "white" : "rgba(255, 255, 255, 0.05)",
                    border: "none",
                    borderRadius: "14px",
                    width: "52px",
                    height: "52px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: inputValue.trim() && !isLoading ? "black" : "rgba(255, 255, 255, 0.2)",
                    cursor: inputValue.trim() && !isLoading ? "pointer" : "default",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={(e) => {
                    if (inputValue.trim() && !isLoading) e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <Send size={22} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
