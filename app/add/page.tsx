"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Loader2,
  Plus,
  ArrowLeft,
  Type,
  AlignLeft,
  Tag,
  Link as LinkIcon,
  Download,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { KnowledgeType } from "../types";
import { supabase } from "@/lib/supabase";

export default function AddKnowledgePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [aiPreviewData, setAiPreviewData] = useState({
    summary: "",
    tags: [] as string[],
  });
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "note" as KnowledgeType,
    tags: "",
    sourceUrl: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("draft");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load draft");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("draft", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();

        const form = document.querySelector("form");
        if (form) form.requestSubmit();
      }

      if (e.key === "Escape") {
        if (showPreview) setShowPreview(false);
        else router.back();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router, showPreview]);

  useEffect(() => {
    const checkSession = async () => {
      setAuthLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setAuthLoading(false);
    };
    checkSession();
  }, []);

  const handleFetchUrl = async () => {
    if (!formData.sourceUrl) return;
    setFetching(true);

    try {
      const res = await fetch("/api/fetch-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: formData.sourceUrl }),
      });

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();

      setFormData((prev) => ({
        ...prev,
        title: data.title || prev.title,
        content: data.content || prev.content,

        type: "link",
      }));
    } catch (error) {
      console.error(error);
      alert(
        "Could not fetch this URL automatically. Please copy/paste manually.",
      );
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!showPreview) {
      setLoading(true);
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            content: formData.content,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Analysis failed");
        }
        const data = await res.json();
        setAiPreviewData({
          summary: data.summary,
          tags: data.tags,
        });

        setShowPreview(true);
      } catch (err) {
        console.error(err);
        alert("AI Analysis failed. You can skip preview or try again.");
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    try {
      const manualTags = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const combinedTags = [...new Set([...manualTags, ...aiPreviewData.tags])];

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        alert("You must be logged in to save.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/knowledge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },

        body: JSON.stringify({
          ...formData,
          tags: combinedTags,
          summary: aiPreviewData.summary,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save knowledge");
      }

      localStorage.removeItem("draft");
      router.push("/collections");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to add knowledge");
    } finally {
      setLoading(false);
    }
  };

  const contentPlaceholder =
    formData.type === "link"
      ? "Paste key takeaways from the article or fetch content automatically..."
      : "Pour your thoughts here...";
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#A1A1AA]">
        <Loader2 className="w-6 h-6 animate-spin mr-2" /> Checking
        authentication...
      </div>
    );
  }

  if (user === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0B0B] text-center px-4">
        <Sparkles className="w-16 h-16 text-[#E5C07B] mb-6" />
        <h1 className="text-3xl text-[#F5F5F5] font-bold mb-2">
          Login or Signup to add knowledge
        </h1>
        <p className="text-[#A1A1AA] mb-6">
          You need an account to add and manage your personal knowledge.
        </p>
        <button
          onClick={() => router.push("/auth")}
          className="bg-[#E5C07B] text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#C9B26A] transition-all"
        >
          Go to Login / Signup
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#A1A1AA] hover:text-[#E5C07B] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back <span className="text-xs ml-1 text-[#52525B]">(Esc)</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#E5C07B] to-[#C9B26A] rounded-2xl mb-4 shadow-lg shadow-[#E5C07B]/20">
              <Sparkles className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-4xl font-bold text-[#F5F5F5] mb-2">
              Capture Knowledge
            </h1>
            <p className="text-[#A1A1AA]">
              Store your insights and let AI organize them.
            </p>
          </div>

          <div className="bg-[#141414] border border-[#262626] rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#A1A1AA] block mb-2">
                  Format
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {(["note", "link", "insight"] as KnowledgeType[]).map(
                    (type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, type })}
                        className={`py-3 rounded-xl font-medium capitalize transition-all border ${
                          formData.type === type
                            ? "bg-[#E5C07B] text-black border-[#E5C07B] shadow-lg shadow-[#E5C07B]/20"
                            : "bg-[#0B0B0B] text-[#A1A1AA] border-[#262626] hover:border-[#E5C07B]/50 hover:text-[#F5F5F5]"
                        }`}
                      >
                        {type}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#E5C07B]">
                    <Type className="w-4 h-4" /> Title
                  </label>

                  <span className="text-xs text-[#52525B]">
                    {formData.title.length} chars
                  </span>
                </div>
                <input
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-4 bg-[#0B0B0B] border border-[#262626] rounded-xl text-lg text-[#F5F5F5] placeholder-[#52525B] focus:ring-2 focus:ring-[#E5C07B] focus:border-transparent outline-none transition-all"
                  placeholder="e.g. The Future of AI..."
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#E5C07B]">
                    <LinkIcon className="w-4 h-4" /> Source URL
                    {formData.type === "link" && (
                      <span className="text-[#A1A1AA] text-xs ml-1">
                        (Required)
                      </span>
                    )}
                    {formData.type !== "link" && (
                      <span className="text-[#52525B] text-xs ml-1">
                        (Optional)
                      </span>
                    )}
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="url"
                    required={formData.type === "link"}
                    value={formData.sourceUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, sourceUrl: e.target.value })
                    }
                    className="w-full pl-4 pr-24 py-3 bg-[#0B0B0B] border border-[#262626] rounded-xl text-[#F5F5F5] placeholder-[#52525B] focus:ring-2 focus:ring-[#E5C07B] outline-none transition-all"
                    placeholder="https://example.com/article"
                  />

                  <button
                    type="button"
                    onClick={handleFetchUrl}
                    disabled={fetching || !formData.sourceUrl}
                    className="absolute right-2 top-1.5 bottom-1.5 px-3 bg-[#1A1A1A] border border-[#262626] rounded-lg text-xs font-medium text-[#E5C07B] hover:bg-[#E5C07B] hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    {fetching ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Download className="w-3 h-3" />
                    )}
                    Fetch
                  </button>
                </div>

                {formData.type === "link" && !formData.sourceUrl && (
                  <p className="text-xs text-[#E5C07B]/80">
                    Link items must include a source URL.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 text-sm font-medium text-[#E5C07B]">
                    <AlignLeft className="w-4 h-4" /> Content
                  </label>

                  <span className="text-xs text-[#52525B]">
                    {formData.content.length} chars
                  </span>
                </div>
                <textarea
                  required
                  rows={8}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-4 py-4 bg-[#0B0B0B] border border-[#262626] rounded-xl text-[#F5F5F5] placeholder-[#52525B] focus:ring-2 focus:ring-[#E5C07B] focus:border-transparent outline-none resize-none transition-all leading-relaxed"
                  placeholder={contentPlaceholder}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-[#E5C07B]">
                  <Tag className="w-4 h-4" /> Manual Tags (Optional)
                </label>
                <input
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#0B0B0B] border border-[#262626] rounded-xl text-[#F5F5F5] placeholder-[#52525B] focus:ring-2 focus:ring-[#E5C07B] outline-none transition-all"
                  placeholder="productivity, ideas, draft..."
                />
                <p className="text-xs text-[#52525B]">
                  Separate tags with commas.
                </p>
              </div>

              <AnimatePresence>
                {showPreview && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-[#1A1A1A]/50 border border-[#E5C07B]/30 rounded-xl p-6 mb-4">
                      <h3 className="text-[#E5C07B] text-sm font-bold flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4" /> AI SUMMARY PREVIEW
                      </h3>
                      <p className="text-[#A1A1AA] text-sm italic mb-4">
                        "{aiPreviewData.summary}"
                      </p>
                      <div className="flex gap-2">
                        {aiPreviewData.tags.map((t, i) => (
                          <span
                            key={i}
                            className="text-xs bg-[#E5C07B]/10 text-[#E5C07B] px-2 py-1 rounded"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-4 pt-4 border-t border-[#262626]">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-8 py-4 bg-transparent border border-[#262626] text-[#A1A1AA] rounded-xl font-medium hover:text-[#F5F5F5] hover:border-[#F5F5F5] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg ${
                    showPreview
                      ? "bg-[#E5C07B] text-black hover:bg-[#C9B26A] shadow-[#E5C07B]/10"
                      : "bg-[#1A1A1A] border border-[#E5C07B] text-[#E5C07B] hover:bg-[#E5C07B] hover:text-black"
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : showPreview ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Confirm & Save (Cmd+Enter)
                    </>
                  ) : (
                    <>Analyze & Review</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
