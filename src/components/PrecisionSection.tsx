import React from 'react';

const pillars = [
  { label: 'Analyzes', left: '2.8vw', bottom: '7vw', items: ['SoSoValue', 'Hot News', 'Sectors', 'Momentum'] },
  { label: 'Synthesizes', left: '22.4vw', bottom: '9.08vw', items: ['Gemini 1.5', 'Themes', 'Tokens', 'Weights'] },
  { label: 'Publishes', left: '41.2vw', bottom: '11.16vw', items: ['ValueChain', 'SSI Protocol', 'Explorer', 'Hashes'] },
  { label: 'Executes', left: '61.1vw', bottom: '13.24vw', items: ['SoDEX API', 'EIP-712', 'Nonces', 'Orders'] }
];

const PrecisionSection = () => {
  return (
    <section 
      className="flex flex-col items-center text-center"
      style={{
        backgroundImage: 'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260418_125638_553b96dc-a1fd-4b2b-81a9-ed7daa80006e.png&w=1280&q=85")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: 'clamp(48px, 8vw, 120px) clamp(16px, 4vw, 60px) clamp(48px, 5.56vw, 80px)',
        gap: 'clamp(32px, 4vw, 56px)'
      }}
    >
      {/* Header */}
      <div className="flex flex-col items-center" style={{ gap: 22 }}>
        {/* Chip */}
        <div 
          className="flex items-center gap-2 rounded-full font-medium"
          style={{
            backgroundColor: 'rgb(249, 249, 249)',
            padding: 'clamp(8px, 0.9vw, 14px) clamp(12px, 1.25vw, 20px)',
            color: 'rgb(26, 11, 84)',
            fontSize: 'clamp(14px, 1.1vw, 18px)'
          }}
        >
          <svg width="19" height="18" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8.5" cy="8" r="7" stroke="#c86fff" strokeWidth="1.5" />
            <rect x="7.5" y="0" width="2" height="3" fill="rgb(200,111,255)" />
            <rect x="7.5" y="13" width="2" height="3" fill="rgb(200,111,255)" />
            <rect x="0" y="7" width="3" height="2" fill="rgb(200,111,255)" />
            <rect x="14" y="7" width="3" height="2" fill="rgb(200,111,255)" />
          </svg>
          Autonomous Pipeline
        </div>

        <h2 
          className="font-medium text-brand-navy max-w-[900px]"
          style={{
            fontSize: 'clamp(28px, 4vw, 56px)',
            lineHeight: 1.15
          }}
        >
          <span className="block sm:whitespace-nowrap">One autonomous Web3 pipeline.</span>
          <span className="block bg-gradient-b bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent', paddingBottom: '0.3vw' }}>
            Executing algorithmic alpha.
          </span>
        </h2>

        <p 
          className="max-w-2xl"
          style={{
            color: 'rgb(169, 151, 206)',
            fontSize: 'clamp(15px, 1.2vw, 20px)'
          }}
        >
          NarrativeForge scrapes SoSoValue, triggers Gemini inference, signs via EIP-712, and settles trades instantly on the SoDEX Router.
        </p>
      </div>

      {/* Desktop Staircase */}
      <div 
        className="hidden sm:block relative w-full text-brand-navy"
        style={{
          maxWidth: '82.292vw',
          width: '82.292vw',
          height: '31.94vw'
        }}
      >
        {pillars.map((pillar, i) => (
          <div 
            key={i} 
            className="absolute flex flex-col items-center"
            style={{ left: pillar.left, bottom: pillar.bottom }}
          >
            {/* Chip */}
            <div 
              className="flex items-center font-medium rounded-[20px]"
              style={{
                background: 'linear-gradient(135deg, rgb(255,255,255), rgba(255,255,255,0.6))',
                padding: '0.972vw 1.736vw',
                fontSize: 18,
                gap: 8,
                zIndex: 2
              }}
            >
              <img 
                src="https://cdn.prod.website-files.com/6720dd1ab6df0da205830ab1/6870f623cf3df417ce45df05_icon%20logo%20eternacloud.png" 
                alt="logo" 
                style={{ width: '1.111vw' }} 
              />
              {pillar.label}
            </div>

            {/* Vertical Line Container */}
            <div className="relative flex flex-col mt-2">
              <div 
                style={{
                  width: '1px',
                  height: '14.24vw',
                  background: 'linear-gradient(to bottom, rgb(28,78,255), rgb(254,136,27) 0%, rgb(172,36,255) 25%, rgb(247,159,255) 50%, rgb(255,214,0) 66%, rgb(254,136,27) 84%, rgba(254,136,27,0) 102%)'
                }}
              />
              
              {/* Items */}
              <div 
                className="absolute flex flex-col"
                style={{
                  top: '0.56vw',
                  left: '1.94vw',
                  gap: '4px',
                  fontSize: 16
                }}
              >
                {pillar.items.map((item, idx) => (
                  <div key={idx} className="whitespace-nowrap text-left" style={{ padding: '0.69vw 1.04vw' }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden flex flex-col w-full px-4" style={{ gap: 40 }}>
        {pillars.map((pillar, i) => {
          const isRight = i % 2 !== 0;
          return (
            <div key={i} className={`flex flex-col w-full ${isRight ? 'items-end' : 'items-start'}`}>
              <div 
                className="flex items-center font-medium rounded-[20px]"
                style={{
                  background: 'linear-gradient(135deg, rgb(255,255,255), rgba(255,255,255,0.6))',
                  padding: '10px 18px',
                  fontSize: 15,
                  gap: 8,
                  zIndex: 2,
                  color: 'rgb(26, 11, 84)'
                }}
              >
                <img 
                  src="https://cdn.prod.website-files.com/6720dd1ab6df0da205830ab1/6870f623cf3df417ce45df05_icon%20logo%20eternacloud.png" 
                  alt="logo" 
                  style={{ width: 16 }} 
                />
                {pillar.label}
              </div>

              <div className={`flex mt-2 ${isRight ? 'flex-row-reverse text-right' : 'flex-row text-left'}`} style={{ gap: 16 }}>
                <div 
                  style={{
                    width: '1px',
                    minHeight: '120px',
                    background: 'linear-gradient(to bottom, rgb(28,78,255), rgb(254,136,27) 0%, rgb(172,36,255) 25%, rgb(247,159,255) 50%, rgb(255,214,0) 66%, rgb(254,136,27) 84%, rgba(254,136,27,0) 102%)'
                  }}
                />
                <div className="flex flex-col py-2" style={{ gap: 8 }}>
                  {pillar.items.map((item, idx) => (
                    <div key={idx} style={{ fontSize: 14, color: 'rgb(100, 80, 160)', padding: '8px 0' }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default PrecisionSection;
