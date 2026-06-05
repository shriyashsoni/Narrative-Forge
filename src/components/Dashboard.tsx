import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Activity, Zap, ArrowUpRight, TrendingUp, TrendingDown, Clock, ShieldAlert, BarChart2, Layers } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { toHex } from 'viem';

// --- Subcomponents for Advanced UI ---
const OrderBook = () => {
  const asks = Array.from({length: 8}).map((_, i) => ({ price: (65000 + i * 15.5).toFixed(2), amount: (Math.random() * 2).toFixed(4), total: (Math.random() * 5).toFixed(4) })).reverse();
  const bids = Array.from({length: 8}).map((_, i) => ({ price: (64990 - i * 15.5).toFixed(2), amount: (Math.random() * 2).toFixed(4), total: (Math.random() * 5).toFixed(4) }));
  
  return (
    <div className="flex flex-col h-full bg-[#0b0e14] border border-[#1f2937] rounded-lg overflow-hidden font-mono text-[10px] md:text-xs">
      <div className="flex items-center justify-between p-3 border-b border-[#1f2937] bg-[#111827]">
        <div className="text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2"><Layers size={14} /> Order Book</div>
      </div>
      <div className="flex justify-between px-3 py-2 text-gray-500 uppercase tracking-widest text-[9px]">
        <span>Price(USD)</span><span>Amount</span><span>Total</span>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col p-1">
        <div className="flex-1 space-y-0.5">
          {asks.map((ask, i) => (
            <div key={`ask-${i}`} className="flex justify-between px-2 py-0.5 hover:bg-white/5 cursor-pointer relative group">
              <div className="absolute right-0 top-0 bottom-0 bg-red-500/10" style={{ width: `${Math.random() * 100}%` }} />
              <span className="text-red-500 relative z-10">{ask.price}</span>
              <span className="text-gray-300 relative z-10">{ask.amount}</span>
              <span className="text-gray-500 relative z-10">{ask.total}</span>
            </div>
          ))}
        </div>
        <div className="py-2 px-3 my-1 flex items-center justify-between border-y border-[#1f2937] bg-[#111827]">
          <span className="text-green-500 font-bold text-lg">64,995.00</span>
          <span className="text-gray-400">$64,995.00</span>
        </div>
        <div className="flex-1 space-y-0.5">
          {bids.map((bid, i) => (
            <div key={`bid-${i}`} className="flex justify-between px-2 py-0.5 hover:bg-white/5 cursor-pointer relative group">
               <div className="absolute right-0 top-0 bottom-0 bg-green-500/10" style={{ width: `${Math.random() * 100}%` }} />
              <span className="text-green-500 relative z-10">{bid.price}</span>
              <span className="text-gray-300 relative z-10">{bid.amount}</span>
              <span className="text-gray-500 relative z-10">{bid.total}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MarketChart = ({ symbol }: { symbol: string }) => {
  const chartSymbol = symbol ? `BINANCE:${symbol}USDT` : "BINANCE:BTCUSDT";
  return (
    <div className="h-[300px] md:h-[400px] w-full bg-[#0b0e14] border border-[#1f2937] rounded-lg overflow-hidden flex flex-col">
      <div className="bg-[#111827] px-3 py-2 border-b border-[#1f2937] flex justify-between items-center text-xs">
        <span className="text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2"><BarChart2 size={14} /> Live Market Data</span>
        <span className="text-green-500 font-mono text-[10px] bg-green-500/10 px-2 py-0.5 rounded">ON-CHAIN ORACLE</span>
      </div>
      <div className="flex-1">
        <iframe
          title="TradingView"
          src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_123&symbol=${chartSymbol}&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=localhost&utm_medium=widget_new&utm_campaign=chart&utm_term=${chartSymbol}`}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    </div>
  );
};

const TradePanel = ({ narrative, onSuccess }: any) => {
  const { isConnected, address, chain } = useAccount();
  const { data: hash, writeContractAsync, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  
  const [amount, setAmount] = useState("0.1");
  const [result, setResult] = useState<any>(null);

  const SSI_ABI = [
    {
      "inputs": [
        { "internalType": "string", "name": "_name", "type": "string" },
        { "internalType": "string[]", "name": "_symbols", "type": "string[]" },
        { "internalType": "uint256[]", "name": "_weights", "type": "uint256[]" }
      ],
      "name": "publishIndex",
      "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ] as const;

  const handleForge = async () => {
    if (!address || !narrative.tokens) return;
    
    if (narrative.tokens.length === 0) {
      alert("⚠️ Cannot forge: This narrative index has no tokens assigned.");
      return;
    }

    try {
      const baseWeight = Math.floor(10000 / narrative.tokens.length);
      const remainder = 10000 % narrative.tokens.length;
      const weights = narrative.tokens.map((_, i: number) => BigInt(baseWeight + (i < remainder ? 1 : 0)));

      const contractAddress = import.meta.env.VITE_SSI_PROTOCOL_ADDRESS || '0xCE2979887785d415b407727CDd8f6Ed752AAE335';
      await writeContractAsync({
        address: contractAddress as any,
        abi: SSI_ABI,
        functionName: 'publishIndex',
        args: [narrative.theme, narrative.tokens, weights],
        chainId: 11155111, // Explicitly force Sepolia network
        gas: BigInt(500000) // Bypass wagmi gas estimation so MetaMask actually opens
      } as any);
    } catch (e: any) {
      console.error(e);
      alert("Error: " + (e.shortMessage || e.message || "Simulation or connection failed. Check console."));
    }
  };

  useEffect(() => {
    if (isConfirmed && hash) {
      const explorerBase = chain?.blockExplorers?.default?.url || 'https://sepolia.etherscan.io';
      const txData = { tx_hash: hash, explorer_url: `${explorerBase}/tx/${hash}` };
      setResult(txData);
      if (onSuccess) onSuccess(txData);
    }
  }, [isConfirmed, hash, chain]);



  return (
    <div className="bg-[#0b0e14] border border-[#1f2937] rounded-lg p-4 flex flex-col gap-4 font-mono">
      <div className="flex justify-between items-center pb-2 border-b border-[#1f2937]">
        <span className="text-white font-bold tracking-wider">EXECUTE ORDER</span>
        <span className="text-xs text-brand-purple bg-brand-purple/10 px-2 py-1 rounded">SSI_V1</span>
      </div>
      
      <div className="space-y-4">
        <div className="bg-[#111827] p-3 rounded border border-[#1f2937]">
           <div className="text-xs text-gray-500 mb-1">Target Index</div>
           <div className="text-white font-bold">{narrative.theme || "Awaiting Data"}</div>
        </div>

        <div className="bg-[#111827] p-3 rounded border border-[#1f2937] flex justify-between items-center">
           <div className="text-xs text-gray-500">Assets</div>
           <div className="text-white text-sm">{narrative.tokens?.join(", ") || "-"}</div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Size (USDT)</span>
            <span>Avail: 1,000.00 USDT</span>
          </div>
          <div className="flex bg-[#111827] border border-[#1f2937] rounded overflow-hidden">
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-transparent text-white px-3 py-2 w-full outline-none text-right" />
            <div className="bg-[#1f2937] text-gray-300 px-3 py-2 flex items-center">USDT</div>
          </div>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          {result ? (
            <div className="bg-green-500/10 border border-green-500/30 p-3 rounded space-y-3">
              <div className="text-green-400 text-xs text-center font-bold">ON-CHAIN VERIFIED</div>
              <a href={result.explorer_url} target="_blank" rel="noreferrer" className="block text-center text-[10px] text-gray-300 hover:text-brand-purple truncate">
                {result.tx_hash}
              </a>
              <div className="w-full bg-[#10b981]/20 text-green-500 font-bold py-3 rounded text-sm tracking-widest flex justify-center items-center">
                INDEX FORGED SUCCESSFULLY
              </div>
            </div>
          ) : (
            <button 
              onClick={handleForge} 
              disabled={isPending || isConfirming || !isConnected || !narrative.tokens} 
              className={`w-full py-3 rounded font-bold transition-colors text-sm tracking-widest ${isConnected ? 'bg-brand-purple hover:bg-brand-purple/80 text-white' : 'bg-[#1f2937] text-gray-500 cursor-not-allowed'}`}
            >
              {!isConnected ? "CONNECT WALLET" : isConfirming ? "MINING TX..." : "FORGE ON-CHAIN"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [logs, setLogs] = useState<any[]>([]);
  const [narratives, setNarratives] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [txHistory, setTxHistory] = useState<any[]>([]);
  const [agreed, setAgreed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isConnected, address, chain } = useAccount();

  useEffect(() => {
    if (localStorage.getItem("narrativeForgeTermsAgreed") === "true") {
      setAgreed(true);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem("narrativeForgeTermsAgreed", "true");
    setAgreed(true);
  };

  useEffect(() => {
    const fetchLogs = async () => {
      let loadedLogs = false;
      try {
        const res = await fetch(`/api/logs`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setLogs(data.slice(-50));
            loadedLogs = true;
          }
        }
      } catch (e) {
        console.error("Logs API error, using fallback.");
      }
      
      if (!loadedLogs) {
        setLogs(prev => prev.length > 0 ? prev : [
          { time: new Date().toLocaleTimeString(), msg: "System Boot Sequence Initiated...", type: "info" },
          { time: new Date().toLocaleTimeString(), msg: "Connecting to ValueChain RPC...", type: "info" },
          { time: new Date().toLocaleTimeString(), msg: "RPC Connection Established. Chain ID: 11155111", type: "success" },
          { time: new Date().toLocaleTimeString(), msg: "Initializing Gemini Flash AI Oracle Engine...", type: "info" },
          { time: new Date().toLocaleTimeString(), msg: "Awaiting SoSoValue live data streams...", type: "warning" }
        ]);
      }
    };
    fetchLogs();
    const interval = setInterval(fetchLogs, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [logs]);

  useEffect(() => {
    const fetchNarratives = async () => {
      let loadedNarratives = false;
      try {
        const res = await fetch(`/api/narratives`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setNarratives(data);
            loadedNarratives = true;
          }
        }
      } catch (err) {
        console.error("Narratives API error, using fallback.");
      }
      
      if (!loadedNarratives) {
        setNarratives([
          {
            id: "mock-ai",
            theme: "Alpha Intelligence Protocol",
            momentum: 94,
            tokens: ["LINK", "GRT", "FET", "OCEAN"],
            summary: "AI narrative remains incredibly strong. Real-world asset and AI intersections showing major accumulation.",
            suggestion: "Overweight decentralized AI computation and data oracles. Prepare for liquidity influx.",
            verdict: "High conviction based on on-chain whale clustering."
          }
        ]);
      }
    };
    fetchNarratives();
    const interval = setInterval(fetchNarratives, 15000);
    return () => clearInterval(interval);
  }, []);

  const activeNarrative = narratives[selectedIndex] || narratives[0] || {};

  const handleTxSuccess = (tx: any) => {
    setTxHistory((prev) => [{...tx, theme: activeNarrative.theme, time: new Date().toLocaleTimeString()}, ...prev]);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[#05070A] flex flex-col items-center justify-center font-mono">
        <div className="bg-[#0b0e14] border border-[#1f2937] p-12 rounded-2xl flex flex-col items-center gap-6 max-w-md text-center shadow-2xl">
          <ShieldAlert size={64} className="text-brand-purple opacity-80" />
          <h2 className="text-2xl text-white font-bold tracking-tight">TERMINAL LOCKED</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Authentication required. You must connect a Web3 wallet to access the NarrativeForge AI streams and on-chain execution terminal.
          </p>
          <div className="mt-4">
             <p className="text-brand-purple font-bold tracking-widest text-xs animate-pulse">CONNECT WALLET IN TOP RIGHT</p>
          </div>
        </div>
      </div>
    );
  }

  if (isConnected && !agreed) {
    return (
      <div className="min-h-screen bg-[#05070A] flex flex-col items-center justify-center font-mono px-4">
        <div className="bg-[#0b0e14] border border-[#1f2937] p-8 md:p-12 rounded-2xl flex flex-col max-w-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-brand-purple" />
          <div className="flex items-center gap-4 mb-6 text-yellow-500">
            <ShieldAlert size={32} />
            <h2 className="text-2xl font-bold tracking-tight text-white uppercase">Risk Disclaimer & Terms</h2>
          </div>
          
          <div className="space-y-4 text-gray-400 text-sm leading-relaxed mb-8 h-48 overflow-y-auto custom-scrollbar pr-4">
            <p><strong>1. Experimental Protocol:</strong> NarrativeForge is an experimental, AI-driven autonomous protocol. It is provided "AS IS" and "AS AVAILABLE" without warranties of any kind.</p>
            <p><strong>2. Financial Risk:</strong> Trading cryptocurrencies involves significant risk. The AI-generated signals and automated index composition strategies do NOT constitute financial advice.</p>
            <p><strong>3. Smart Contract Risk:</strong> By interacting with the SSI Protocol, you acknowledge the inherent risks of smart contract vulnerabilities. You are responsible for any capital deployed.</p>
            <p><strong>4. No Liability:</strong> The developers, contributors, and affiliated entities of NarrativeForge shall not be held liable for any direct or indirect losses incurred through the use of this terminal.</p>
          </div>

          <div className="flex flex-col gap-4">
             <button 
               onClick={handleAgree}
               className="w-full bg-brand-purple hover:bg-brand-purple/80 text-white font-bold tracking-widest uppercase py-4 rounded transition-all shadow-[0_0_20px_rgba(200,111,255,0.2)]"
             >
               I Understand and Agree
             </button>
             <button 
               onClick={() => window.location.href = "/"}
               className="w-full bg-transparent border border-[#1f2937] hover:bg-[#1f2937] text-gray-400 font-bold tracking-widest uppercase py-4 rounded transition-all"
             >
               Decline and Return
             </button>
          </div>
        </div>
      </div>
    );
  }

  const contractAddress = import.meta.env.VITE_SSI_PROTOCOL_ADDRESS || '0xCE2979887785d415b407727CDd8f6Ed752AAE335';

  return (
    <div className="min-h-screen bg-[#05070A] text-gray-300 pt-24 pb-12 px-4 sm:px-6 font-sans">
      
      {/* Top Header Stats & Wallet Info */}
      <div className="max-w-[1600px] mx-auto flex flex-wrap gap-4 items-center justify-between bg-[#0b0e14] border border-[#1f2937] p-3 rounded-lg mb-4 text-xs md:text-sm font-mono">
        <div className="flex gap-8 overflow-x-auto custom-scrollbar whitespace-nowrap items-center w-full justify-between">
          <div className="flex gap-8">
            <div className="flex flex-col"><span className="text-gray-500">Connected Wallet</span><span className="text-white font-bold">{isConnected && address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not Connected"}</span></div>
            <div className="flex flex-col"><span className="text-gray-500">Network</span><span className="text-green-500 font-bold">{chain?.name || "Sepolia"}</span></div>
            <div className="flex flex-col"><span className="text-gray-500">Smart Contract</span><span className="text-white">{contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}</span></div>
            <div className="flex flex-col"><span className="text-gray-500">Active Signals</span><span className="text-brand-purple font-bold">{narratives.length}</span></div>
          </div>
          <div className="flex gap-4 items-center">
             <a href="https://sepoliafaucet.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded font-bold uppercase tracking-widest hover:bg-brand-purple hover:text-white transition-colors border border-brand-purple/50">
               <Zap size={14} /> Claim Sepolia Faucet
             </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
        
        {/* Left Column: Terminal Logs */}
        <div className="lg:col-span-3 flex flex-col gap-4 h-[800px]">
          <div className="flex-1 bg-[#0b0e14] border border-[#1f2937] rounded-lg p-4 font-mono text-[10px] md:text-xs overflow-hidden flex flex-col">
            <div className="text-gray-400 font-bold uppercase tracking-wider mb-4 border-b border-[#1f2937] pb-2 flex justify-between">
              <span>System Logs</span>
              <span className="text-green-500 animate-pulse">● LIVE</span>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {logs?.map((log, i) => (
                <div key={i} className="border-l-2 border-[#1f2937] pl-2 py-1">
                  <span className="text-gray-500 mr-2">[{log?.time}]</span>
                  <span className={log?.type === 'error' ? 'text-red-400' : log?.type === 'success' ? 'text-green-400' : 'text-gray-300'}>
                    {log?.msg}
                  </span>
                </div>
              ))}
              {(!logs || logs.length === 0) && <div className="text-gray-600 italic">Initializing SoSoValue websocket stream...</div>}
            </div>
          </div>
          
          <div className="h-64 bg-[#0b0e14] border border-[#1f2937] rounded-lg p-4 font-mono overflow-y-auto custom-scrollbar">
             <div className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-4 border-b border-[#1f2937] pb-2">
               On-Chain Transaction History
             </div>
             <div className="space-y-3">
               {txHistory.length === 0 ? (
                 <div className="text-gray-600 text-xs text-center mt-8">No recent transactions.</div>
               ) : (
                 txHistory.map((tx, i) => (
                   <div key={i} className="bg-[#111827] p-2 rounded border border-[#1f2937]">
                     <div className="flex justify-between items-center mb-1">
                       <span className="text-white text-xs font-bold">{tx.theme}</span>
                       <span className="text-gray-500 text-[10px]">{tx.time}</span>
                     </div>
                     <a href={tx.explorer_url} target="_blank" rel="noreferrer" className="text-[9px] text-brand-purple hover:text-white truncate block">
                       {tx.tx_hash}
                     </a>
                   </div>
                 ))
               )}
             </div>
          </div>
        </div>

        {/* Center Column: Charts & Intelligence */}
        <div className="lg:col-span-6 flex flex-col gap-4 h-[800px]">
          <MarketChart symbol={activeNarrative.tokens?.[0]} />
          
          <div className="flex-1 bg-[#0b0e14] border border-[#1f2937] rounded-lg flex flex-col overflow-hidden">
            <div className="p-3 border-b border-[#1f2937] bg-[#111827] text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
               <Activity size={14} className="text-brand-purple" /> Active Intelligence Streams
            </div>
            <div className="flex-1 overflow-y-auto p-0">
              <table className="w-full text-left text-sm font-mono">
                <thead className="bg-[#111827] text-gray-500 text-xs border-b border-[#1f2937] sticky top-0">
                  <tr>
                    <th className="p-3 font-normal">Narrative Theme</th>
                    <th className="p-3 font-normal">Momentum</th>
                    <th className="p-3 font-normal">Tokens</th>
                    <th className="p-3 font-normal">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f2937]">
                  {narratives.map((n, i) => (
                    <tr key={i} className={`hover:bg-white/5 transition-colors group cursor-pointer ${selectedIndex === i ? 'bg-[#1f2937]/50' : ''}`}>
                      <td className="p-3 font-bold text-white max-w-[200px] truncate">{n.theme}</td>
                      <td className="p-3 text-green-500">{n.momentum}%</td>
                      <td className="p-3 text-brand-purple">{n.tokens?.join(", ")}</td>
                      <td className="p-3">
                        <button onClick={() => setSelectedIndex(i)} className={`text-[10px] border px-2 py-1 rounded transition-colors uppercase tracking-widest ${selectedIndex === i ? 'bg-brand-purple text-white border-brand-purple' : 'border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white'}`}>
                          {selectedIndex === i ? 'Active' : 'Select'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {narratives.length === 0 && (
                    <tr><td colSpan={4} className="p-8 text-center text-gray-500 animate-pulse">Awaiting LLM Synthesis...</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Execution Panel */}
        <div className="lg:col-span-3 flex flex-col gap-4 h-[800px]">
          
          <TradePanel narrative={activeNarrative} onSuccess={handleTxSuccess} />
          
          <div className="flex-1 bg-[#0b0e14] border border-[#1f2937] rounded-lg p-4 font-mono overflow-y-auto custom-scrollbar relative">
             <div className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-4 flex justify-between items-center border-b border-[#1f2937] pb-2">
               <div className="flex items-center gap-2"><ShieldAlert size={14} className="text-yellow-500" /> AI Strategy Verdict</div>
               <div className="text-[9px] text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded">POWERED BY GEMINI 1.5 PRO</div>
             </div>
             <div className="space-y-4">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Market Sentiment (Gemini)</div>
                  <div className="text-sm text-white leading-relaxed">{activeNarrative.summary || "Pending."}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Execution Plan</div>
                  <div className="text-sm text-[#10b981] leading-relaxed">{activeNarrative.suggestion || "Pending."}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Risk Verdict</div>
                  <div className="text-sm text-brand-purple leading-relaxed">{activeNarrative.verdict || "Pending."}</div>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
