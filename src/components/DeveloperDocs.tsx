import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, ChevronDown, Moon, Sun, Copy, Check, Info, AlertTriangle, Menu, X, Terminal, Code, Book, Zap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DeveloperDocs = () => {
  const [isDark, setIsDark] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('Introduction');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedNav, setExpandedNav] = useState<Record<string, boolean>>({
    'Getting Started': true,
    'Core Architecture': true,
    'API Reference': true,
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleNav = (section: string) => {
    setExpandedNav(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const navStructure = [
    {
      title: 'Getting Started',
      icon: <Zap size={16} />,
      items: ['Introduction', 'Platform Vision', 'Dashboard Guide']
    },
    {
      title: 'Core Architecture',
      icon: <Book size={16} />,
      items: ['AI Oracle Engine', 'On-Chain Execution', 'Data Aggregation']
    },
    {
      title: 'Smart Contracts',
      icon: <Code size={16} />,
      items: ['Contract Addresses', 'SoDEX Router', 'ValueChain Integration']
    },
    {
      title: 'Technology Stack',
      icon: <Terminal size={16} />,
      items: ['Frontend Stack', 'Backend Infrastructure', 'Web3 & AI']
    },
    {
      title: 'API Reference',
      icon: <Code size={16} />,
      items: ['Authentication', 'Narrative Streams', 'Trade Logs']
    }
  ];

  const contentMap: Record<string, React.ReactNode> = {
    'Introduction': (
      <>
        <div className={`text-sm font-medium mb-4 ${isDark ? 'text-brand-purple' : 'text-blue-600'}`}>Getting Started</div>
        <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Welcome to NarrativeForge</h1>
        <p className={`text-base sm:text-lg mb-8 leading-relaxed ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>
          NarrativeForge is the ultimate Web3 Intelligence Terminal. We bridge the gap between complex on-chain data, social sentiment, and decentralized execution. By utilizing advanced AI (Google Gemini Flash), we digest millions of data points into actionable, high-conviction trading narratives.
        </p>
        <div className={`mb-10 p-4 rounded-lg border flex gap-3 ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#f9fafb] border-[#e5e5e5]'}`}>
          <Info size={20} className={`shrink-0 ${isDark ? 'text-brand-purple' : 'text-blue-500'}`} />
          <div className={`text-sm leading-relaxed ${isDark ? 'text-[#d4d4d4]' : 'text-[#404040]'}`}>
            <strong>Key Concept:</strong> A "Narrative" is not just a token; it is a macro movement (e.g., Real World Assets, AI + Crypto). NarrativeForge identifies these movements before they price in.
          </div>
        </div>
      </>
    ),
    'Platform Vision': (
      <>
        <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Our Aim & Vision</h1>
        <p className={`text-base mb-6 leading-relaxed ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>
          The cryptocurrency market is dominated by noise. Retail traders are often the last to know about fundamental shifts in capital rotation. Our aim is to democratize institutional-grade intelligence.
        </p>
        <ul className={`list-disc pl-6 space-y-4 mb-8 ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>
          <li><strong>Speed:</strong> Process Web2 sentiment and Web3 on-chain flows in real-time.</li>
          <li><strong>Execution:</strong> Move from reading intelligence to executing on-chain trades seamlessly in the exact same interface.</li>
          <li><strong>Trust:</strong> We utilize decentralized routing on the Sepolia and ValueChain networks to guarantee transaction immutability.</li>
        </ul>
      </>
    ),
    'Dashboard Guide': (
      <>
        <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Using the Dashboard</h1>
        <p className={`text-base mb-6 leading-relaxed ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>
          The NarrativeForge dashboard is divided into three core pillars:
        </p>
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>1. Active Intelligence Streams</h3>
            <p className={`text-sm ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>Displays real-time computed narratives. Selecting a row actively updates the execution parameters and the AI summary panel.</p>
          </div>
          <div>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>2. Engine Diagnostics</h3>
            <p className={`text-sm ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>A live streaming terminal showing the backend Python processes, SoSoValue API polling, and Gemini inference steps.</p>
          </div>
          <div>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>3. On-Chain Forging</h3>
            <p className={`text-sm ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>The execution gateway. Initiates a MetaMask pop-up to directly interact with our Router Smart Contract.</p>
          </div>
        </div>
      </>
    ),
    'AI Oracle Engine': (
      <>
        <div className={`text-sm font-medium mb-4 ${isDark ? 'text-brand-purple' : 'text-blue-600'}`}>Core Architecture</div>
        <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-black'}`}>AI Oracle Engine</h1>
        <p className={`text-base mb-6 leading-relaxed ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>
          Our custom Python backend utilizes the <code>google-genai</code> SDK, specifically targeting the <code>gemini-2.5-flash</code> model for extremely low-latency market analysis.
        </p>
        <div className={`rounded-xl overflow-hidden border mb-8 ${isDark ? 'border-[#262626]' : 'border-[#e5e5e5]'}`}>
          <div className={`px-4 py-2 text-xs font-mono border-b ${isDark ? 'bg-[#171717] border-[#262626] text-[#737373]' : 'bg-[#fafafa] border-[#e5e5e5] text-[#a3a3a3]'}`}>python</div>
          <pre className={`p-4 overflow-x-auto text-sm font-mono leading-relaxed ${isDark ? 'bg-[#0a0a0a] text-[#e5e5e5]' : 'bg-[#fcfcfc] text-[#171717]'}`}>
            <code>
              response = client.models.generate_content(<br/>
              &nbsp;&nbsp;model='gemini-2.5-flash',<br/>
              &nbsp;&nbsp;contents='Analyze the following SoSoValue data stream and extract 3 major Web3 narratives...'<br/>
              )
            </code>
          </pre>
        </div>
      </>
    ),
    'On-Chain Execution': (
      <>
        <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-black'}`}>On-Chain Execution (SoDEX)</h1>
        <p className={`text-base mb-6 leading-relaxed ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>
          We bypass traditional Web2 order books completely. Trading via NarrativeForge means you are interacting directly with our smart contracts.
        </p>
        <div className={`mb-8 p-4 rounded-lg border flex gap-3 ${isDark ? 'bg-[#451a03]/30 border-[#78350f]' : 'bg-amber-50 border-amber-200'}`}>
          <AlertTriangle size={20} className={`shrink-0 ${isDark ? 'text-amber-500' : 'text-amber-600'}`} />
          <div className={`text-sm leading-relaxed ${isDark ? 'text-amber-200' : 'text-amber-800'}`}>
            <strong>Gas Overrides:</strong> Wagmi/Viem sometimes fails to estimate gas on congested testnets. We forcefully apply a <code>gas: BigInt(500000)</code> override to ensure MetaMask flawlessly triggers for the user.
          </div>
        </div>
      </>
    ),
    'Authentication': (
      <>
        <div className={`text-sm font-medium mb-4 ${isDark ? 'text-brand-purple' : 'text-blue-600'}`}>API Reference</div>
        <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Authentication</h1>
        <p className={`text-base mb-6 leading-relaxed ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>
          While frontend UI users authenticate strictly via Web3 Wallets (WalletConnect Project ID: <code>05e396cd86b2c8a0594e8d2d9fc86177</code>), programmatic API users must use Bearer tokens.
        </p>
        <div className="relative mb-10 group">
          <div className={`rounded-xl overflow-hidden border ${isDark ? 'border-[#262626]' : 'border-[#e5e5e5]'}`}>
            <div className={`px-4 py-2 text-xs font-mono border-b ${isDark ? 'bg-[#171717] border-[#262626] text-[#737373]' : 'bg-[#fafafa] border-[#e5e5e5] text-[#a3a3a3]'}`}>bash</div>
            <pre className={`p-4 overflow-x-auto text-sm font-mono leading-relaxed ${isDark ? 'bg-[#0a0a0a] text-[#e5e5e5]' : 'bg-[#fcfcfc] text-[#171717]'}`}>
              <code className="language-bash">
                <span className={isDark ? 'text-pink-400' : 'text-pink-600'}>curl</span> https://narrativeforge.vercel.app/api/narratives \{"\n"}
                {'  '}-H <span className={isDark ? 'text-green-400' : 'text-green-600'}>"Authorization: Bearer YOUR_API_KEY"</span>
              </code>
            </pre>
          </div>
        </div>
      </>
    ),
    'Contract Addresses': (
      <>
        <div className={`text-sm font-medium mb-4 ${isDark ? 'text-brand-purple' : 'text-blue-600'}`}>Smart Contracts</div>
        <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Contract Addresses</h1>
        <p className={`text-base mb-6 leading-relaxed ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>
          NarrativeForge integrates with multiple testnet layers to ensure scalable execution without massive gas fees during the beta phase.
        </p>
        
        <h3 className={`text-xl font-bold mt-8 mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Ethereum Sepolia (Layer 1)</h3>
        <div className={`rounded-lg overflow-hidden border mb-8 ${isDark ? 'border-[#262626]' : 'border-[#e5e5e5]'}`}>
          <table className="w-full text-left text-sm">
            <thead className={`border-b ${isDark ? 'bg-[#171717] border-[#262626] text-[#a3a3a3]' : 'bg-[#fafafa] border-[#e5e5e5] text-[#737373]'}`}>
              <tr>
                <th className="px-4 py-3 font-medium">Contract Name</th>
                <th className="px-4 py-3 font-medium">Address</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-[#262626] bg-[#0a0a0a]' : 'divide-[#e5e5e5] bg-white'}`}>
              <tr>
                <td className="px-4 py-4 font-medium">SoDEX Router</td>
                <td className="px-4 py-4 font-mono text-xs text-brand-purple">0xCE2979887785d415b407727CDd8f6Ed752AAE335</td>
              </tr>
              <tr>
                <td className="px-4 py-4 font-medium">USDT Mock Token</td>
                <td className="px-4 py-4 font-mono text-xs text-brand-purple">0x7169D38820dfd117C3FA1f22a697dBA58d90BA06</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3 className={`text-xl font-bold mt-8 mb-4 ${isDark ? 'text-white' : 'text-black'}`}>ValueChain (Layer 2)</h3>
        <p className={`text-sm mb-4 ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>We utilize ValueChain for high-throughput narrative forging logs. RPC: <code>https://testnet-rpc.valuechain.dev</code> (Chain ID: 138565)</p>
      </>
    ),
    'Frontend Stack': (
      <>
        <div className={`text-sm font-medium mb-4 ${isDark ? 'text-brand-purple' : 'text-blue-600'}`}>Technology Stack</div>
        <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Frontend Technologies</h1>
        <p className={`text-base mb-6 leading-relaxed ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>
          The NarrativeForge application is built for maximum speed and absolute visual precision.
        </p>
        <ul className={`list-none space-y-4 mb-8 ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>
          <li className={`p-4 rounded border ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#fafafa] border-[#e5e5e5]'}`}>
            <strong className={isDark ? 'text-white' : 'text-black'}>Vite + React (TypeScript):</strong> chosen over Next.js specifically for its lightning-fast Hot Module Replacement (HMR) and raw SPA performance in trading environments.
          </li>
          <li className={`p-4 rounded border ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#fafafa] border-[#e5e5e5]'}`}>
            <strong className={isDark ? 'text-white' : 'text-black'}>Tailwind CSS:</strong> We utilize strict Tailwind utility classes and completely bypass external component libraries to maintain 100% control over the DOM layout.
          </li>
          <li className={`p-4 rounded border ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#fafafa] border-[#e5e5e5]'}`}>
            <strong className={isDark ? 'text-white' : 'text-black'}>Lucide React & Recharts:</strong> Used for clean, stroke-based SVGs and high-performance SVG canvas charts in the trading interface.
          </li>
        </ul>
      </>
    ),
    'Backend Infrastructure': (
      <>
        <div className={`text-sm font-medium mb-4 ${isDark ? 'text-brand-purple' : 'text-blue-600'}`}>Technology Stack</div>
        <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Backend Infrastructure</h1>
        <p className={`text-base mb-6 leading-relaxed ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>
          Our backend engine processes gigabytes of data and distills it into frontend-consumable JSON via serverless architectures.
        </p>
        <ul className={`list-none space-y-4 mb-8 ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>
          <li className={`p-4 rounded border ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#fafafa] border-[#e5e5e5]'}`}>
            <strong className={isDark ? 'text-white' : 'text-black'}>Python 3.10+ FastAPI:</strong> The highest-performance asynchronous web framework in Python, chosen specifically to handle concurrent LLM requests and blockchain RPC polling without blocking.
          </li>
          <li className={`p-4 rounded border ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#fafafa] border-[#e5e5e5]'}`}>
            <strong className={isDark ? 'text-white' : 'text-black'}>Vercel Serverless:</strong> Deployed as an integrated monorepo via <code>@vercel/python</code>. We use serverless rewrites (<code>/api/*</code>) to bypass CORS issues entirely and serve the AI engine dynamically.
          </li>
        </ul>
      </>
    ),
    'Web3 & AI': (
      <>
        <div className={`text-sm font-medium mb-4 ${isDark ? 'text-brand-purple' : 'text-blue-600'}`}>Technology Stack</div>
        <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Web3 & AI Integrations</h1>
        <p className={`text-base mb-6 leading-relaxed ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>
          The bridge between traditional Web2 intelligence and Web3 decentralization.
        </p>
        <ul className={`list-none space-y-4 mb-8 ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>
          <li className={`p-4 rounded border flex flex-col gap-2 ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#fafafa] border-[#e5e5e5]'}`}>
            <strong className={isDark ? 'text-white' : 'text-black'}>Google Gemini 2.5 Flash API</strong>
            <span className={`text-sm ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>Used for massive context window ingestion. We parse raw JSON from SoSoValue and pipe it into Gemini to extract hidden correlations that humans miss.</span>
          </li>
          <li className={`p-4 rounded border flex flex-col gap-2 ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#fafafa] border-[#e5e5e5]'}`}>
            <strong className={isDark ? 'text-white' : 'text-black'}>Wagmi & Viem</strong>
            <span className={`text-sm ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>The absolute standard in React Ethereum interfaces. We utilize <code>useSendTransaction</code> and <code>parseEther</code> to handle precision decimal management directly on the client side, ensuring no backend ever touches user private keys.</span>
          </li>
          <li className={`p-4 rounded border flex flex-col gap-2 ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#fafafa] border-[#e5e5e5]'}`}>
            <strong className={isDark ? 'text-white' : 'text-black'}>RainbowKit</strong>
            <span className={`text-sm ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>Provides the seamless modal for WalletConnect, MetaMask, Coinbase Wallet, and hardware wallet integration.</span>
          </li>
        </ul>
      </>
    )
  };

  const currentContent = contentMap[activeSection] || contentMap['Introduction'];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${isDark ? 'bg-[#0a0a0a] text-[#ededed]' : 'bg-white text-[#171717]'}`}>
      
      {/* Top Navbar */}
      <nav className={`sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-16 border-b ${isDark ? 'bg-[#0a0a0a]/80 border-[#262626] backdrop-blur-md' : 'bg-white/80 border-[#e5e5e5] backdrop-blur-md'}`}>
        <div className="flex items-center gap-4 sm:gap-8">
          <button className="sm:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <Link to="/" className={`flex items-center gap-2 mr-2 px-3 py-1.5 rounded-md text-sm font-bold transition-all ${isDark ? 'bg-[#262626] hover:bg-[#404040] text-white' : 'bg-[#e5e5e5] hover:bg-[#d4d4d4] text-black'}`}>
            <ArrowLeft size={16} /> Back to App
          </Link>

          <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
            <div className={`w-6 h-6 rounded flex items-center justify-center ${isDark ? 'bg-brand-purple text-white' : 'bg-blue-600 text-white'}`}>
              <Terminal size={14} />
            </div>
            <span className="hidden sm:block">NarrativeForge</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-2 ${isDark ? 'bg-[#262626] text-[#a3a3a3]' : 'bg-[#f5f5f5] text-[#737373]'}`}>Docs</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setIsDark(!isDark)} className={`p-1.5 rounded-md transition-colors ${isDark ? 'hover:bg-[#262626] text-[#a3a3a3] hover:text-[#ededed]' : 'hover:bg-[#f5f5f5] text-[#737373] hover:text-[#171717]'}`}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="https://github.com/shriyashsoni/Narrative-Forge" target="_blank" rel="noreferrer" className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${isDark ? 'bg-[#262626] hover:bg-[#404040] text-white' : 'bg-[#e5e5e5] hover:bg-[#d4d4d4] text-black'}`}>
            GitHub Repo
          </a>
        </div>
      </nav>

      <div className="max-w-[90rem] mx-auto flex">
        
        {/* Left Sidebar Navigation */}
        <aside className={`fixed inset-y-0 left-0 pt-16 z-40 w-64 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:sticky sm:top-16 sm:h-[calc(100vh-4rem)] overflow-y-auto border-r ${isDark ? 'bg-[#0a0a0a] border-[#262626]' : 'bg-white border-[#e5e5e5]'} transition-transform duration-200 ease-in-out`}>
          <div className="p-4 sm:p-6 space-y-8">
            {navStructure.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <button 
                  onClick={() => toggleNav(section.title)}
                  className={`flex items-center justify-between w-full text-sm font-semibold tracking-tight ${isDark ? 'text-[#ededed]' : 'text-[#171717]'}`}
                >
                  <div className="flex items-center gap-2">
                    {section.icon}
                    {section.title}
                  </div>
                  {expandedNav[section.title] ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
                
                {expandedNav[section.title] && (
                  <ul className="space-y-1.5 border-l ml-2 pl-4 py-1 border-opacity-50" style={{ borderColor: isDark ? '#262626' : '#e5e5e5' }}>
                    {section.items.map((item, i) => (
                      <li key={i}>
                        <button 
                          onClick={() => { setActiveSection(item); setMobileMenuOpen(false); }}
                          className={`text-sm w-full text-left py-1.5 px-2 rounded transition-colors ${activeSection === item ? (isDark ? 'bg-[#262626] text-white font-medium' : 'bg-[#f5f5f5] text-black font-medium') : (isDark ? 'text-[#a3a3a3] hover:text-[#ededed] hover:bg-[#171717]' : 'text-[#737373] hover:text-[#171717] hover:bg-[#fafafa]')}`}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 px-4 sm:px-12 pt-10 pb-24">
          <div className="max-w-3xl mx-auto">
            {currentContent}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-64 pt-10 pb-24 pr-8 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="pl-4">
            <h4 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${isDark ? 'text-[#ededed]' : 'text-[#171717]'}`}>Section Details</h4>
            <ul className="space-y-2.5 border-l-2 pl-4" style={{ borderColor: isDark ? '#262626' : '#e5e5e5' }}>
              <li>
                <div className={`text-sm text-left w-full ${isDark ? 'text-brand-purple font-medium' : 'text-blue-600 font-medium'}`}>
                  {activeSection}
                </div>
              </li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default DeveloperDocs;
