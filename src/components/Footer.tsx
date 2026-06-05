import React from 'react';
import { Terminal } from 'lucide-react';
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
              <span className="text-2xl">⚡</span>
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
                <li><button onClick={() => navigate('/dashboard')} className="text-sm text-[#a3a3a3] hover:text-white transition-colors">Solution</button></li>
                <li><button onClick={() => navigate('/')} className="text-sm text-[#a3a3a3] hover:text-white transition-colors">How it works</button></li>
                <li><button onClick={() => navigate('/docs')} className="text-sm text-[#a3a3a3] hover:text-white transition-colors">Mission</button></li>
                <li><button onClick={() => navigate('/trade')} className="text-sm text-[#a3a3a3] hover:text-white transition-colors">Pricing</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><button onClick={() => navigate('/docs')} className="text-sm text-[#a3a3a3] hover:text-white transition-colors">Docs</button></li>
                <li><button onClick={() => navigate('/')} className="text-sm text-[#a3a3a3] hover:text-white transition-colors">Blog</button></li>
                <li><button onClick={() => navigate('/')} className="text-sm text-[#a3a3a3] hover:text-white transition-colors">Changelog</button></li>
                <li><button onClick={() => navigate('/')} className="text-sm text-[#a3a3a3] hover:text-white transition-colors">Help center</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-4">Company</h3>
              <ul className="space-y-3">
                <li><button onClick={() => navigate('/')} className="text-sm text-[#a3a3a3] hover:text-white transition-colors">Privacy</button></li>
                <li><button onClick={() => navigate('/')} className="text-sm text-[#a3a3a3] hover:text-white transition-colors">Terms</button></li>
                <li><button onClick={() => navigate('/')} className="text-sm text-[#a3a3a3] hover:text-white transition-colors">Enterprise</button></li>
                <li><button onClick={() => navigate('/')} className="text-sm text-[#a3a3a3] hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#1f2937]/50 text-xs text-[#a3a3a3]">
          <p>© 2026 NarrativeForge Labs. Built on ValueChain.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="https://x.com/shriyashsoni" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter / X 🐦</a>
            <div className="flex items-center gap-2">
              <span>🟢</span>
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
