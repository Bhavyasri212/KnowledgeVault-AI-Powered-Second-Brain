"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Sparkles,
  Bot,
  User,
  ArrowLeft,
  Copy,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// 📦 NOTE: To enable Markdown, you would run: npm install react-markdown
// import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your Second Brain. Ask me anything about your notes, links, or insights.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  // State for copy feedback
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async (e?: React.FormEvent, overrideInput?: string) => {
    if (e) e.preventDefault();
    const textToSend = overrideInput || input;

    if (!textToSend.trim()) return;

    // 1. Create the new user message object
    const userMsg: Message = { role: "user", content: textToSend };

    // 2. Optimistically update UI
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    try {
      // 3. Send the entire history
      // Get the current session and access token
      const session = await supabase.auth.getSession();
      const access_token = session.data?.session?.access_token;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({ messages: newHistory }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I had trouble accessing your brain cells. Try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Feature: Copy to Clipboard
  const handleCopy = (content: string, idx: number) => {
    navigator.clipboard.writeText(content);
    setCopiedId(idx);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Feature: Quick Prompts
  const quickPrompts = [
    "Summarize my recent notes",
    "Find connections between ideas",
    "Explain this simply",
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24 pb-6 px-4 sm:px-6 lg:px-8 flex flex-col">
      {/* Header */}
      <div className="max-w-4xl mx-auto w-full mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#E5C07B] to-[#C9B26A] rounded-xl flex items-center justify-center shadow-lg shadow-[#E5C07B]/20">
            <Bot className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#F5F5F5]">Brain Chat</h1>
            <p className="text-xs text-[#A1A1AA]">Powered by Gemini 2.0</p>
          </div>
        </div>
        <button
          onClick={() => router.back()}
          className="p-2 text-[#A1A1AA] hover:text-[#E5C07B] transition-colors rounded-lg border border-[#262626] hover:border-[#E5C07B]"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full bg-[#141414] border border-[#262626] rounded-3xl overflow-hidden flex flex-col shadow-2xl relative">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#262626] scrollbar-track-transparent">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 group ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    msg.role === "user" ? "bg-[#262626]" : "bg-[#E5C07B]/20"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-4 h-4 text-[#F5F5F5]" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-[#E5C07B]" />
                  )}
                </div>

                <div className="relative max-w-[80%]">
                  <div
                    className={`rounded-2xl p-4 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#262626] text-[#F5F5F5]"
                        : "bg-gradient-to-br from-[#1A1A1A] to-[#141414] border border-[#262626] text-[#A1A1AA]"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>

                  {/* ✅ Feature: Copy Button (Only for Assistant) */}
                  {msg.role === "assistant" && (
                    <button
                      onClick={() => handleCopy(msg.content, idx)}
                      className="absolute -bottom-6 left-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] text-[#52525B] hover:text-[#E5C07B]"
                    >
                      {copiedId === idx ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      {copiedId === idx ? "Copied" : "Copy"}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-lg bg-[#E5C07B]/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-[#E5C07B]" />
              </div>
              <div className="flex items-center gap-3 h-10 px-4 bg-[#141414] border border-[#262626] rounded-2xl">
                {/* ✅ Feature: Enhanced Typing Indicator */}
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#E5C07B] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#E5C07B] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#E5C07B] rounded-full animate-bounce"></span>
                </div>
                <span className="text-xs text-[#52525B] animate-pulse">
                  Brain is thinking...
                </span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-[#262626] bg-[#0B0B0B]/50 backdrop-blur-md">
          {/* ✅ Feature: Quick Chips */}
          {messages.length < 3 && (
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(undefined, prompt)}
                  className="text-xs whitespace-nowrap px-3 py-1.5 rounded-full bg-[#1A1A1A] border border-[#262626] text-[#A1A1AA] hover:text-[#E5C07B] hover:border-[#E5C07B]/50 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={(e) => handleSend(e)} className="relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your brain a question..."
              className="w-full pl-6 pr-14 py-4 bg-[#0B0B0B] border border-[#262626] rounded-2xl text-[#F5F5F5] placeholder-[#52525B] focus:ring-2 focus:ring-[#E5C07B] focus:border-transparent outline-none transition-all shadow-inner"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#E5C07B] text-black rounded-xl hover:bg-[#C9B26A] disabled:opacity-50 disabled:hover:bg-[#E5C07B] transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
