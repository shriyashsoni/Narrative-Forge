import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background Video */}
      <video 
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_115655_b4d9cd77-feed-43cd-a198-af78ebdf1f7a.mp4" 
        autoPlay 
        muted 
        loop 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Bottom fade overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none" 
        style={{ background: 'linear-gradient(to bottom, transparent, #000201)' }} 
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl text-center flex flex-col items-center gap-6">
        <span className="text-lg font-medium bg-gradient-b bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent' }}>
          Decentralized Narrative Trading
        </span>
        <h1 
          className="text-white font-medium leading-tight md:whitespace-nowrap"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
        >
          The First AI-Powered <br className="md:hidden" /> On-Chain Oracle.
        </h1>
        <p 
          className="text-brand-lavender max-w-[600px] mx-auto"
          style={{ fontSize: 'clamp(15px, 1.2vw, 20px)' }}
        >
          NarrativeForge actively monitors global Web3 sentiment via SoSoValue, distilling millions of data points through Google Gemini Flash. We securely route high-conviction trades to the SoDEX Router on Ethereum Sepolia and ValueChain.
        </p>
      </div>
    </section>
  );
};

export default Hero;
