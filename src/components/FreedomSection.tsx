import React from 'react';
import HlsVideo from './HlsVideo';
import { Cloud } from 'lucide-react';

const FreedomSection = () => {
  const negatives = [
    "Reactive portfolio management when market sentiment shifts",
    "Manual data scraping drains bandwidth from active trading",
    "Hallucinated AI signals because source data lacks verifiable context",
    "Fragmented execution platforms produce mismatched portfolio weights",
    "Scattered news feeds buried across siloed social media platforms"
  ];

  const positives = [
    "Layered LLM analysis eliminates noise at every market shift",
    "Streamlined smart contract handoffs deliver on-chain outcomes fast",
    "Live mathematical loops keep token weights locked to exactly 100%",
    "Unified DEX execution through a single automated API bridge",
    "Centralized intelligence and transparent hashes accelerate every trade"
  ];

  return (
    <section 
      id="how-it-works"
      className="flex flex-col items-center bg-white"
      style={{
        padding: 'clamp(48px, 6vw, 80px) clamp(16px, 3vw, 40px)',
        gap: 36
      }}
    >
      {/* Header */}
      <div className="flex flex-col items-center text-center" style={{ gap: 36 }}>
        {/* Chip */}
        <div 
          className="flex items-center gap-2 rounded-full font-medium"
          style={{
            backgroundColor: 'rgb(249, 249, 249)',
            padding: '0.9vw 1.25vw',
            color: 'rgb(26, 11, 84)',
            fontSize: 18
          }}
        >
          <svg width="19" height="18" viewBox="0 0 17 16" fill="rgb(200,111,255)" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 2.5C11.1 2.5 9.8 3.3 9 4.4C8.2 3.3 6.9 2.5 5.5 2.5C3.3 2.5 1.5 4.3 1.5 6.5C1.5 9.5 9 14.5 9 14.5C9 14.5 16.5 9.5 16.5 6.5C16.5 4.3 14.7 2.5 12.5 2.5Z" />
          </svg>
          The Web3 Oracle
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-medium text-brand-navy tracking-tight max-w-2xl leading-tight">
          Eliminating latency between <span className="bg-gradient-a text-transparent bg-clip-text">narrative detection</span> and execution.
        </h2>
        <p className="text-lg text-brand-lavender max-w-2xl">
          By coupling the Google Gemini Flash API with the massive transaction throughput of ValueChain, NarrativeForge ensures that you never miss a capital rotation. We transform raw SoSoValue metadata into precise, gas-optimized Ethereum Sepolia transactions.
        </p>
      </div>

      {/* 3-Column Grid */}
      <div 
        className="flex flex-col lg:grid items-start w-full max-w-[1600px]"
        style={{
          gridTemplateColumns: '26vw 1fr 26vw',
          columnGap: 36,
          rowGap: 24,
          padding: '0 clamp(0px, 2.92vw, 40px)'
        }}
      >
        {/* Left Column - Negatives */}
        <div className="flex flex-col w-full" style={{ gap: 12 }}>
          <div 
            className="flex items-center bg-white rounded-[18px]"
            style={{
              padding: 'clamp(12px, 0.97vw, 16px) clamp(14px, 1.25vw, 20px)',
              boxShadow: '0 3px 9.1px #3f4a7e0d, 0 1px 29px #3f4a7e1a',
              color: 'rgb(131, 121, 158)',
              fontSize: 'clamp(13px, 1.15vw, 17px)',
              gap: 12
            }}
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500 line-through">Traditional Trading Tools</span>
              <span className="text-brand-navy font-medium">NarrativeForge Ecosystem</span>
            </div>
          </div>
            
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">Architecture</span>
              <span className="text-brand-purple font-medium">Decentralized Oracle Engine</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">Order Books</span>
              <span className="text-brand-purple font-medium">SoDEX Router Integration</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-gray-500">Throughput</span>
              <span className="text-brand-purple font-medium">Sub-second Gemini Inference</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-500">Settlement</span>
              <span className="text-brand-purple font-medium">ValueChain Finality</span>
            </div>
          </div>

          {negatives.map((text, i) => (
            <div 
              key={i}
              className="flex items-center bg-white rounded-[18px]"
              style={{
                padding: 'clamp(12px, 0.97vw, 16px) clamp(14px, 1.25vw, 20px)',
                boxShadow: '0 3px 9.1px #3f4a7e0d, 0 1px 29px #3f4a7e1a',
                color: 'rgb(131, 121, 158)',
                fontSize: 'clamp(13px, 1.15vw, 17px)',
                gap: 12
              }}
            >
              <img 
                src="https://cdn.prod.website-files.com/6720dd1ab6df0da205830ab1/686cc0f520a992816d8b15dc_bullet-list-cross.svg" 
                alt="cross"
                style={{ width: 'clamp(16px, 1.25vw, 20px)' }}
              />
              <p className="leading-snug">{text}</p>
            </div>
          ))}
        </div>

        {/* Center Column - Circular Video */}
        <div className="flex justify-center w-full order-first lg:order-none mb-8 lg:mb-0">
          <div 
            className="relative rounded-full overflow-hidden shrink-0"
            style={{
              width: 'clamp(200px, 22vw, 400px)',
              height: 'clamp(200px, 22vw, 400px)'
            }}
          >
            <HlsVideo />
          </div>
        </div>

        {/* Right Column - Positives */}
        <div className="flex flex-col w-full" style={{ gap: 12 }}>
          {positives.map((text, i) => (
            <div 
              key={i}
              className="flex items-center bg-white rounded-[18px]"
              style={{
                padding: 'clamp(12px, 0.97vw, 16px) clamp(14px, 1.25vw, 20px)',
                boxShadow: '0 3px 9.1px #3f4a7e0d, 0 1px 29px #3f4a7e1a',
                color: 'rgb(26, 11, 84)',
                fontSize: 'clamp(13px, 1.15vw, 17px)',
                gap: 12
              }}
            >
              <img 
                src="https://cdn.prod.website-files.com/6720dd1ab6df0da205830ab1/686cc068490683bbb3377d04_bullet-list.svg" 
                alt="check"
                style={{ width: 'clamp(16px, 1.25vw, 20px)' }}
              />
              <p className="leading-snug">{text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FreedomSection;
