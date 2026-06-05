import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { isConnected } = useAccount();
  const navLinks = isConnected 
    ? ["Home", "How it Works", "Forge", "Trade", "Docs"]
    : ["Home", "How it Works", "Docs"];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center pl-4 pr-1.5 pointer-events-none">
      <nav 
        className={`bg-white rounded-2xl shadow-lg transition-all duration-500 ease-in-out pointer-events-auto ${
          scrolled ? 'w-full max-w-3xl' : 'w-full max-w-6xl'
        }`}
      >
        <div className={`flex items-center justify-between transition-all duration-500 ease-in-out ${
          scrolled ? 'pl-4 pr-2 py-1.5' : 'pl-5 pr-2 py-1.5'
        }`}>
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img src="/favicon.svg" alt="NarrativeForge Logo" className="w-8 h-8" />
            <span className="text-[22px] tracking-[-0.02em] font-medium text-brand-navy">
              NarrativeForge
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className={`hidden md:flex items-center transition-all duration-500 ease-in-out ${
            scrolled ? 'gap-0' : 'gap-1'
          }`}>
            {navLinks.map((link, i) => (
              <button 
                key={i} 
                onClick={() => {
                  if (link === "Home") navigate('/');
                  else if (link === "How it Works") {
                    if (window.location.pathname !== '/') {
                      navigate('/');
                      setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 100);
                    } else {
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                  else if (link === "Forge") navigate('/dashboard');
                  else if (link === "Trade") navigate('/trade');
                  else if (link === "Docs") navigate('/docs');
                }}
                className={`text-xs text-brand-navy rounded-xl hover:bg-gray-100 font-bold uppercase tracking-wider transition-all duration-500 ease-in-out ${
                  scrolled ? 'px-3 py-2' : 'px-4 py-2'
                }`}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ConnectButton.Custom>
              {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
                const ready = mounted;
                const connected = ready && account && chain;
                return (
                  <div {...(!ready && { 'aria-hidden': true, style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' } })}>
                    {(() => {
                      if (!connected) {
                        return (
                          <button 
                            onClick={openConnectModal}
                            className={`bg-brand-purple text-white text-sm font-medium rounded-xl hover:bg-brand-navy transition-all duration-300 flex items-center gap-2 ${
                              scrolled ? 'px-4 py-2' : 'px-5 py-2'
                            }`}
                          >
                            <span className="hidden sm:inline">Connect</span> Wallet <ArrowRight size={16} />
                          </button>
                        );
                      }
                      if (chain.unsupported) {
                        return (
                          <button onClick={openChainModal} className="bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-all duration-300 px-4 py-2">
                            Wrong network
                          </button>
                        );
                      }
                      return (
                        <div className="flex items-center gap-2">
                          <button onClick={openChainModal} className="hidden sm:flex items-center gap-1.5 bg-gray-100 text-brand-navy text-sm font-medium rounded-xl hover:bg-gray-200 transition-all duration-300 px-3 py-2">
                            {chain.hasIcon && (
                              <div style={{ background: chain.iconBackground, width: 16, height: 16, borderRadius: 999, overflow: 'hidden' }}>
                                {chain.iconUrl && <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} style={{ width: 16, height: 16 }} />}
                              </div>
                            )}
                          </button>
                          <button onClick={openAccountModal} className="bg-brand-navy text-white text-sm font-medium rounded-xl hover:bg-brand-purple transition-all duration-300 px-4 py-2">
                            {account.displayName}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
            
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={20} className="text-brand-navy" /> : <Menu size={20} className="text-brand-navy" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white rounded-b-2xl absolute w-full left-0 top-full mt-1 p-2 flex flex-col gap-1 shadow-lg">
            {navLinks.map((link, i) => (
              <button 
                key={i} 
                onClick={() => {
                  if (link === "Home") navigate('/');
                  else if (link === "How it Works") {
                    if (window.location.pathname !== '/') {
                      navigate('/');
                      setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 100);
                    } else {
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                  else if (link === "Forge") navigate('/dashboard');
                  else if (link === "Trade") navigate('/trade');
                  else if (link === "Docs") navigate('/docs');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-sm text-brand-navy px-4 py-3 rounded-xl hover:bg-gray-50 font-medium"
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
