"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import CyberpunkButton from './ui/CyberpunkButton';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const EventCard = ({ title, date, prizePool, registration, description, image, link, onRegister }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="cyber-box group overflow-hidden flex flex-col h-full bg-black/60 backdrop-blur-sm border-cyber-cyan/30 hover:border-cyber-cyan transition-all duration-500"
        >
            <div className="relative h-48 w-full overflow-hidden" style={{ transform: "translateZ(50px)" }}>
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyber-cyan z-20"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyber-pink z-20"></div>

                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-2 opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4 px-2 py-1 bg-cyber-pink/20 border border-cyber-pink text-cyber-pink font-bold text-[10px] tracking-widest uppercase">
                    {date}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1 relative" style={{ transform: "translateZ(30px)" }}>
                <h3 className="text-2xl font-black text-cyber-yellow mb-1 glitch-text tracking-tighter uppercase" data-text={title}>{title}</h3>
                <div className="flex items-center gap-2 mb-3">
                    <div className="h-[1px] flex-1 bg-cyber-cyan/30"></div>
                    <span className="text-[10px] text-cyber-cyan font-bold tracking-[0.2em]">PRIZE: ₹{prizePool}</span>
                    <div className="h-[1px] flex-1 bg-cyber-cyan/30"></div>
                </div>

                <p className="text-white/80 text-sm leading-relaxed mb-6 font-sans opacity-100 group-hover:text-white transition-colors duration-300">
                    {description}
                </p>

                <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-white/40 uppercase">Registration</span>
                        <span className="text-xs text-cyber-pink font-bold">{registration}</span>
                    </div>
                    {link ? (
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <CyberpunkButton color="cyan" className="text-[10px] py-1 px-4 leading-none">Initialize</CyberpunkButton>
                        </a>
                    ) : (
                        <CyberpunkButton onClick={onRegister} color="cyan" className="text-[10px] py-1 px-4 leading-none">Initialize</CyberpunkButton>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const EventSection = ({ onRegisterClick }) => {
    const events = [
        {
            title: "INNOV8 4.0",
            date: "10-11 FEB 2026",
            prizePool: "60,000",
            registration: "HACKATHON",
            description: "AVALON's flagship 24-hour hackathon. Bring your coding skills, ideas, and adrenaline for an epic journey into the world of tech.",
            image: "/assets/uploaded_image_1_1768972872857.jpg",
            link: "https://innov-77.devfolio.co/overview"
        },
        {
            title: "ROBO SOCCER",
            date: "9 FEB 2026",
            prizePool: "16,000",
            registration: "₹300 PER TEAM",
            description: "Fast-paced robotics challenge where engineering meets intelligent gameplay. Robots must dribble, pass, and shoot goals in a dynamic arena.",
            image: "/assets/uploaded_image_0_1768974001562.jpg",
            onRegister: () => onRegisterClick("ROBO SOCCER")
        },
        {
            title: "REVERSE CODING",
            date: "9 FEB 2026",
            prizePool: "8,000",
            registration: "₹250 PER TEAM",
            description: "Think backwards. Code smarter. Reverse-engineer program outputs to deduce the underlying algorithm and write the correct code.",
            image: "/assets/uploaded_image_1_1768974001562.jpg",
            onRegister: () => onRegisterClick("REVERSE CODING")
        },
        {
            title: "ROBO RACE",
            date: "9 FEB 2026",
            prizePool: "16,000",
            registration: "₹150 INDIVIDUAL",
            description: "Design. Drive. Conquer. A thrilling robotics competition testing speed, precision, and control on a challenging track.",
            image: "/assets/uploaded_image_3_1768972872857.jpg",
            onRegister: () => onRegisterClick("ROBO RACE")
        },
        {
            title: "CAD COMP",
            date: "10 FEB 2026",
            prizePool: "4,000",
            registration: "₹150 INDIVIDUAL",
            description: "Technical design challenge to create accurate and innovative digital models using computer-aided design tools.",
            image: "/assets/uploaded_image_2_1768974001562.jpg",
            onRegister: () => onRegisterClick("CAD COMPETITION")
        },
        {
            title: "PAPERWEIGHT",
            date: "10 FEB 2026",
            prizePool: "4,000",
            registration: "₹200 PER TEAM",
            description: "Imagine. Design. Impress. Transform simple everyday objects into innovative, visually appealing, and practical products.",
            image: "/assets/uploaded_image_3_1768974001562.jpg",
            onRegister: () => onRegisterClick("INNOVATIVE PAPERWEIGHT")
        }
    ];

    return (
        <section id="events" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col items-center mb-20 text-center">
                <span className="text-cyber-cyan text-sm tracking-[0.5em] uppercase mb-2 animate-pulse">// SYSTEM MISSIONS //</span>
                <h2 className="text-6xl md:text-8xl font-black mb-4 glitch-text leading-none" data-text="FIELD OPERATIONS">FIELD OPERATIONS</h2>
                <div className="w-24 h-1 bg-cyber-pink shadow-[0_0_15px_#ff003c]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event, index) => (
                    <EventCard key={index} {...event} />
                ))}
            </div>
        </section>
    );
};

export default EventSection;
