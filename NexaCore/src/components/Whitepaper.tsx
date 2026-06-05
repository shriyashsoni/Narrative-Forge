import React, { useState } from 'react';
import { BookOpen, Shield, Zap, Layers, Activity, ChevronRight, Code, Database, Globe } from 'lucide-react';

const DOC_SECTIONS = [
  { id: 'intro', title: 'Introduction', icon: <BookOpen size={16} /> },
  { id: 'architecture', title: 'Core Architecture', icon: <Layers size={16} /> },
  { id: 'smart-contracts', title: 'Smart Contracts (SSI)', icon: <Shield size={16} /> },
  { id: 'apis', title: 'API Integrations', icon: <Database size={16} /> },
  { id: 'deployment', title: 'Testnet & Mainnet', icon: <Globe size={16} /> },
  { id: 'engine', title: 'Trading Engine', icon: <Zap size={16} /> },
];

const Whitepaper = () => {
  const [activeDoc, setActiveDoc] = useState('intro');

  const renderContent = () => {
    switch (activeDoc) {
      case 'intro':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h1 className="text-4xl font-bold text-white mb-4">Introduction to NarrativeForge</h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              NarrativeForge is a decentralized autonomous agent architecture designed to bridge the gap between financial intelligence and on-chain execution. It enables "one-person fund management" by automating the discovery, construction, and rebalancing of thematic indexes.
            </p>
            <div className="bg-[#111827] border border-[#1f2937] p-6 rounded-xl mt-8">
              <h3 className="text-brand-purple font-bold mb-2">The Problem</h3>
              <p className="text-gray-400 leading-relaxed">
                Crypto narratives move faster than human execution. By the time a trader identifies a trend (e.g., "AI Season"), the liquidity has already shifted. Managing a basket of tokens to capture these narratives requires constant rebalancing, high gas fees, and 24/7 monitoring.
              </p>
            </div>
            <div className="bg-[#111827] border border-[#1f2937] p-6 rounded-xl">
              <h3 className="text-brand-purple font-bold mb-2">The Solution</h3>
              <p className="text-gray-400 leading-relaxed">
                NarrativeForge uses a Gemini 1.5 Pro AI oracle to scrape the SoSoValue terminal, identify emerging narratives, construct an optimized basket of tokens, and permanently publish this index to the SSI Protocol smart contract on the Ethereum blockchain.
              </p>
            </div>
          </div>
        );
      case 'architecture':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h1 className="text-4xl font-bold text-white mb-4">System Architecture</h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              The platform is built on three distinct, decoupled layers ensuring security, scalability, and decentralization.
            </p>
            
            <div className="space-y-6">
              <div className="border-l-4 border-brand-purple pl-6 py-2">
                <h3 className="text-white font-bold text-xl mb-2">1. The Intelligence Layer (Off-Chain Oracle)</h3>
                <p className="text-gray-400 leading-relaxed">
                  A Python-based backend that continuously polls the SoSoValue API for breaking news and sector shifts. This data is fed into the Gemini LLM to extract actionable signals, narrative momentum scores, and token correlation matrices.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-6 py-2">
                <h3 className="text-white font-bold text-xl mb-2">2. The Execution Layer (On-Chain)</h3>
                <p className="text-gray-400 leading-relaxed">
                  The frontend React interface (powered by Wagmi & viem) receives the AI signals via WebSockets. The user reviews the AI's proposed index weights and physically signs the `publishIndex` transaction using their MetaMask wallet to push it to the SSI Protocol.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h3 className="text-white font-bold text-xl mb-2">3. The Trading Layer (SoDEX)</h3>
                <p className="text-gray-400 leading-relaxed">
                  Once an index is forged, the platform interfaces with the SoDEX high-frequency matching engine via authenticated API routes to execute the physical spot trades necessary to acquire the underlying assets of the index.
                </p>
              </div>
            </div>
          </div>
        );
      case 'smart-contracts':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h1 className="text-4xl font-bold text-white mb-4">SSI Protocol Smart Contracts</h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              The Synthetic Sector Index (SSI) Protocol is the backbone of the NarrativeForge ecosystem. It is a solidity smart contract that immutably records the composition of AI-generated indexes.
            </p>
            
            <div className="bg-[#111827] border border-[#1f2937] p-6 rounded-xl mt-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Code size={18} className="text-brand-purple" /> publishIndex Function</h3>
              <pre className="bg-[#0b0e14] p-4 rounded-lg overflow-x-auto text-sm text-gray-300 font-mono border border-[#1f2937]">
{`function publishIndex(
    string memory _name,
    string[] memory _symbols,
    uint256[] memory _weights
) external returns (bytes32 indexId) {
    require(_symbols.length == _weights.length, "Mismatched arrays");
    
    uint256 totalWeight = 0;
    for(uint i=0; i < _weights.length; i++) {
        totalWeight += _weights[i];
    }
    require(totalWeight == 10000, "Weights must sum to 10000 bps");

    // Index recording logic...
}`}
              </pre>
            </div>
            
            <h3 className="text-white font-bold text-xl mt-8">Basis Point Architecture</h3>
            <p className="text-gray-400 leading-relaxed">
              The contract strictly enforces that all token weightings must sum to exactly 10,000 basis points (100.00%). This ensures mathematical validity when the SoDEX routing engine calculates execution lot sizes.
            </p>
          </div>
        );
      case 'apis':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h1 className="text-4xl font-bold text-white mb-4">API Integrations</h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              NarrativeForge utilizes three enterprise-grade APIs to orchestrate its autonomous trading loop.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#111827] border border-[#1f2937] p-6 rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-white font-bold text-lg">SoSoValue API</h3>
                  <span className="bg-blue-500/10 text-blue-500 text-[10px] px-2 py-1 rounded uppercase tracking-widest font-bold">Data Ingestion</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Provides the raw institutional research, macro news, and sector tokenomics required by the AI.
                </p>
                <div className="text-xs font-mono text-gray-500 bg-[#0b0e14] p-2 rounded">Endpoint: /api/v1/news/market</div>
              </div>

              <div className="bg-[#111827] border border-[#1f2937] p-6 rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-white font-bold text-lg">Gemini 1.5 Pro</h3>
                  <span className="bg-brand-purple/10 text-brand-purple text-[10px] px-2 py-1 rounded uppercase tracking-widest font-bold">Intelligence</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Google's advanced LLM processes the massive JSON payloads from SoSoValue to extract the Top 3 correlated tokens and determine Risk Verdicts.
                </p>
                <div className="text-xs font-mono text-gray-500 bg-[#0b0e14] p-2 rounded">Model: gemini-1.5-flash</div>
              </div>

              <div className="bg-[#111827] border border-[#1f2937] p-6 rounded-xl md:col-span-2">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-white font-bold text-lg">SoDEX Execution API</h3>
                  <span className="bg-green-500/10 text-green-500 text-[10px] px-2 py-1 rounded uppercase tracking-widest font-bold">Execution</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  The backend uses cryptographically signed payloads via `sodex_client.py` to interface with the SoDEX testnet gateway, allowing the platform to execute spot buy/sell orders instantly.
                </p>
                <div className="text-xs font-mono text-gray-500 bg-[#0b0e14] p-2 rounded">Gateway: testnet-gw.sodex.dev/api/v1/trade</div>
              </div>
            </div>
          </div>
        );
      case 'deployment':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h1 className="text-4xl font-bold text-white mb-4">Network Deployments</h1>
            
            <div className="bg-brand-purple/10 border border-brand-purple/30 p-6 rounded-xl mb-8">
              <h3 className="text-brand-purple font-bold text-xl mb-2">Ethereum Sepolia Testnet (Active)</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                The platform is currently fully deployed and operational on the Ethereum Sepolia Testnet. All transactions, index forging, and contract interactions utilize testnet ETH.
              </p>
              <div className="flex items-center gap-4 bg-[#0b0e14] p-4 rounded border border-[#1f2937]">
                <span className="text-gray-500 text-sm">Contract Address:</span>
                <a href="https://sepolia.etherscan.io/address/0xCE2979887785d415b407727CDd8f6Ed752AAE335" target="_blank" rel="noreferrer" className="text-brand-purple font-mono hover:underline">
                  0xCE2979887785d415b407727CDd8f6Ed752AAE335
                </a>
              </div>
            </div>

            <div className="bg-[#111827] border border-[#1f2937] p-6 rounded-xl">
              <h3 className="text-white font-bold text-xl mb-2">Ethereum Mainnet Strategy</h3>
              <p className="text-gray-400 leading-relaxed">
                Before migrating to Mainnet, the `SSIProtocol.sol` contract requires a comprehensive formal verification audit. The architecture natively supports multi-chain deployments, and the Wagmi configurations in `main.tsx` are already pre-configured to handle `mainnet` chain IDs when the deployment script is executed against a Mainnet RPC.
              </p>
            </div>
          </div>
        );
      case 'engine':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h1 className="text-4xl font-bold text-white mb-4">The Trading Engine</h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              The Trading Dashboard is designed to mirror institutional quantitative desks, merging Web3 execution with high-fidelity analytics.
            </p>

            <ul className="space-y-8">
              <li className="flex gap-4">
                <div className="w-12 h-12 bg-[#111827] border border-[#1f2937] rounded-full flex items-center justify-center shrink-0">
                  <Activity className="text-brand-purple" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">TradingView Integration</h4>
                  <p className="text-gray-400 leading-relaxed">
                    Instead of simulated or static charts, the platform embeds a native Advanced TradingView Data Feed. Whenever the AI extracts a token, the chart automatically updates to the `BINANCE:TOKENUSDT` pair to provide real-time candlestick and volume depth.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-12 h-12 bg-[#111827] border border-[#1f2937] rounded-full flex items-center justify-center shrink-0">
                  <Shield size={20} className="text-green-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Strict Authentication</h4>
                  <p className="text-gray-400 leading-relaxed">
                    The entire dashboard is locked behind a Web3 authentication barrier. If a wallet is not connected, the terminal cannot be accessed, ensuring that all API queries and WebSocket connections are tied to an active user session.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#05070A] pt-24 pb-12 font-sans">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-8 h-[calc(100vh-8rem)]">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-3">
            Documentation
          </div>
          {DOC_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveDoc(section.id)}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeDoc === section.id 
                  ? 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20 font-bold' 
                  : 'text-gray-400 hover:bg-[#111827] hover:text-white border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                {section.icon}
                <span className="text-sm">{section.title}</span>
              </div>
              {activeDoc === section.id && <ChevronRight size={14} />}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-[#0b0e14] border border-[#1f2937] rounded-2xl overflow-y-auto custom-scrollbar p-8 md:p-12 relative">
          {renderContent()}
        </div>

      </div>
    </div>
  );
};

export default Whitepaper;
