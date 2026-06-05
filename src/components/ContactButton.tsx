import React from 'react';

const ContactButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button 
      onClick={onClick} 
      className="relative inline-flex items-center justify-center rounded-xl p-px bg-gradient-a group w-full"
    >
      <span className="relative rounded-[11px] px-7 py-3 text-base text-white overflow-hidden w-full h-full flex items-center justify-center bg-brand-blue">
        {/* Gradient hover layer */}
        <span className="absolute inset-0 w-full h-full bg-gradient-a opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="relative z-10">Launch App</span>
      </span>
    </button>
  );
};

export default ContactButton;
