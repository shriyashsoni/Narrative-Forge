import React from 'react';
import ServiceCard from './ServiceCard';

const createIcon = (filledRadius: number) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke="rgb(200,111,255)" strokeWidth="1.5" />
    {filledRadius > 0 && (
      <circle cx="8" cy="8" r={filledRadius} fill="rgb(200,111,255)" transform="matrix(-1 0 0 1 16 0)" />
    )}
  </svg>
);

const TrustedSection = () => {
  const cards = [
    {
      label: "SoSoValue Data",
      icon: createIcon(0),
      title: "Parse raw news\ninto structured signals instantly.",
      bullets: ["Hot News ingestion", "Sector momentum tracking"]
    },
    {
      label: "Gemini AI",
      icon: createIcon(2),
      title: "Synthesize noise\ninto actionable market narratives.",
      bullets: ["Prompt-engineered parsing", "Contextual insight generation"]
    },
    {
      label: "SSI Protocol",
      icon: createIcon(3),
      title: "Publish indexes\non-chain with cryptographic proof.",
      bullets: ["10000 basis point weighting", "Verifiable transaction hashes"]
    },
    {
      label: "SoDEX Execution",
      icon: createIcon(4),
      title: "Execute market trades\nautomatically on the DEX.",
      bullets: ["EIP-712 structured signing", "Seamless testnet deployment"]
    }
  ];

  return (
    <section 
      className="relative flex flex-col items-center"
      style={{
        backgroundImage: 'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260418_120332_3b24257a-afe6-48ca-875f-78147370f403.png&w=1280&q=85")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 'clamp(100px, 12vw, 180px) clamp(16px, 4vw, 40px) clamp(100px, 12vw, 160px)',
        gap: '110px'
      }}
    >
      {/* Header Block */}
      <div className="flex flex-col items-center text-center max-w-[1200px]" style={{ gap: '20px' }}>
        <h2 
          className="text-white font-medium"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.2 }}
        >
          Powered by real-time data <br />
          <span className="bg-gradient-b bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent' }}>
            from intelligence to execution.
          </span>
        </h2>
        <p 
          className="max-w-3xl"
          style={{ 
            color: 'rgb(189, 174, 231)', 
            fontSize: 'clamp(14px, 1.25vw, 18px)' 
          }}
        >
          Built for algorithmic trading clarity in volatile markets. Proven through verifiable smart contract validation.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-[1400px] z-10" style={{ gap: '12px' }}>
        {cards.map((card, idx) => (
          <ServiceCard key={idx} {...card} />
        ))}
      </div>

      {/* Bottom Fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{
          height: '180px',
          background: 'linear-gradient(to bottom, transparent, rgb(255,255,255))'
        }}
      />
    </section>
  );
};

export default TrustedSection;
