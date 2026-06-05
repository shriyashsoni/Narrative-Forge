"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useSpring, 
  useInView,
  useMotionValue
} from "framer-motion";
import { 
  ArrowRight, 
  Terminal as TerminalIcon, 
  TrendingUp, 
  Layers, 
  Shield, 
  Activity, 
  Zap, 
  BookOpen,
  ArrowUpRight,
  Globe,
  Cpu,
  BrainCircuit,
  Target,
  Lock,
  Wallet,
  Info,
  BarChart3
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart as RePieChart, 
  Pie, 
  Cell, 
  Tooltip as ChartTooltip 
} from 'recharts';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Link from "next/link";

// --- Sub-Components ---

const SoSoValueBadge = () => (
  <div className="flex items-center gap-2 bg-aptos-mint text-black px-4 py-2 rounded-full border border-foreground/10 shadow-lg scale-90 md:scale-100">
    <div className="w-6 h-6 bg-foreground rounded-md flex items-center justify-center font-black text-[10px] text-aptos-mint">S</div>
    <span className="text-[10px] font-mono font-black tracking-widest uppercase">Powered by SoSoValue Intelligence</span>
  </div>
);

const MouseGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 300);
      mouseY.set(e.clientY - 300);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <motion.div className="mint-glow-follow" style={{ x: mouseX, y: mouseY }} />;
};

const Particles = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-aptos-mint rounded-full opacity-20"
        initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
        animate={{ y: [null, Math.random() * -100 + "%"], opacity: [0, 0.3, 0] }}
        transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
      />
    ))}
  </div>
);

const Navbar = ({ setView }: { setView: any }) => (
  <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
    <nav className="pill-nav flex items-center justify-between shadow-2xl backdrop-blur-xl border-white/5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center shadow-lg">
          <Zap className="text-aptos-mint w-5 h-5 fill-current" />
        </div>
        <div className="flex flex-col -space-y-1">
          <span className="text-lg font-black tracking-tighter uppercase font-mono">Narrative Forge</span>
          <span className="text-[8px] font-mono font-bold text-foreground/40 uppercase tracking-[0.2em]">Autonomous Protocol</span>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-10 text-[10px] font-mono uppercase tracking-widest font-black">
        <button onClick={() => setView("landing")} className="hover:text-aptos-mint-dark transition-all hover:scale-105">Home</button>
        <button onClick={() => setView("dashboard")} className="hover:text-aptos-mint-dark transition-all hover:scale-105">Forge Hub</button>
        <Link href="/whitepaper" className="hover:text-aptos-mint-dark transition-all hover:scale-105">Docs</Link>
      </div>
      <div className="flex items-center gap-4 relative z-50">
        <div className="hidden sm:block"><SoSoValueBadge /></div>
        <ConnectButton accountStatus="avatar" chainStatus="icon" showBalance={false} />
      </div>
    </nav>
  </header>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="badge-mono mb-6 inline-block bg-foreground/5 border-foreground/10">{children}</div>
);

