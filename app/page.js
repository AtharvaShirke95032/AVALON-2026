"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from "@/components/navbar";
import EventSection from "@/components/EventSection";
import CyberpunkButton from "@/components/ui/CyberpunkButton";
import RegistrationForm from "@/components/RegistrationForm";
import CyberIntro from "@/components/CyberIntro";

export default function Home() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setIsRegisterOpen(true);
  };

  return (
    <main className="min-h-screen bg-black relative overflow-hidden font-vt323 cyber-grid">
      <CyberIntro />
      {/* Scanline Overlay */}
      <div className="scanline-overlay"></div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/uploaded_image_0_1768972872857.jpg"
            alt="AVALON 2026 Poster"
            fill
            className="object-cover opacity-60 scale-105 animate-pulse"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black"></div>
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-7xl md:text-9xl font-black mb-4 tracking-tighter glitch-text" data-text="AVALON 2026">
            AVALON 2026
          </h1>
          <p className="text-xl md:text-2xl text-cyber-cyan mb-8 tracking-widest uppercase">
            // NEXT GEN TECHFEST // TERNA ENGINEERING COLLEGE
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <CyberpunkButton color="yellow" onClick={() => document.getElementById('events').scrollIntoView({ behavior: 'smooth' })}>
              View Operations
            </CyberpunkButton>
            <CyberpunkButton color="pink" onClick={() => handleRegisterClick("GENERAL")}>
              Join the Resistance
            </CyberpunkButton>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 hidden md:block border-l-2 border-cyber-cyan p-4">
          <p className="text-cyber-cyan text-xs">SYSTEM STATUS: ONLINE</p>
          <p className="text-white text-xs opacity-50">LOCATION: NAVI MUMBAI, IN</p>
        </div>
      </section>

      {/* Events Section */}
      <EventSection onRegisterClick={handleRegisterClick} />

      {/* Footer Info */}
      <footer className="py-10 border-t border-white/10 text-center text-xs opacity-50">
        <p>© 2026 AVALON TECHFEST - ENTER THE GRID</p>
      </footer>

      {/* Registration Modal */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsRegisterOpen(false)}></div>
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto cyber-box border-cyber-yellow bg-black p-8">
            <button
              className="absolute top-4 right-4 text-cyber-pink hover:scale-110 transition-transform"
              onClick={() => setIsRegisterOpen(false)}
            >
              [X] CLOSE
            </button>
            <RegistrationForm eventName={selectedEvent} onClose={() => setIsRegisterOpen(false)} />
          </div>
        </div>
      )}
    </main>
  );
}