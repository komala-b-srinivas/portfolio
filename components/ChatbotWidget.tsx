"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { getChatbotResponse } from "@/lib/chatbotKnowledge";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hi! I'm Komala's AI Assistant. Ask me anything about her skills, experience, or projects.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: inputValue };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate network delay
    setTimeout(() => {
      const responseText = getChatbotResponse(userMsg.text);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), sender: "ai", text: responseText };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              zIndex: 100,
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
              border: "none",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px rgba(0, 212, 255, 0.4)",
              cursor: "pointer",
            }}
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              zIndex: 100,
              width: "350px",
              height: "500px",
              maxWidth: "calc(100vw - 48px)",
              maxHeight: "calc(100vh - 48px)",
              background: "rgba(13, 13, 31, 0.85)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 12px 48px rgba(0, 0, 0, 0.5)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(0, 0, 0, 0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#00d4ff",
                    boxShadow: "0 0 8px #00d4ff",
                  }}
                />
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "white",
                    fontFamily: "var(--font-space-grotesk)",
                    letterSpacing: "0.05em",
                  }}
                >
                  AI ASSISTANT
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255, 255, 255, 0.6)",
                  cursor: "pointer",
                  display: "flex",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: msg.sender === "ai" ? "rgba(0, 212, 255, 0.15)" : "rgba(124, 58, 237, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {msg.sender === "ai" ? <Bot size={16} color="#00d4ff" /> : <User size={16} color="#7c3aed" />}
                  </div>
                  <div
                    style={{
                      background: msg.sender === "ai" ? "rgba(255, 255, 255, 0.05)" : "rgba(124, 58, 237, 0.2)",
                      border: msg.sender === "ai" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(124, 58, 237, 0.4)",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      borderTopLeftRadius: msg.sender === "ai" ? "2px" : "12px",
                      borderTopRightRadius: msg.sender === "user" ? "2px" : "12px",
                      fontSize: "14px",
                      lineHeight: 1.5,
                      color: "white",
                      maxWidth: "85%",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "rgba(0, 212, 255, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Bot size={16} color="#00d4ff" />
                  </div>
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      borderTopLeftRadius: "2px",
                    }}
                  >
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{ fontSize: "20px", lineHeight: 0.5, color: "#00d4ff" }}
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
                padding: "16px",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                background: "rgba(0, 0, 0, 0.2)",
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  style={{
                    flex: 1,
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    color: "white",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  style={{
                    background: inputValue.trim() ? "var(--accent-cyan)" : "rgba(255, 255, 255, 0.1)",
                    border: "none",
                    borderRadius: "8px",
                    width: "42px",
                    height: "42px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: inputValue.trim() ? "#000" : "rgba(255, 255, 255, 0.3)",
                    cursor: inputValue.trim() ? "pointer" : "default",
                    transition: "all 0.2s",
                  }}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
