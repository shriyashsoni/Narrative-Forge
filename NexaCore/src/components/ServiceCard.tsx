import React, { useState } from 'react';

interface ServiceCardProps {
  label: string;
  icon: React.ReactNode;
  title: string;
  bullets: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ label, icon, title, bullets }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex flex-col overflow-hidden rounded-[36px] cursor-pointer group"
      style={{
        backgroundColor: 'rgba(10, 5, 20, 0.88)',
        backdropFilter: 'blur(36px)',
        height: 'clamp(320px, 32vw, 500px)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Layer */}
      <img 
        src="https://cdn.prod.website-files.com/6720dd1ab6df0da205830ab1/682c7cb62b8800a7594c5abd_hover_card_img.png"
        alt=""
        className="absolute top-0 left-0 w-full z-[1] transition-all duration-500 ease-in-out object-cover object-top"
        style={{
          height: '55%',
          transform: isHovered ? 'translateY(0)' : 'translateY(-30%)',
          opacity: isHovered ? 1 : 0.7
        }}
      />

      {/* Bottom Overlay Layer */}
      <div 
        className="absolute bottom-0 left-0 w-full z-[1] transition-all duration-500 ease-in-out"
        style={{
          height: '55%',
          background: 'linear-gradient(to top, rgba(10,5,20,0.95) 60%, transparent)',
          transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
          opacity: isHovered ? 1 : 0
        }}
      />

      {/* Content */}
      <div 
        className="relative z-[2] flex flex-col h-full w-full"
        style={{
          padding: 'clamp(16px, 1.94vw, 32px) clamp(18px, 2.36vw, 36px)'
        }}
      >
        {/* Badge */}
        <div className="flex items-center self-start rounded-full gap-2 transition-all" style={{ backgroundColor: 'rgb(41,31,57)', padding: 'clamp(6px,0.7vw,12px) clamp(10px,1.25vw,20px)' }}>
          <div className="flex items-center justify-center" style={{ minWidth: 14, width: '1.11vw', height: 17 }}>
            {icon}
          </div>
          <span className="text-white text-sm whitespace-nowrap">{label}</span>
        </div>

        <div className="flex-grow" />

        <div className="flex flex-col transition-transform duration-500" style={{ transform: isHovered ? 'translateY(-8px)' : 'translateY(0)' }}>
          {/* Title */}
          <h3 
            className="text-white font-medium leading-snug whitespace-pre-line"
            style={{ fontSize: 'clamp(16px, 1.7vw, 24px)' }}
          >
            {title}
          </h3>

          {/* Bullets */}
          <ul className="flex flex-col mt-4" style={{ gap: 10 }}>
            {bullets.map((bullet, idx) => (
              <li 
                key={idx}
                className="bg-no-repeat leading-tight"
                style={{
                  color: 'rgb(189,174,231)',
                  fontSize: 'clamp(12px, 1vw, 15px)',
                  paddingLeft: 'clamp(22px, 1.8vw, 28px)',
                  backgroundImage: 'url(https://cdn.prod.website-files.com/6720dd1ab6df0da205830ab1/683ef70a24657b10be91ef49_bullet-list.svg)',
                  backgroundSize: '18px',
                  backgroundPosition: '0% 50%'
                }}
              >
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        {/* Learn More Button */}
        <div 
          className="transition-all duration-500 overflow-hidden flex items-center justify-center bg-gradient-a rounded-xl cursor-pointer"
          style={{
            maxHeight: isHovered ? 80 : 0,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
            marginTop: isHovered ? 16 : 0,
            padding: isHovered ? 'clamp(10px, 0.9vw, 14px) 0' : 0,
          }}
        >
          <span className="text-white font-medium" style={{ fontSize: 'clamp(13px, 1.1vw, 16px)' }}>
            Learn more
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
