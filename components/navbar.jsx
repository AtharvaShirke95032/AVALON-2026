"use client";

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-black/50 backdrop-blur-md border-b border-cyber-cyan/30 px-6 py-4 flex justify-between items-center font-vt323">
      <Link href="/" className="text-2xl font-bold text-cyber-yellow glitch-text" data-text="AVALON '26">
        AVALON &apos;26
      </Link>
      <div className="flex gap-8 text-sm tracking-widest uppercase">
        <Link href="/" className="hover:text-cyber-cyan transition-colors font-bold">// HOME</Link>
        <button
          onClick={() => {
            const el = document.getElementById('events');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else window.location.href = '/#events';
          }}
          className="hover:text-cyber-cyan transition-colors cursor-pointer font-bold"
        >
                    // MISSIONS
        </button>
      </div>
    </nav>
  );
};

export default Navbar;