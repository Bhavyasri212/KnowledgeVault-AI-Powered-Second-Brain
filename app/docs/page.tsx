"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Box,
  Cpu,
  Layers,
  Share2,
  Database,
  Layout,
  Server,
  Brain,
  CheckCircle,
  Terminal,
  Shield,
  Zap,
  Eye,
  Clock,
  Plug,
  Code2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Docs() {
  const [activeTab, setActiveTab] = useState("portable");

  const architectureLayers = [
    {
      icon: Layout,
      label: "Frontend (The Face)",
      tech: "Next.js 14 + Tailwind",
      desc: "What you see. A fast, interactive interface that runs in your browser.",
      details:
        "React components with real-time updates via Supabase subscriptions.",
    },
    {
      icon: Server,
      label: "API Layer (The Connector)",
      tech: "Next.js API Routes",
      desc: "Securely handles requests between the frontend and our database/AI.",
      details: "RESTful endpoints for Search, Chat, and Knowledge Management.",
    },
    {
      icon: Brain,
      label: "Intelligence (The Brain)",
      tech: "Gemini 3 Flash Preview",
      desc: "Google's AI model that reads, summarizes, and tags your notes automatically.",
      details: "Processes unstructured data and generates semantic embeddings.",
    },
    {
      icon: Database,
      label: "Memory (The Vault)",
      tech: "Supabase (PostgreSQL)",
      desc: "A robust cloud database that stores your knowledge forever.",
      details: "Vector embeddings stored via pgvector for semantic search.",
    },
  ];

  const uxPrinciples = [
    {
      icon: Eye,
      title: "Motion with Meaning",
      principle: "Every animation serves a purpose",
      implementation: "Framer Motion for intentional UI transitions",
      benefit: "Reduces cognitive load and guides user attention",
    },
    {
      icon: Zap,
      title: "Optimistic UI",
      principle: "Instant feedback feels better",
      implementation: "Local state updates before server confirmation",
      benefit: "App feels fast and responsive, no loading spinners",
    },
    {
      icon: Clock,
      title: "Auto-Save Philosophy",
      principle: "Never lose work",
      implementation: "Background syncing with conflict resolution",
      benefit: "Users focus on thinking, not saving",
    },
    {
      icon: Shield,
      title: "Progressive Enhancement",
      principle: "Works offline, syncs online",
      implementation: "Graceful degradation with IndexedDB fallback",
      benefit: "Reliability across network conditions",
    },
  ];

  const swappableComponents = [
    {
      layer: "AI Model",
      current: "Gemini 3 Flash Preview",
      alternatives: "Claude 3, GPT-4, Local LLaMA",
      effort: "15 mins - Single API swap",
    },
    {
      layer: "Database",
      current: "Supabase (PostgreSQL)",
      alternatives: "Firebase, MongoDB, PlanetScale",
      effort: "30 mins - ORM abstraction layer",
    },
    {
      layer: "Frontend Framework",
      current: "Next.js 14",
      alternatives: "SvelteKit, Remix, Astro",
      effort: "2-3 hours - Components ported",
    },
    {
      layer: "Authentication",
      current: "Supabase Auth",
      alternatives: "Auth0, Clerk, NextAuth.js",
      effort: "1 hour - Provider migration",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-10 pb-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#E5C07B]/30">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#A1A1AA] hover:text-[#E5C07B] mb-8 transition-colors group text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 border-b border-[#262626] pb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#E5C07B]/10 text-[#E5C07B] border border-[#E5C07B]/20 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider">
              System Architecture
            </span>
          </div>
          <h1 className="text-5xl font-bold text-[#F5F5F5] mb-6 tracking-tight">
            How KnowledgeVault <span className="text-[#E5C07B]">Works</span>
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-2xl leading-relaxed">
            A comprehensive breakdown of the four core architectural principles
            that make this AI-powered second brain smart, scalable, and
            future-proof.
          </p>
        </motion.div>

        {/* Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-2 sticky top-24 self-start">
            {[
              { id: "portable", icon: Box, label: "Portable Architecture" },
              { id: "ux", icon: Layers, label: "Principles-Based UX" },
              { id: "agent", icon: Cpu, label: "Agent Thinking" },
              { id: "infra", icon: Share2, label: "Infrastructure Mindset" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                  activeTab === item.id
                    ? "bg-[#E5C07B] text-black shadow-lg shadow-[#E5C07B]/20"
                    : "text-[#A1A1AA] hover:bg-[#1A1A1A] hover:text-[#F5F5F5]"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 min-h-[600px]">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* SECTION 1: PORTABLE ARCHITECTURE */}
              {activeTab === "portable" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-[#F5F5F5] mb-4">
                      Portable Architecture
                    </h2>
                    <p className="text-[#A1A1AA] leading-relaxed mb-6">
                      We designed BrainHub with modularity at its core. Each
                      layer is decoupled and can be swapped independently
                      without affecting the system. Think of it as building with
                      Lego blocks instead of glue—everything clicks together,
                      but nothing is permanently stuck.
                    </p>
                  </div>

                  {/* Layer Visualization */}
                  <div className="grid gap-4 mb-10">
                    {architectureLayers.map((layer, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-6 p-6 bg-[#141414] border border-[#262626] rounded-2xl relative overflow-hidden group hover:border-[#E5C07B]/50 transition-colors"
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E5C07B] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="p-3 bg-[#0B0B0B] rounded-lg border border-[#262626] group-hover:border-[#E5C07B]/30 transition-colors">
                          <layer.icon className="w-6 h-6 text-[#E5C07B]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-[#F5F5F5] font-semibold">
                            {layer.label}
                          </h3>
                          <p className="text-sm text-[#A1A1AA]">{layer.desc}</p>
                          <p className="text-xs text-[#52525B] mt-1">
                            {layer.details}
                          </p>
                        </div>
                        <div className="hidden sm:block text-xs font-mono text-[#52525B] bg-[#0B0B0B] px-3 py-1 rounded-full border border-[#262626]">
                          {layer.tech}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Swappable Components Table */}
                  <div className="bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 bg-[#0B0B0B] border-b border-[#262626]">
                      <h3 className="text-[#F5F5F5] font-bold flex items-center gap-2">
                        <Plug className="w-4 h-4 text-[#E5C07B]" />
                        Swappable Components
                      </h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[#262626]">
                            <th className="px-6 py-3 text-left text-[#A1A1AA] font-mono">
                              Layer
                            </th>
                            <th className="px-6 py-3 text-left text-[#A1A1AA] font-mono">
                              Current
                            </th>
                            <th className="px-6 py-3 text-left text-[#A1A1AA] font-mono">
                              Alternatives
                            </th>
                            <th className="px-6 py-3 text-left text-[#A1A1AA] font-mono">
                              Swap Effort
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {swappableComponents.map((comp, i) => (
                            <tr
                              key={i}
                              className="border-b border-[#262626] hover:bg-[#0B0B0B]/50 transition-colors"
                            >
                              <td className="px-6 py-3 text-[#F5F5F5] font-medium">
                                {comp.layer}
                              </td>
                              <td className="px-6 py-3 text-[#E5C07B]">
                                {comp.current}
                              </td>
                              <td className="px-6 py-3 text-[#A1A1AA]">
                                {comp.alternatives}
                              </td>
                              <td className="px-6 py-3 text-[#52525B] text-xs">
                                {comp.effort}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
              {/* SECTION 2: PRINCIPLES-BASED UX */}
              {activeTab === "ux" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-[#F5F5F5] mb-4">
                      Principles-Based UX
                    </h2>
                    <p className="text-[#A1A1AA] leading-relaxed mb-6">
                      We follow a strict set of design principles to ensure that
                      capturing knowledge feels effortless, not like a chore.
                      Every interaction is intentional and every animation has
                      purpose.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {uxPrinciples.map((principle, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 bg-[#141414] border border-[#262626] rounded-2xl hover:border-[#E5C07B]/30 transition-colors group"
                      >
                        <div className="mb-4 p-3 w-fit bg-[#E5C07B]/10 rounded-lg border border-[#E5C07B]/20 group-hover:border-[#E5C07B] transition-colors">
                          <principle.icon className="w-5 h-5 text-[#E5C07B]" />
                        </div>
                        <h3 className="text-[#F5F5F5] font-bold mb-1">
                          {principle.title}
                        </h3>
                        <p className="text-xs text-[#E5C07B] font-mono mb-3">
                          {principle.principle}
                        </p>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-[#A1A1AA] font-mono mb-1">
                              Implementation:
                            </p>
                            <p className="text-sm text-[#A1A1AA]">
                              {principle.implementation}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-[#A1A1AA] font-mono mb-1">
                              Benefit:
                            </p>
                            <p className="text-sm text-[#A1A1AA]">
                              {principle.benefit}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Visual Demo */}
                  <div className="bg-[#141414] border border-[#262626] rounded-2xl p-8">
                    <h3 className="text-lg font-bold text-[#F5F5F5] mb-6">
                      Live Principle Demo
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#0B0B0B] h-40 rounded-xl flex items-center justify-center border border-[#262626] overflow-hidden">
                        <div className="flex gap-3 items-center">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-3 h-3 rounded-full bg-[#E5C07B]"
                          />
                          <div className="h-1 w-12 bg-[#262626] rounded-full" />
                          <div className="w-8 h-8 rounded-lg bg-[#262626] border border-[#333] flex items-center justify-center text-[10px] text-[#555]">
                            AI
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#0B0B0B] h-40 rounded-xl flex items-center justify-center border border-[#262626] flex-col gap-3">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            repeat: Infinity,
                            duration: 3,
                            repeatDelay: 1,
                          }}
                          className="px-4 py-2 bg-[#E5C07B]/10 border border-[#E5C07B] text-[#E5C07B] rounded-lg text-sm font-mono"
                        >
                          Auto-Saving...
                        </motion.div>
                        <span className="text-xs text-[#52525B]">
                          Offline mode active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* SECTION 3: AGENT THINKING */}
              {activeTab === "agent" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-[#F5F5F5] mb-4">
                      Agent Thinking
                    </h2>
                    <p className="text-[#A1A1AA] leading-relaxed mb-6">
                      Most apps are "passive"—they just store what you type.
                      KnowledgeVault is "active." It uses an AI Agent (Gemini 3
                      Flash Preview) to act as a librarian that continuously
                      cleans, organizes, and enriches your knowledge
                      automatically.
                    </p>
                  </div>

                  <div className="bg-[#141414] border border-[#262626] rounded-2xl p-8 mb-6">
                    <h3 className="text-lg font-bold text-[#F5F5F5] mb-6 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-[#E5C07B]" />
                      The Automation Workflow
                    </h3>
                    <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-[#262626]">
                      {[
                        {
                          title: "1. You Input Messy Data",
                          desc: "Paste a URL, screenshot, or unstructured thought without worrying about formatting.",
                          icon: "📥",
                        },
                        {
                          title: "2. The Agent Wakes Up",
                          desc: "Before saving, Gemini reads your content, understands context, and extracts meaning.",
                          icon: "🤖",
                        },
                        {
                          title: "3. Auto-Enhancement",
                          desc: "AI generates smart titles, 1-sentence summaries, relevant tags, and semantic embeddings.",
                          icon: "✨",
                        },
                        {
                          title: "4. Organized Storage",
                          desc: "Data is stored cleanly in PostgreSQL with vector embeddings for semantic search.",
                          icon: "💾",
                        },
                        {
                          title: "5. Continuous Learning",
                          desc: "System learns from your interactions to improve recommendations over time.",
                          icon: "📚",
                        },
                      ].map((step, i) => (
                        <div key={i} className="relative pl-12">
                          <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-[#0B0B0B] border border-[#262626] flex items-center justify-center z-10 text-lg">
                            {step.icon}
                          </div>
                          <h4 className="text-[#F5F5F5] font-semibold">
                            {step.title}
                          </h4>
                          <p className="text-sm text-[#A1A1AA]">{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Agent Benefits */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Reduces Noise",
                        desc: "Auto-tagging removes duplicates and organizes chaos",
                      },
                      {
                        title: "Saves Time",
                        desc: "No manual categorization—AI does it instantly",
                      },
                      {
                        title: "Improves Search",
                        desc: "Semantic embeddings help you find what you need",
                      },
                      {
                        title: "Maintains Quality",
                        desc: "Consistent metadata across all knowledge pieces",
                      },
                    ].map((benefit, i) => (
                      <div
                        key={i}
                        className="p-4 bg-[#0B0B0B] border border-[#262626] rounded-xl flex items-start gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-[#E5C07B] mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-[#F5F5F5] font-semibold text-sm">
                            {benefit.title}
                          </h4>
                          <p className="text-xs text-[#A1A1AA] mt-1">
                            {benefit.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 4: INFRASTRUCTURE MINDSET */}
              {activeTab === "infra" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-[#F5F5F5] mb-4">
                      Infrastructure Mindset
                    </h2>
                    <p className="text-[#A1A1AA] leading-relaxed mb-6">
                      BrainHub isn't just a website—it's a platform. Core
                      features are built as API endpoints that can power web,
                      mobile, and third-party integrations. Your knowledge can
                      flow anywhere.
                    </p>
                  </div>

                  {/* API Architecture */}
                  <div className="bg-[#141414] border border-[#262626] rounded-2xl p-8 mb-6">
                    <h3 className="text-lg font-bold text-[#F5F5F5] mb-6 flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-[#E5C07B]" />
                      Core API Endpoints
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          endpoint: "POST /api/knowledge",
                          desc: "Create new knowledge item (note, link, insight)",
                          auth: "Required",
                        },
                        {
                          endpoint: "GET /api/knowledge",
                          desc: "Retrieve all knowledge items (latest first)",
                          auth: "Required",
                        },
                        {
                          endpoint: "POST /api/analyze",
                          desc: "AI-powered summary, tags, and embeddings",
                          auth: "Required",
                        },
                        {
                          endpoint: "POST /api/search",
                          desc: "Semantic search across your knowledge base",
                          auth: "Required",
                        },
                        {
                          endpoint: "POST /api/chat",
                          desc: "Chat with AI using stored knowledge as context",
                          auth: "Required",
                        },
                        {
                          endpoint: "POST /api/fetch-url",
                          desc: "Extract & save knowledge from a web URL",
                          auth: "Required",
                        },
                      ].map((api, i) => (
                        <div
                          key={i}
                          className="p-4 bg-[#0B0B0B] rounded-lg border border-[#262626] font-mono text-sm"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span className="text-[#E5C07B] font-bold">
                                {api.endpoint.split(" ")[0]}
                              </span>
                              <span className="text-[#98C379]">
                                {api.endpoint.split(" ")[1]}
                              </span>
                            </div>
                            <span className="text-xs px-2 py-1 bg-[#E5C07B]/10 border border-[#E5C07B]/30 text-[#E5C07B] rounded">
                              {api.auth}
                            </span>
                          </div>
                          <div className="text-xs text-[#A1A1AA]">
                            {api.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Code Example */}
                  <div className="bg-[#0B0B0B] border border-[#262626] rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-[#141414] border-b border-[#262626]">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-[#A1A1AA]" />
                        <span className="text-xs text-[#A1A1AA] font-mono">
                          Example: Create Note with Auto-Enhancement
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                      </div>
                    </div>
                    <div className="p-6 font-mono text-sm overflow-x-auto space-y-6">
                      <div>
                        <div className="text-[#A1A1AA] mb-3">
                          # POST /api/knowledge - Create new knowledge
                        </div>
                        <div className="text-[#61AFEF]">
                          {"{"}
                          <div className="pl-4">
                            <span className="text-[#E06C75]">"title"</span>
                            <span className="text-[#ABB2BF]">: </span>
                            <span className="text-[#98C379]">
                              "Foundations of Machine Learning"
                            </span>
                            <span className="text-[#ABB2BF]">,</span>
                            <br />
                            <span className="text-[#E06C75]">"content"</span>
                            <span className="text-[#ABB2BF]">: </span>
                            <span className="text-[#98C379]">
                              "Machine learning is a core component of modern AI
                              systems..."
                            </span>
                            <span className="text-[#ABB2BF]">,</span>
                            <br />
                            <span className="text-[#E06C75]">"source"</span>
                            <span className="text-[#ABB2BF]">: </span>
                            <span className="text-[#98C379]">"manual"</span>
                          </div>
                          {"}"}
                        </div>
                      </div>

                      <div>
                        <div className="text-[#A1A1AA] mb-3">
                          # Response: AI-Enhanced Knowledge
                        </div>
                        <div className="text-[#61AFEF]">
                          {"{"}
                          <div className="pl-4">
                            <span className="text-[#E06C75]">"id"</span>
                            <span className="text-[#ABB2BF]">: </span>
                            <span className="text-[#D19A66]">
                              "knowledge_xyz123"
                            </span>
                            <span className="text-[#ABB2BF]">,</span>
                            <br />
                            <span className="text-[#E06C75]">"title"</span>
                            <span className="text-[#ABB2BF]">: </span>
                            <span className="text-[#98C379]">
                              "Foundations of Machine Learning"
                            </span>
                            <span className="text-[#ABB2BF]">,</span>
                            <br />
                            <span className="text-[#E06C75]">"summary"</span>
                            <span className="text-[#ABB2BF]">: </span>
                            <span className="text-[#98C379]">
                              "An overview of machine learning concepts and
                              their role in AI systems"
                            </span>
                            <span className="text-[#ABB2BF]">,</span>
                            <br />
                            <span className="text-[#E06C75]">"tags"</span>
                            <span className="text-[#ABB2BF]">: </span>
                            <span className="text-[#61AFEF]">
                              [<span className="text-[#98C379]">"AI"</span>
                              {", "}
                              <span className="text-[#98C379]">
                                "Machine Learning"
                              </span>
                              {", "}
                              <span className="text-[#98C379]">
                                "Neural Networks"
                              </span>
                              ]
                            </span>
                            <span className="text-[#ABB2BF]">,</span>
                            <br />
                            <span className="text-[#E06C75]">"embedding"</span>
                            <span className="text-[#ABB2BF]">: </span>
                            <span className="text-[#D19A66]">
                              [0.217, -0.142, ...]
                            </span>
                            <span className="text-[#ABB2BF]">,</span>
                            <br />
                            <span className="text-[#E06C75]">"createdAt"</span>
                            <span className="text-[#ABB2BF]">: </span>
                            <span className="text-[#98C379]">
                              "2026-01-31T10:30:00Z"
                            </span>
                          </div>
                          {"}"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Search Example */}
                  <div className="bg-[#0B0B0B] border border-[#262626] rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-[#141414] border-b border-[#262626]">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-[#A1A1AA]" />
                        <span className="text-xs text-[#A1A1AA] font-mono">
                          Example: Semantic Search
                        </span>
                      </div>
                    </div>
                    <div className="p-6 font-mono text-sm overflow-x-auto space-y-6">
                      <div>
                        <div className="text-[#A1A1AA] mb-3">
                          # POST /api/search - Find similar notes
                        </div>
                        <div className="text-[#61AFEF]">
                          {"{"}
                          <div className="pl-4">
                            <span className="text-[#E06C75]">"query"</span>
                            <span className="text-[#ABB2BF]">: </span>
                            <span className="text-[#98C379]">
                              "neural networks and deep learning"
                            </span>
                            <span className="text-[#ABB2BF]">,</span>
                            <br />
                            <span className="text-[#E06C75]">"limit"</span>
                            <span className="text-[#ABB2BF]">: </span>
                            <span className="text-[#D19A66]">5</span>
                          </div>
                          {"}"}
                        </div>
                      </div>

                      <div>
                        <div className="text-[#A1A1AA] mb-3">
                          # Response: Ranked Results
                        </div>
                        <div className="text-[#61AFEF]">
                          {"{"}
                          <div className="pl-4">
                            <span className="text-[#E06C75]">"results"</span>
                            <span className="text-[#ABB2BF]">: </span>
                            <span className="text-[#61AFEF]">[</span>
                            <div className="pl-4">
                              <span className="text-[#ABB2BF]">{"{"}</span>
                              <div className="pl-2">
                                <span className="text-[#E06C75]">"id"</span>
                                <span className="text-[#ABB2BF]">: </span>
                                <span className="text-[#98C379]">
                                  "note_xyz123"
                                </span>
                                <span className="text-[#ABB2BF]">,</span>
                                <br />
                                <span className="text-[#E06C75]">
                                  "relevance"
                                </span>
                                <span className="text-[#ABB2BF]">: </span>
                                <span className="text-[#D19A66]">0.94</span>
                                <span className="text-[#ABB2BF]">,</span>
                                <br />
                                <span className="text-[#E06C75]">"title"</span>
                                <span className="text-[#ABB2BF]">: </span>
                                <span className="text-[#98C379]">
                                  "ML: Foundations..."
                                </span>
                              </div>
                              <span className="text-[#ABB2BF]"></span>
                            </div>
                            <span className="text-[#61AFEF]">]</span>
                          </div>
                          {"}"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Integration Options */}
                  <div className="bg-[#141414] border border-[#262626] rounded-2xl p-8">
                    <h3 className="text-lg font-bold text-[#F5F5F5] mb-6 flex items-center gap-2">
                      <Plug className="w-5 h-5 text-[#E5C07B]" />
                      Ecosystem Integrations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          name: "Mobile App",
                          desc: "React Native consuming /api/notes & /api/search",
                        },
                        {
                          name: "Chrome Extension",
                          desc: "Quick capture via POST /api/notes",
                        },
                        {
                          name: "Slack Bot",
                          desc: "Query knowledge via POST /api/search",
                        },
                        {
                          name: "VS Code Extension",
                          desc: "Search while coding with /api/search",
                        },
                        {
                          name: "Discord Bot",
                          desc: "Share via GET /api/notes",
                        },
                        {
                          name: "Webhook Triggers",
                          desc: "Auto-sync with external tools",
                        },
                      ].map((integration, i) => (
                        <div
                          key={i}
                          className="p-3 bg-[#0B0B0B] border border-[#262626] rounded-lg"
                        >
                          <h4 className="text-[#E5C07B] font-semibold text-sm">
                            {integration.name}
                          </h4>
                          <p className="text-xs text-[#A1A1AA] mt-1">
                            {integration.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-[#E5C07B]/5 border border-[#E5C07B]/20 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-[#E5C07B] mt-0.5" />
                    <div>
                      <h4 className="text-[#F5F5F5] font-semibold text-sm">
                        Why this matters?
                      </h4>
                      <p className="text-sm text-[#A1A1AA] mt-1">
                        Your knowledge isn't trapped in one app. The API-first
                        design means BrainHub can become the backbone of your
                        entire digital ecosystem—accessible everywhere you work.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
