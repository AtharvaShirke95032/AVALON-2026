"use client";

import React from 'react';

const CyberpunkButton = ({ children, onClick, className = "", color = "cyan" }) => {
  const colorMap = {
    cyan: "border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/20 hover:shadow-[0_0_20px_#00f0ff]",
    yellow: "border-cyber-yellow text-cyber-yellow hover:bg-cyber-yellow/20 hover:shadow-[0_0_20px_#fcee0a]",
    pink: "border-cyber-pink text-cyber-pink hover:bg-cyber-pink/20 hover:shadow-[0_0_20px_#ff003c]",
  };

  return (
    <button
      onClick={onClick}
      className={`relative px-8 py-3 font-bold uppercase tracking-widest border-2 transition-all duration-300 clip-path-cyber ${colorMap[color]} ${className}`}
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)"
      }}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-current" style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}></div>
    </button>
  );
};

export default CyberpunkButton;