const TerminalDisplay = ({ logs }: { logs: any[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [logs]);

  return (
    <div className="aptos-card-dark h-[550px] flex flex-col font-mono text-[10px] shadow-2xl relative overflow-hidden group border-white/5">
      <div className="scanning-beam" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-aptos-mint to-transparent opacity-30" />
      <div className="flex items-center justify-between mb-8 text-white/40 border-b border-white/5 pb-4 px-2">
        <div className="flex items-center gap-2">
           <TerminalIcon size={14} className="text-aptos-mint" /> <span>INTEL_EXTRACTION_LOG v4.2</span>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-[8px] opacity-50">SYNC: LIVE</div>
           <div className="flex gap-1.5">
             <div className="w-2 h-2 rounded-full bg-red-500/30" />
             <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
             <div className="w-2 h-2 rounded-full bg-green-500/30" />
           </div>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 scrollbar-hide opacity-80 px-2">
        {logs.map((log, i) => (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={i} className="flex gap-4 border-l-2 border-white/5 pl-4 py-1.5 hover:bg-white/5 transition-colors group/log">
            <span className="text-aptos-mint/40 shrink-0 tabular-nums font-bold">[{log.time}]</span>
            <span className={log.type === 'success' ? 'text-aptos-mint font-black' : log.type === 'warning' ? 'text-yellow-400' : 'text-white/70 font-medium'}>
               {log.msg.toUpperCase()}
            </span>
          </motion.div>
        ))}
        <div className="animate-pulse text-aptos-mint text-base">█</div>
      </div>
    </div>
  );
};

const NarrativeCard = ({ narrative, onForge, onTrade }: any) => {
  const [localForging, setLocalForging] = useState(false);
  const [trading, setTrading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAction = async () => {
    setLocalForging(true);
    const res = await onForge(narrative);
    if(res) setResult(res);
    setLocalForging(false);
  };

  const handleTradeAction = async () => {
    setTrading(true);
    await onTrade(narrative);
    setTrading(false);
  };

  const pieData = narrative.tokens?.map((t: string) => ({ name: t, value: 25 }));
  const colors = ['#D9F3E5', '#111827', '#374151', '#4B5563'];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="aptos-card hover:border-foreground/20 group relative overflow-hidden bg-white/80 backdrop-blur-2xl">
      <div className="scanning-beam opacity-5" />
      
      <div className="flex justify-between items-start mb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <SectionLabel>MARKET_SIGNAL_ALPHA</SectionLabel>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
          </div>
          <h3 className="text-6xl font-black mb-2 tracking-tighter italic uppercase leading-none">{narrative.theme}</h3>
        </div>
        <div className="h-20 w-40 bg-foreground/5 rounded-2xl p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={narrative.chartData || [{val:10}, {val:30}, {val:20}, {val:50}, {val:40}]}>
              <Area type="monotone" dataKey="val" stroke="#111827" fill="#D9F3E5" fillOpacity={0.4} strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-12 mb-10">
        <div className="space-y-6">
           <div className="p-8 bg-foreground/5 rounded-[2.5rem] border border-foreground/5 italic text-foreground/80 text-lg leading-relaxed font-medium">
            "{narrative.summary}"
          </div>
          <div className="flex items-center gap-8 font-mono text-[11px] font-black text-foreground/50 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2.5"><Activity size={16} className="text-aptos-mint-dark" /> Momentum: {narrative.momentum}%</div>
            <div className="flex items-center gap-2.5"><Target size={16} className="text-aptos-mint-dark" /> Yield: High</div>
          </div>
        </div>

        <div className="h-52 flex items-center justify-center relative bg-foreground/[0.02] rounded-[3rem] border border-foreground/5">
          <RePieChart width={180} height={180}>
            <Pie data={pieData} innerRadius={50} outerRadius={75} paddingAngle={8} dataKey="value" stroke="none">
              {pieData?.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <ChartTooltip />
          </RePieChart>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="font-mono text-[8px] font-black opacity-30 tracking-[0.3em]">ALLOCATION</span>
            <span className="font-black text-xs text-foreground/50">SSI_V1</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="p-8 bg-aptos-mint/10 border border-aptos-mint/30 rounded-[2.5rem] space-y-4 group-hover:bg-aptos-mint/20 transition-colors">
          <div className="flex items-center gap-2.5 text-aptos-mint-dark font-black text-[11px] uppercase tracking-widest">
            <BrainCircuit size={18} /> AI Sentiment Verdict
          </div>
          <p className="text-base font-bold leading-tight text-foreground/80">{narrative.verdict || "Strong narrative alignment detected across news clusters."}</p>
        </div>
        <div className="p-8 bg-foreground/5 border border-foreground/10 rounded-[2.5rem] space-y-4 group-hover:bg-foreground/10 transition-colors">
          <div className="flex items-center gap-2.5 text-foreground/40 font-black text-[11px] uppercase tracking-widest">
            <Zap size={18} /> On-Chain Strategy
          </div>
          <p className="text-base font-bold leading-tight text-foreground/80">{narrative.suggestion || "Deploy capital into relative strength tokens."}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        {narrative.tokens?.map((token: string) => (
          <span key={token} className="px-6 py-3 bg-foreground text-white rounded-full text-[13px] font-mono font-black tracking-widest hover:bg-aptos-mint hover:text-foreground transition-all cursor-pointer shadow-lg hover:shadow-aptos-mint/20">
            ${token}
          </span>
        ))}
      </div>

      {result ? (
        <div className="p-8 bg-green-500/10 border border-green-500/30 rounded-[2.5rem] space-y-6">
          <div className="flex items-center gap-2 text-green-400 font-black text-xl uppercase tracking-widest">
             <Zap size={24} className="fill-current" /> SSI Index Forged
          </div>
          <p className="text-white/70 font-mono text-sm break-all">
            TX: <a href={result.explorer_url} target="_blank" rel="noreferrer" className="text-aptos-mint hover:underline">{result.tx_hash}</a>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
             <a href={result.explorer_url} target="_blank" rel="noreferrer" className="btn-primary flex-1 flex items-center justify-center gap-2 h-16 text-sm rounded-2xl shadow-lg">View on Explorer <ArrowUpRight size={16} /></a>
             <button onClick={handleTradeAction} disabled={trading} className="bg-foreground text-white border border-white/10 hover:bg-white/10 flex-1 flex items-center justify-center gap-2 h-16 text-sm rounded-2xl transition-all shadow-lg font-black uppercase tracking-widest">
               {trading ? "EXECUTING..." : "Trade on SoDEX"} {trading ? <Activity size={16} className="animate-spin" /> : <Activity size={16} />}
             </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={handleAction}
          disabled={localForging}
          className="btn-primary w-full flex items-center justify-center gap-4 h-24 text-xl group-hover:scale-[1.01] transition-all shadow-2xl shadow-aptos-mint/30 rounded-[3rem] relative z-50 cursor-pointer"
        >
          {localForging ? <Activity size={24} className="animate-spin" /> : <Zap size={24} className="fill-current" />}
          {localForging ? "PUBLISHING TO SSI..." : "FORGE ON VALUECHAIN"}
        </button>
      )}
    </motion.div>
  );
};

// ... (Other components like Marquee, ScrollReveal, FeatureCard remain same)

const FeatureCard = ({ icon: Icon, title, desc, dark = false }: any) => (
  <motion.div whileHover={{ y: -15, scale: 1.02 }} className={dark ? "aptos-card-dark relative overflow-hidden group p-12 border-white/5" : "aptos-card hover:shadow-[0_40px_80px_rgba(217,243,229,0.5)] p-12 bg-white/60 backdrop-blur-xl"}>
    {dark && <div className="scanning-beam opacity-10" />}
    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-10 border ${dark ? 'border-white/10 bg-white/5 text-aptos-mint' : 'border-foreground/5 bg-aptos-mint text-foreground'}`}>
      <Icon size={28} />
    </div>
    <h3 className="text-5xl mb-6 leading-tight italic font-black tracking-tighter">{title}</h3>
    <p className={`text-xl leading-relaxed font-medium ${dark ? 'text-white/60' : 'text-foreground/60'}`}>{desc}</p>
    <div className="mt-12 flex items-center gap-2.5 font-mono text-[11px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">
      Read More <ArrowUpRight size={16} />
    </div>
  </motion.div>
);

const Marquee = ({ items, reverse = false }: { items: string[], reverse?: boolean }) => (
  <div className="flex overflow-hidden select-none gap-10 py-16 border-y border-foreground/5 bg-foreground/[0.01] w-screen relative left-1/2 -translate-x-1/2">
    <motion.div initial={{ x: reverse ? "-100%" : "0" }} animate={{ x: reverse ? "0" : "-100%" }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="flex flex-none gap-10 items-center min-w-full">
      {[...items, ...items, ...items, ...items].map((item, i) => (
        <div key={i} className="flex items-center gap-10 text-6xl md:text-[100px] font-black italic opacity-5 hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-tighter">
          <Zap className="text-aptos-mint fill-aptos-mint w-14 h-14" />
          {item}
        </div>
      ))}
    </motion.div>
  </div>
);

const ScrollReveal = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 100, filter: "blur(15px)" }} animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
};

// --- Main Page ---

export default function NarrativeForge() {
  const [view, setView] = useState<"landing" | "dashboard">("landing");
  const [logs, setLogs] = useState<any[]>([]);
  const [narratives, setNarratives] = useState<any[]>([]);
  const [isForging, setIsForging] = useState(false);
  const { isConnected } = useAccount();
  
  // Dynamic API configuration
  const API_URL = "/api";
  const WS_URL = ""; // WS URL will be constructed dynamically based on window.location

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -250]);
  const smoothHeroY = useSpring(heroY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    // Construct WebSocket URL dynamically based on current host
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.host;
    const ws = new WebSocket(`${protocol}//${host}/api/ws/logs`);
    ws.onmessage = (event) => {
      const log = JSON.parse(event.data);
      setLogs((prev) => [...prev, log].slice(-50));
    };
    return () => ws.close();
  }, []);

  useEffect(() => {
    const fetchNarratives = async () => {
      try {
        const res = await fetch(`${API_URL}/narratives`);
        const data = await res.json();
        setNarratives(data);
      } catch (err) { console.error(err); }
    };
    fetchNarratives();
    const interval = setInterval(fetchNarratives, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleForge = async (narrative: any) => {
    if (!isConnected) return alert("Connect Wallet");
    try {
      const response = await fetch(`${API_URL}/forge/${narrative.theme.replace(/\s+/g, '-')}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ composition: narrative.tokens.map((t: any) => ({ symbol: t, weight: 25 })) })
      });
      return await response.json();
    } catch (err) { 
      console.error(err); 
      return null;
    }
  };

  const handleSodexTrade = async (narrative: any) => {
    if (!isConnected) return alert("Connect Wallet");
    try {
      // Execute a trade for the primary token in the narrative index
      const primaryToken = narrative.tokens[0];
      const response = await fetch(`${API_URL}/sodex/trade`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: primaryToken, quantity: "0.1" })
      });
      const data = await response.json();
      if(data.status === "success" || data.trade_executed) {
          alert(`Success: Trade executed for ${primaryToken} on SoDEX!`);
      } else {
          alert(`Notice: ${data.msg || "Trade logged via API. Check terminal for details."}`);
      }
    } catch (err) { 
      console.error(err); 
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F1E9] selection:bg-aptos-mint selection:text-foreground">
      <div className="noise-overlay" />
      <MouseGlow />
      <Particles />

      <Navbar setView={setView} />

      <main className="relative z-10 max-w-7xl mx-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          {view === "landing" ? (
            <motion.section key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-60 pb-60">
              {/* Hero Section */}
              <motion.div style={{ scale: heroScale, opacity: heroOpacity, y: smoothHeroY }} className="pt-72 px-6 md:px-12 grid lg:grid-cols-2 gap-40 items-center">
                <div className="space-y-20">
                  <ScrollReveal>
                    <div className="space-y-6">
                      <SoSoValueBadge />
                      <h1 className="text-8xl md:text-[180px] leading-[0.7] font-black tracking-tighter motion-blur-in">
                        FORGE <br />
                        <span className="italic font-light opacity-50">EMPIRE.</span>
                      </h1>
                    </div>
                  </ScrollReveal>
                  <p className="text-3xl md:text-4xl text-foreground/40 leading-relaxed max-w-3xl font-medium italic tracking-tight">
                    Autonomous standard for agentic finance. 
                    Extraction, Synthesis, Execution.
                  </p>
                  <div className="flex flex-col md:flex-row gap-10 pt-8 relative z-50">
                    <button 
                      onClick={() => {
                        console.log("Navigating to Dashboard...");
                        setView("dashboard");
                      }} 
                      className="btn-primary flex items-center justify-center gap-6 h-28 px-24 text-2xl shadow-[0_40px_100px_rgba(217,243,229,0.7)] rounded-[3rem] cursor-pointer"
                    >
                      ENTER THE HUB <ArrowRight size={32} />
                    </button>
                    <Link href="/whitepaper" className="pill-nav flex items-center justify-center gap-6 h-28 px-16 text-[14px] font-mono font-black uppercase tracking-[0.4em] border-foreground/10 hover:bg-foreground hover:text-white transition-all rounded-[3rem]">Whitepaper</Link>
                  </div>
                </div>
                <div className="relative group perspective-2000">
                  <motion.div whileHover={{ rotateY: -25, rotateX: 15, scale: 1.08 }} className="relative z-10 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <TerminalDisplay logs={logs} />
                  </motion.div>
                  <div className="absolute -inset-60 bg-aptos-mint rounded-full blur-[250px] opacity-10 animate-pulse pointer-events-none" />
                </div>
              </motion.div>

              <div className="space-y-12">
                <Marquee items={["SoSoValue Intelligence", "ValueChain Network", "Gemini 1.5 Reasoner", "SSI Protocol", "Narrative Alpha", "Agentic Forge"]} />
                <Marquee reverse items={["One-Person Empire", "Autonomous Solver", "High Throughput", "Permissionless", "Real-time Intel", "Solvency Standard"]} />
              </div>

              <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-16">
                <ScrollReveal><FeatureCard icon={TrendingUp} title="Intelligence" desc="Synthesizing SoSoValue real-time news clusters and sector data into actionable alpha signals." /></ScrollReveal>
                <ScrollReveal><FeatureCard icon={Layers} dark={true} title="SSI Solver" desc="Transparent index compositions published directly to ValueChain for decentralized, verifiable execution." /></ScrollReveal>
                <ScrollReveal><FeatureCard icon={Shield} title="L1 Network" desc="Built on ValueChain to leverage high-performance orderbooks and agent-friendly on-chain infra." /></ScrollReveal>
              </div>

              <ScrollReveal>
                <div className="px-6 md:px-12">
                  <div className="aptos-card-dark relative overflow-hidden group p-20 md:p-40 rounded-[5rem] border-white/5">
                    <div className="scanning-beam opacity-30" />
                    <motion.div animate={{ scale: [1, 1.8, 1], rotate: [0, 360, 0] }} transition={{ duration: 30, repeat: Infinity }} className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-aptos-mint/10 rounded-full blur-[250px] pointer-events-none" />
                    <div className="grid lg:grid-cols-2 gap-40 relative z-10">
                      <div className="space-y-16">
                        <SectionLabel>ARCHITECTURE_PROTOCOL_V1</SectionLabel>
                        <h2 className="text-8xl md:text-[150px] leading-[0.7] italic font-light tracking-tighter">The <br /><span className="font-black not-italic text-white">Logic.</span></h2>
                        <p className="text-white/30 text-4xl leading-relaxed max-w-2xl font-medium tracking-tight">Synthesizing world-class intelligence with L1 execution power.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-10">
                        {[{ icon: Globe, label: "Sourcing", val: "SoSoValue" }, { icon: Cpu, label: "Analysis", val: "Gemini 1.5" }, { icon: Zap, label: "Execution", val: "SSI Protocol" }, { icon: Layers, label: "Network", val: "ValueChain" }].map((stat, i) => (
                          <motion.div key={i} whileHover={{ y: -25, backgroundColor: "rgba(255,255,255,0.12)", borderColor: "rgba(217,243,229,0.4)" }} className="p-14 border border-white/5 rounded-[5rem] space-y-10 transition-all duration-700">
                            <stat.icon className="text-aptos-mint w-16 h-16" />
                            <div className="text-white/20 uppercase font-mono text-[16px] tracking-[0.4em] font-black">{stat.label}</div>
                            <div className="text-white text-3xl font-black italic">{stat.val}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <section className="py-80 text-center space-y-32 bg-[#000000] text-white w-screen relative left-1/2 -translate-x-1/2 overflow-hidden border-t border-white/5">
                <div className="scanning-beam opacity-20" />
                <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 20, repeat: Infinity }} className="absolute inset-0 bg-aptos-mint/5 blur-[200px]" />
                <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }} className="space-y-16 relative z-50">
                  <h2 className="text-9xl md:text-[280px] font-black tracking-tighter leading-none italic uppercase opacity-90">Forge <br /> Now.</h2>
                  <div className="flex justify-center pt-24">
                    <button 
                      onClick={() => {
                        console.log("Navigating to Dashboard from CTA...");
                        setView("dashboard");
                      }} 
                      className="h-40 px-40 bg-white text-black rounded-full font-black text-5xl hover:bg-aptos-mint transition-all hover:scale-110 shadow-[0_0_200px_rgba(255,255,255,0.3)] cursor-pointer"
                    >
                      ENTER HUB
                    </button>
                  </div>
                </motion.div>
              </section>
            </motion.section>
          ) : (
            <motion.section key="dashboard" initial={{ opacity: 0, filter: "blur(30px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0 }} className="space-y-32 pt-72 pb-40 px-6 md:px-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
                <div className="space-y-6">
                  <SoSoValueBadge />
                  <h2 className="text-9xl md:text-[140px] font-black italic tracking-tighter uppercase leading-none">Forge Hub.</h2>
                </div>
                <div className="flex flex-wrap items-center gap-10 font-mono text-[14px] font-black tracking-widest bg-foreground/5 p-8 rounded-[3rem] border border-foreground/10 shadow-xl backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-green-500 animate-ping shadow-[0_0_20px_rgba(34,197,94,0.5)]" />
                    NETWORK: VALUECHAIN_TESTNET
                  </div>
                  <div className="flex items-center gap-4 border-l border-foreground/10 pl-10">
                    <Activity size={20} className="text-foreground/40" />
                    AGENT_STATUS: ACTIVE
                  </div>
                  <div className="flex items-center gap-4 border-l border-foreground/10 pl-10 text-aptos-mint-dark">
                    <BarChart3 size={20} /> SYNC: STABLE
                  </div>
                </div>
              </div>

              {!isConnected ? (
                <div className="aptos-card-dark flex flex-col items-center justify-center p-60 text-center space-y-16 bg-black border-white/5 relative overflow-hidden rounded-[5rem] shadow-3xl">
                  <div className="scanning-beam opacity-20" />
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="w-48 h-48 border-8 border-dashed border-aptos-mint/10 rounded-full flex items-center justify-center">
                    <Lock size={72} className="text-aptos-mint opacity-50" />
                  </motion.div>
                  <div className="space-y-8">
                    <h3 className="text-8xl font-black italic tracking-tighter uppercase text-white leading-none">Access Gated.</h3>
                    <p className="text-white/30 text-3xl font-medium max-w-2xl leading-relaxed italic">Connect your ValueChain wallet to authorize the Narrative Forge Agent.</p>
                  </div>
                  <div className="scale-150">
                    <ConnectButton />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                  <div className="lg:col-span-2 space-y-20">
                    <div className="grid grid-cols-1 gap-12">
                      {narratives.map((narrative, i) => (
                        <NarrativeCard key={i} narrative={narrative} onForge={handleForge} onTrade={handleSodexTrade} />
                      ))}
                      {narratives.length === 0 && (
                        <div className="col-span-2 aptos-card flex flex-col items-center justify-center p-40 text-center space-y-12 bg-white/50 backdrop-blur-3xl border-dashed border-4 border-foreground/5 rounded-[5rem]">
                          <Activity className="w-20 h-20 animate-spin text-aptos-mint-dark opacity-30" />
                          <div className="space-y-6">
                            <h3 className="text-6xl font-black italic tracking-tighter uppercase opacity-30">Analyzing Intelligence...</h3>
                            <p className="text-foreground/30 max-w-lg font-bold text-2xl leading-relaxed italic">Parsing SoSoValue news clusters via Gemini 1.5. Forge Hub activation in progress.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="lg:col-span-1">
                    <div className="sticky top-40 space-y-12">
                      <TerminalDisplay logs={logs} />
                      <div className="aptos-card bg-aptos-mint/20 border-aptos-mint-dark/30 p-16 relative overflow-hidden group rounded-[4rem] shadow-2xl backdrop-blur-3xl">
                        <div className="scanning-beam opacity-10" />
                        <div className="flex items-center gap-4 mb-10">
                          <BrainCircuit className="text-aptos-mint-dark w-10 h-10" />
                          <h4 className="font-mono text-[16px] font-black uppercase tracking-[0.3em] opacity-40">Agent Integrity</h4>
                        </div>
                        <div className="space-y-10">
                          <div className="flex justify-between items-end">
                            <div className="flex flex-col">
                              <span className="text-foreground/40 font-black uppercase text-[10px] tracking-widest mb-1">Reputation</span>
                              <span className="font-black text-6xl italic leading-none">98.4%</span>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-aptos-mint flex items-center justify-center shadow-lg">
                              <Zap size={24} className="text-foreground fill-current" />
                            </div>
                          </div>
                          <div className="w-full h-4 bg-foreground/5 rounded-full overflow-hidden p-1.5 border border-foreground/10">
                            <motion.div initial={{ width: 0 }} animate={{ width: "98.4%" }} transition={{ duration: 4, delay: 0.5, ease: "easeOut" }} className="h-full bg-foreground rounded-full shadow-[0_0_30px_rgba(0,0,0,0.3)]" />
                          </div>
                          <div className="p-6 bg-white/20 rounded-3xl border border-white/20 flex items-center gap-4">
                            <Info size={18} className="text-foreground/40 shrink-0" />
                            <p className="text-[10px] font-mono font-bold leading-tight uppercase opacity-50 tracking-tighter">Verified Agentic Solver for SSI Protocol v1.0</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-40 px-16 border-t border-foreground/5 mt-60 bg-white/40 backdrop-blur-2xl relative overflow-hidden">
        <div className="scanning-beam opacity-5" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-20 relative z-10">
          <div className="flex items-center gap-8">
            <div className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center shadow-2xl transition-transform hover:scale-110"><Zap className="text-aptos-mint w-8 h-8 fill-current" /></div>
            <div className="flex flex-col">
              <span className="font-black uppercase tracking-tighter text-2xl font-mono">Narrative Forge Protocol</span>
              <span className="text-[10px] font-mono font-bold text-foreground/30 uppercase tracking-[0.2em]">Autonomous On-Chain Finance</span>
            </div>
          </div>
          <div className="flex gap-24 font-mono text-[16px] font-black tracking-[0.4em] text-foreground/40">
            <a href="#" className="hover:text-foreground hover:scale-125 transition-all">X</a>
            <a href="#" className="hover:text-foreground hover:scale-125 transition-all">Docs</a>
            <a href="#" className="hover:text-foreground hover:scale-125 transition-all">Git</a>
          </div>
          <p className="text-[16px] font-mono text-foreground/20 font-black">© 2026 FORGE AGENTIC. BUILT FOR WAVE HACKS.</p>
        </div>
      </footer>
    </div>
  );
}
