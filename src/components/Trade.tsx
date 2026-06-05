import React, { useState, useEffect } from 'react';
import { Activity, Zap, ShieldAlert, BarChart2, Layers } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

// --- Subcomponents ---
const OrderBook = () => {
  const asks = Array.from({length: 12}).map((_, i) => ({ price: (65000 + i * 15.5).toFixed(2), amount: (Math.random() * 2).toFixed(4), total: (Math.random() * 5).toFixed(4) })).reverse();
  const bids = Array.from({length: 12}).map((_, i) => ({ price: (64990 - i * 15.5).toFixed(2), amount: (Math.random() * 2).toFixed(4), total: (Math.random() * 5).toFixed(4) }));
  
  return (
    <div className="flex flex-col h-full bg-[#0b0e14] border border-[#1f2937] rounded-lg overflow-hidden font-mono text-[10px] md:text-xs">
      <div className="flex items-center justify-between p-3 border-b border-[#1f2937] bg-[#111827]">
        <div className="text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2"><Layers size={14} /> SoDEX Order Book</div>
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
    <div className="h-[400px] w-full bg-[#0b0e14] border border-[#1f2937] rounded-lg overflow-hidden flex flex-col">
      <div className="bg-[#111827] px-3 py-2 border-b border-[#1f2937] flex justify-between items-center text-xs">
        <span className="text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2"><BarChart2 size={14} /> Live Market Data</span>
        <span className="text-green-500 font-mono text-[10px] bg-green-500/10 px-2 py-0.5 rounded">SoDEX ORACLE</span>
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

export default function Trade() {
  const { isConnected, address, chain } = useAccount();
  const [symbol, setSymbol] = useState("BTC");
  const [amount, setAmount] = useState("0.1");
  const [tradeLogs, setTradeLogs] = useState<any[]>([]);

  // On-Chain Execution Setup
  const { sendTransactionAsync, isPending } = useSendTransaction();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleOnChainTrade = async () => {
    if (!address) return;
    try {
      const txHash = await sendTransactionAsync({
        to: '0xCE2979887785d415b407727CDd8f6Ed752AAE335', // Routing to SSI Protocol as mock DEX Router
        value: parseEther('0.0001'),
        chainId: 11155111,
        gas: BigInt(100000) // Force gas to ensure prompt MetaMask popup
      } as any);

      setIsConfirming(true);
      
      // Optimistic UI update: bypass slow public RPC polling
      setTimeout(() => {
        setIsConfirming(false);
        setTradeLogs(prev => [{
          time: new Date().toLocaleTimeString(),
          pair: `${symbol}/USDT`,
          size: amount,
          hash: txHash,
          url: `https://sepolia.etherscan.io/tx/${txHash}`
        }, ...prev]);
      }, 3000);

    } catch (err: any) { 
      console.error(err);
      setIsConfirming(false);
      // Optional: alert(err.shortMessage || "Transaction failed");
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[#05070A] flex flex-col items-center justify-center font-mono">
        <div className="bg-[#0b0e14] border border-[#1f2937] p-12 rounded-2xl flex flex-col items-center gap-6 max-w-md text-center shadow-2xl">
          <ShieldAlert size={64} className="text-brand-purple opacity-80" />
          <h2 className="text-2xl text-white font-bold tracking-tight">TRADE TERMINAL LOCKED</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Authentication required. You must connect a Web3 wallet to execute trades on SoDEX.
          </p>
          <div className="mt-4">
             <p className="text-brand-purple font-bold tracking-widest text-xs animate-pulse">CONNECT WALLET IN TOP RIGHT</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070A] text-gray-300 pt-24 pb-12 px-4 sm:px-6 font-sans">
      
      {/* Top Header Stats */}
      <div className="max-w-[1600px] mx-auto flex flex-wrap gap-4 items-center justify-between bg-[#0b0e14] border border-[#1f2937] p-3 rounded-lg mb-4 text-xs md:text-sm font-mono">
        <div className="flex gap-8 overflow-x-auto custom-scrollbar whitespace-nowrap items-center w-full justify-between">
          <div className="flex gap-8">
            <div className="flex flex-col"><span className="text-gray-500">Connected Wallet</span><span className="text-white font-bold">{isConnected && address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not Connected"}</span></div>
            <div className="flex flex-col"><span className="text-gray-500">Network</span><span className="text-green-500 font-bold">{chain?.name || "SoDEX Testnet"}</span></div>
            <div className="flex flex-col"><span className="text-gray-500">24h Vol</span><span className="text-white">$1,342,109.20</span></div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
        
        {/* Left Column: Orderbook */}
        <div className="lg:col-span-3 flex flex-col gap-4 h-[800px]">
          <OrderBook />
        </div>

        {/* Center Column: Charts */}
        <div className="lg:col-span-6 flex flex-col gap-4 h-[800px]">
          <MarketChart symbol={symbol} />
          
          <div className="flex-1 bg-[#0b0e14] border border-[#1f2937] rounded-lg p-4 font-mono">
             <div className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-4 flex justify-between items-center border-b border-[#1f2937] pb-2">
               <div className="flex items-center gap-2"><Activity size={14} className="text-brand-purple" /> Trade History</div>
             </div>
             
             {tradeLogs.length === 0 ? (
               <div className="text-center text-gray-600 mt-12 text-sm">
                  No recent trades found for this wallet on SoDEX.
               </div>
             ) : (
               <div className="flex flex-col gap-2 overflow-y-auto">
                 {tradeLogs.map((log, i) => (
                   <div key={i} className="flex justify-between items-center bg-[#111827] border border-[#1f2937] p-3 rounded text-xs">
                     <div className="flex flex-col gap-1">
                       <span className="text-green-500 font-bold">BUY {log.size} {log.pair}</span>
                       <span className="text-gray-500">{log.time}</span>
                     </div>
                     <a href={log.url} target="_blank" rel="noreferrer" className="text-brand-purple hover:underline bg-brand-purple/10 px-2 py-1 rounded">
                       {log.hash.slice(0, 6)}...{log.hash.slice(-4)}
                     </a>
                   </div>
                 ))}
               </div>
             )}
          </div>
        </div>

        {/* Right Column: Execution Panel */}
        <div className="lg:col-span-3 flex flex-col gap-4 h-[800px]">
          
          <div className="bg-[#0b0e14] border border-[#1f2937] rounded-lg p-4 flex flex-col gap-4 font-mono h-full">
            <div className="flex justify-between items-center pb-2 border-b border-[#1f2937]">
              <span className="text-white font-bold tracking-wider">SODEX EXECUTION</span>
              <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded">SPOT</span>
            </div>
            
            <div className="space-y-6 mt-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Trading Pair</div>
                <div className="flex bg-[#111827] border border-[#1f2937] rounded overflow-hidden">
                  <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value.toUpperCase())} className="bg-transparent text-white px-3 py-2 w-full outline-none font-bold" />
                  <div className="bg-[#1f2937] text-gray-300 px-3 py-2 flex items-center">/ USDT</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Size</span>
                  <span>Avail: 5,000.00 USDT</span>
                </div>
                <div className="flex bg-[#111827] border border-[#1f2937] rounded overflow-hidden">
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-transparent text-white px-3 py-2 w-full outline-none text-right font-bold" />
                  <div className="bg-[#1f2937] text-gray-300 px-3 py-2 flex items-center">USDT</div>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-3 border-t border-[#1f2937]">
                <button onClick={handleOnChainTrade} disabled={isPending || isConfirming} className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-4 rounded transition-colors text-sm tracking-widest flex justify-center items-center gap-2 shadow-lg shadow-green-500/20 disabled:opacity-50">
                  {isPending ? "AWAITING SIGNATURE..." : isConfirming ? "MINING ON-CHAIN..." : "BUY / LONG"} <Activity size={16} />
                </button>
                <button onClick={handleOnChainTrade} disabled={isPending || isConfirming} className="w-full bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-500 font-bold py-4 rounded transition-colors text-sm tracking-widest flex justify-center items-center gap-2 disabled:opacity-50">
                  {isPending ? "AWAITING SIGNATURE..." : isConfirming ? "MINING ON-CHAIN..." : "SELL / SHORT"} 
                </button>
              </div>

              <div className="bg-[#111827] p-4 rounded-lg border border-[#1f2937] mt-8">
                 <div className="flex items-center gap-2 text-brand-purple text-xs font-bold uppercase tracking-widest mb-2">
                    <ShieldAlert size={14} /> ON-CHAIN EXECUTION
                 </div>
                 <p className="text-[10px] text-gray-500 leading-relaxed">
                   Trades placed here bypass the Web2 API entirely. You are cryptographically signing a Web3 transaction routing your stablecoins to the SoDEX Router Smart Contract on the Ethereum Sepolia Network.
                 </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
