"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  ChevronRight, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Zap, 
  ArrowLeft 
} from "lucide-react";
import Link from "next/link";

const Section = ({ title, icon: Icon, children }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="space-y-8 mb-32"
  >
    <div className="flex items-center gap-6">
      <div className="w-14 h-14 rounded-full bg-aptos-mint flex items-center justify-center border border-foreground/5 shadow-sm">
        <Icon size={24} className="text-foreground" />
      </div>
      <h2 className="text-4xl font-black tracking-tight italic">{title}</h2>
    </div>
    <div className="text-foreground/70 leading-relaxed space-y-6 text-xl max-w-4xl font-medium">
      {children}
    </div>
  </motion.div>
);

export default function Whitepaper() {
  return (
    <div className="min-h-screen bg-[#F2F1E9] text-[#111827]">
      {/* Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
        <Link href="/" className="pill-nav flex items-center gap-3 hover:opacity-80 transition-opacity w-fit shadow-sm">
          <ArrowLeft className="w-4 h-4 text-foreground" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Back to Terminal</span>
        </Link>
      </nav>

      {/* Hero Header */}
      <div className="pt-60 pb-32 px-8 border-b border-foreground/5">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="badge-mono">Architecture Specification v1.0</div>
          <h1 className="text-7xl md:text-[100px] font-black tracking-tighter leading-[0.85]">
            The <span className="italic font-light">Narrative</span> <br /> 
            Forge Protocol.
          </h1>
          <p className="text-2xl text-foreground/40 max-w-2xl font-medium italic">
            Defining the standard for autonomous agentic finance on ValueChain.
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-8 pt-32 pb-40">
        <Section title="Abstract" icon={BookOpen}>
          <p>
            NarrativeForge is a decentralized autonomous agent designed to solve the "Attention-to-Execution" gap in 
            modern crypto markets. By synthesizing real-time financial intelligence from SoSoValue with the massive 
            reasoning capabilities of Gemini 1.5, the protocol identifies emerging market narratives before they 
            reach critical mass. 
          </p>
          <p>
            These narratives are then transformed into actionable thematic index compositions and published 
            directly to the SSI Protocol on ValueChain, creating a seamless research-to-on-chain-execution stack.
          </p>
        </Section>

        <Section title="Intelligence Layer" icon={Database}>
          <p>
            The protocol leverages the **SoSoValue Open API** as its primary sensory organ. We utilize three core modules:
          </p>
          <ul className="list-disc list-inside space-y-4 text-foreground/80">
            <li><span className="text-foreground/60 font-mono text-sm uppercase tracking-widest">Module 01:</span> **Feeds (Hot News):** Real-time cluster analysis.</li>
            <li><span className="text-foreground/60 font-mono text-sm uppercase tracking-widest">Module 02:</span> **Sector Spotlight:** Relative volume and TVL delta monitoring.</li>
            <li><span className="text-foreground/60 font-mono text-sm uppercase tracking-widest">Module 03:</span> **Token Economics:** Supply and inflationary pressure validation.</li>
          </ul>
        </Section>

        <Section title="The Decision Engine" icon={Cpu}>
          <p>
            Raw data is processed by the **Narrative Agent**, an LLM-driven core powered by **Gemini 1.5 Flash**. 
            The agent performs thematic clustering and cross-reference analysis to verify alpha.
          </p>
          <div className="aptos-card-dark p-10 font-mono text-xs md:text-sm space-y-4 overflow-x-auto">
            <div className="text-aptos-mint whitespace-nowrap">// REASONING TRACE: SIGNAL_0x4F2</div>
            <div className="text-white/40 whitespace-nowrap">01. INGEST: News cluster "Institutional BTC Inflows" (Confidence: High)</div>
            <div className="text-white/40 whitespace-nowrap">02. VERIFY: RWA Sector TVL Growth (Delta: +12.4%)</div>
            <div className="text-white/40 whitespace-nowrap">03. CLUSTER: Identifying correlated tickers ($ONDO, $MKR, $RIO)</div>
            <div className="text-aptos-mint whitespace-nowrap">04. FORGE: Narrative "RWA Institutional Onramp" finalized.</div>
          </div>
        </Section>

        <Section title="Execution & Security" icon={ShieldCheck}>
          <p>
            The final output is an **SSI Index Composition**. This is published to the **ValueChain (SoDEX L1)** 
            using a secure blockchain client. By operating on ValueChain, NarrativeForge benefits from high-performance 
            on-chain orderbooks and transparent, agent-friendly infrastructure.
          </p>
        </Section>

        {/* Call to Action */}
        <div className="pt-20 border-t border-foreground/10 flex flex-col items-center">
          <Link href="/">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center justify-center gap-3 h-16 px-16 text-base"
            >
              FORGE YOUR EMPIRE NOW <ChevronRight size={18} />
            </motion.button>
          </Link>
        </div>
      </main>
    </div>
  );
}
