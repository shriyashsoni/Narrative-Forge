import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, ChevronDown, Moon, Sun, Copy, Check, Info, AlertTriangle, Menu, X, Terminal, Code, Book, Zap } from 'lucide-react';

const DeveloperDocs = () => {
  const [isDark, setIsDark] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('Introduction');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedNav, setExpandedNav] = useState<Record<string, boolean>>({
    'Getting Started': true,
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
      items: ['Introduction', 'Quickstart', 'Authentication', 'Errors']
    },
    {
      title: 'API Reference',
      icon: <Code size={16} />,
      items: ['Endpoints', 'Pagination', 'Rate Limits', 'Webhooks']
    },
    {
      title: 'Guides',
      icon: <Book size={16} />,
      items: ['Data Models', 'Security', 'Best Practices']
    },
    {
      title: 'SDKs',
      icon: <Terminal size={16} />,
      items: ['Node.js', 'Python', 'Go']
    }
  ];

  const onThisPage = [
    { id: 'overview', title: 'Overview' },
    { id: 'authentication', title: 'Authentication' },
    { id: 'making-requests', title: 'Making Requests' },
    { id: 'parameters', title: 'Parameters' }
  ];

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${isDark ? 'bg-[#0a0a0a] text-[#ededed]' : 'bg-white text-[#171717]'}`}>
      
      {/* Top Navbar */}
      <nav className={`sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-16 border-b ${isDark ? 'bg-[#0a0a0a]/80 border-[#262626] backdrop-blur-md' : 'bg-white/80 border-[#e5e5e5] backdrop-blur-md'}`}>
        <div className="flex items-center gap-4 sm:gap-8">
          <button className="sm:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
            <div className={`w-6 h-6 rounded flex items-center justify-center ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
              <Terminal size={14} />
            </div>
            <span>NarrativeForge</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-2 ${isDark ? 'bg-[#262626] text-[#a3a3a3]' : 'bg-[#f5f5f5] text-[#737373]'}`}>Docs</span>
          </div>
          
          <div className="hidden md:flex items-center">
            <select className={`text-sm appearance-none outline-none cursor-pointer pl-2 pr-6 py-1 border-r ${isDark ? 'bg-transparent border-[#262626] text-[#a3a3a3] hover:text-[#ededed]' : 'bg-transparent border-[#e5e5e5] text-[#737373] hover:text-[#171717]'}`}>
              <option>v2.0 (Latest)</option>
              <option>v1.0</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm w-64 ${isDark ? 'bg-[#171717] border-[#262626] text-[#a3a3a3]' : 'bg-[#fafafa] border-[#e5e5e5] text-[#737373]'}`}>
            <Search size={14} />
            <span className="flex-1">Search documentation...</span>
            <kbd className={`text-[10px] px-1.5 py-0.5 rounded border font-mono ${isDark ? 'border-[#404040] bg-[#262626]' : 'border-[#e5e5e5] bg-white'}`}>⌘K</kbd>
          </div>
          
          <div className={`h-4 w-px ${isDark ? 'bg-[#262626]' : 'bg-[#e5e5e5]'}`}></div>
          
          <button onClick={() => setIsDark(!isDark)} className={`p-1.5 rounded-md transition-colors ${isDark ? 'hover:bg-[#262626] text-[#a3a3a3] hover:text-[#ededed]' : 'hover:bg-[#f5f5f5] text-[#737373] hover:text-[#171717]'}`}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="https://github.com" target="_blank" rel="noreferrer" className={`px-2 py-1 text-sm font-medium rounded-md transition-colors ${isDark ? 'hover:bg-[#262626] text-[#a3a3a3] hover:text-[#ededed]' : 'hover:bg-[#f5f5f5] text-[#737373] hover:text-[#171717]'}`}>
            GitHub
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
                          className={`text-sm w-full text-left py-1 transition-colors ${activeSection === item ? (isDark ? 'text-white font-medium' : 'text-black font-medium') : (isDark ? 'text-[#a3a3a3] hover:text-[#ededed]' : 'text-[#737373] hover:text-[#171717]')}`}
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
            
            <div className={`text-sm font-medium mb-4 ${isDark ? 'text-brand-purple' : 'text-blue-600'}`}>
              Getting Started
            </div>
            
            <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-black'}`} id="overview">
              API Reference
            </h1>
            
            <p className={`text-base sm:text-lg mb-8 leading-relaxed ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>
              The NarrativeForge API is organized around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes.
            </p>

            <div className={`mb-10 p-4 rounded-lg border flex gap-3 ${isDark ? 'bg-[#171717] border-[#262626]' : 'bg-[#f9fafb] border-[#e5e5e5]'}`}>
              <Info size={20} className={`shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
              <div className={`text-sm leading-relaxed ${isDark ? 'text-[#d4d4d4]' : 'text-[#404040]'}`}>
                <strong>Base URL:</strong> All API requests should be made to <code className={`px-1.5 py-0.5 rounded font-mono text-xs ${isDark ? 'bg-[#262626]' : 'bg-[#e5e5e5]'}`}>https://api.narrativeforge.dev/v1</code>
              </div>
            </div>

            <h2 className={`text-2xl font-bold tracking-tight mb-4 mt-12 pt-8 border-t ${isDark ? 'text-white border-[#262626]' : 'text-black border-[#e5e5e5]'}`} id="authentication">
              Authentication
            </h2>
            
            <p className={`text-base mb-6 leading-relaxed ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>
              Authenticate your account by including your secret key in API requests. You can manage your API keys in the Dashboard.
            </p>

            <div className={`mb-8 p-4 rounded-lg border flex gap-3 ${isDark ? 'bg-[#451a03]/30 border-[#78350f]' : 'bg-amber-50 border-amber-200'}`}>
              <AlertTriangle size={20} className={`shrink-0 ${isDark ? 'text-amber-500' : 'text-amber-600'}`} />
              <div className={`text-sm leading-relaxed ${isDark ? 'text-amber-200' : 'text-amber-800'}`}>
                <strong>Warning:</strong> Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub or client-side code.
              </div>
            </div>

            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-[#ededed]' : 'text-[#171717]'}`} id="making-requests">
              Making Requests
            </h3>

            <div className="relative mb-10 group">
              <div className={`absolute right-2 top-2 z-10 transition-opacity ${copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <button 
                  onClick={() => handleCopy('curl https://api.narrativeforge.dev/v1/narratives \\n  -H "Authorization: Bearer YOUR_API_KEY"')}
                  className={`p-1.5 rounded-md border backdrop-blur-md flex items-center gap-1.5 text-xs font-medium transition-all ${isDark ? 'bg-[#262626]/80 border-[#404040] text-[#a3a3a3] hover:text-white' : 'bg-white/80 border-[#e5e5e5] text-[#737373] hover:text-black'}`}
                >
                  {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className={`rounded-xl overflow-hidden border ${isDark ? 'border-[#262626]' : 'border-[#e5e5e5]'}`}>
                <div className={`px-4 py-2 text-xs font-mono border-b ${isDark ? 'bg-[#171717] border-[#262626] text-[#737373]' : 'bg-[#fafafa] border-[#e5e5e5] text-[#a3a3a3]'}`}>bash</div>
                <pre className={`p-4 overflow-x-auto text-sm font-mono leading-relaxed ${isDark ? 'bg-[#0a0a0a] text-[#e5e5e5]' : 'bg-[#fcfcfc] text-[#171717]'}`}>
                  <code className="language-bash">
                    <span className={isDark ? 'text-pink-400' : 'text-pink-600'}>curl</span> https://api.narrativeforge.dev/v1/narratives \{"\n"}
                    {'  '}-H <span className={isDark ? 'text-green-400' : 'text-green-600'}>"Authorization: Bearer YOUR_API_KEY"</span>
                  </code>
                </pre>
              </div>
            </div>

            <h2 className={`text-2xl font-bold tracking-tight mb-4 mt-12 pt-8 border-t ${isDark ? 'text-white border-[#262626]' : 'text-black border-[#e5e5e5]'}`} id="parameters">
              Parameters
            </h2>
            
            <p className={`text-base mb-6 leading-relaxed ${isDark ? 'text-[#a3a3a3]' : 'text-[#525252]'}`}>
              When querying the API, you can filter results using the following parameters:
            </p>

            <div className={`rounded-lg overflow-hidden border mb-12 ${isDark ? 'border-[#262626]' : 'border-[#e5e5e5]'}`}>
              <table className="w-full text-left text-sm">
                <thead className={`border-b ${isDark ? 'bg-[#171717] border-[#262626] text-[#a3a3a3]' : 'bg-[#fafafa] border-[#e5e5e5] text-[#737373]'}`}>
                  <tr>
                    <th className="px-4 py-3 font-medium">Parameter</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-[#262626] bg-[#0a0a0a]' : 'divide-[#e5e5e5] bg-white'}`}>
                  <tr>
                    <td className="px-4 py-4 font-mono text-xs">
                      <span className={isDark ? 'text-brand-purple' : 'text-blue-600'}>limit</span>
                    </td>
                    <td className={`px-4 py-4 font-mono text-xs ${isDark ? 'text-[#737373]' : 'text-[#a3a3a3]'}`}>integer</td>
                    <td className={`px-4 py-4 ${isDark ? 'text-[#d4d4d4]' : 'text-[#404040]'}`}>A limit on the number of objects to be returned, between 1 and 100.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-mono text-xs">
                      <span className={isDark ? 'text-brand-purple' : 'text-blue-600'}>theme</span>
                    </td>
                    <td className={`px-4 py-4 font-mono text-xs ${isDark ? 'text-[#737373]' : 'text-[#a3a3a3]'}`}>string</td>
                    <td className={`px-4 py-4 ${isDark ? 'text-[#d4d4d4]' : 'text-[#404040]'}`}>Filter narratives by a specific semantic theme or sector.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-mono text-xs">
                      <span className={isDark ? 'text-brand-purple' : 'text-blue-600'}>momentum_gt</span>
                    </td>
                    <td className={`px-4 py-4 font-mono text-xs ${isDark ? 'text-[#737373]' : 'text-[#a3a3a3]'}`}>float</td>
                    <td className={`px-4 py-4 ${isDark ? 'text-[#d4d4d4]' : 'text-[#404040]'}`}>Only return narratives with an AI momentum score greater than this value.</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </main>

        {/* Right Sidebar - On this page */}
        <aside className="hidden xl:block w-64 pt-10 pb-24 pr-8 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="pl-4">
            <h4 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${isDark ? 'text-[#ededed]' : 'text-[#171717]'}`}>On this page</h4>
            <ul className="space-y-2.5 border-l-2 pl-4" style={{ borderColor: isDark ? '#262626' : '#e5e5e5' }}>
              {onThisPage.map((item, i) => (
                <li key={i}>
                  <button 
                    onClick={() => scrollToAnchor(item.id)}
                    className={`text-sm text-left w-full transition-colors ${i === 0 ? (isDark ? 'text-brand-purple font-medium' : 'text-blue-600 font-medium') : (isDark ? 'text-[#a3a3a3] hover:text-[#ededed]' : 'text-[#737373] hover:text-[#171717]')}`}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default DeveloperDocs;
