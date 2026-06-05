import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#05070A] text-white relative overflow-hidden pt-24 pb-8 border-t border-[#1f2937]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/favicon.svg" alt="NarrativeForge Logo" className="w-8 h-8" />
              <span className="font-bold text-xl tracking-tight">NarrativeForge</span>
            </div>
            <p className="text-[#a3a3a3] text-sm leading-relaxed mb-6">
              Unified Web3 intelligence and decentralized execution. 
              One programmable rail on ValueChain — intelligence, compliance, and capital flow.
            </p>
            <button onClick={() => navigate('/dashboard')} className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
              Book a demo
            </button>
          </div>

          {/* Links Columns */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-3 gap-8 md:pl-12">
            <div>
              <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-4">Product</h3>
              <ul className="space-y-3">
                <li><button onClick={() => navigate('/dashboard')} className="text-sm text-[#a3a3a3] hover:text-white transition-colors">Intelligence Dashboard</button></li>
                <li><button onClick={() => navigate('/trade')} className="text-sm text-[#a3a3a3] hover:text-white transition-colors">SoDEX Trading</button></li>
                <li><button onClick={() => navigate('/')} className="text-sm text-[#a3a3a3] hover:text-white transition-colors">AI Oracle</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-4">Developers</h3>
              <ul className="space-y-3">
                <li><button onClick={() => navigate('/docs')} className="text-sm text-[#a3a3a3] hover:text-white transition-colors">API Documentation</button></li>
                <li><button onClick={() => navigate('/contracts')} className="text-sm text-[#a3a3a3] hover:text-white transition-colors">Smart Contracts</button></li>
                <li><button onClick={() => navigate('/docs')} className="text-sm text-[#a3a3a3] hover:text-white transition-colors">Technology Stack</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-4">Ecosystem</h3>
              <ul className="space-y-3">
                <li><a href="https://github.com/shriyashsoni/Narrative-Forge" target="_blank" rel="noreferrer" className="text-sm text-[#a3a3a3] hover:text-white transition-colors">GitHub Repository</a></li>
                <li><a href="https://valuechain.dev" target="_blank" rel="noreferrer" className="text-sm text-[#a3a3a3] hover:text-white transition-colors">ValueChain Layer 2</a></li>
                <li><a href="https://sepolia.etherscan.io" target="_blank" rel="noreferrer" className="text-sm text-[#a3a3a3] hover:text-white transition-colors">Sepolia Testnet</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#1f2937]/50 text-xs text-[#a3a3a3]">
          <p>© 2026 NarrativeForge Labs. Built on ValueChain.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="https://x.com/shriyashsoni" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter / X</a>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              All systems operational
            </div>
          </div>
        </div>
      </div>

      {/* Giant Background Text */}
      <div className="absolute bottom-[-5%] left-0 w-full overflow-hidden pointer-events-none select-none flex justify-center z-0">
        <h1 
          className="text-[13vw] font-black tracking-tighter leading-none"
          style={{
            background: 'linear-gradient(180deg, rgba(31, 41, 55, 0.5) 0%, rgba(5, 7, 10, 0) 80%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            userSelect: 'none'
          }}
        >
          NARRATIVEFORGE
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
