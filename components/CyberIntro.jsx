"use client";

import React, { useState, useEffect } from 'react';

const CyberIntro = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [text, setText] = useState('BOOTING_AVALON_2026...');

    useEffect(() => {
        const timer1 = setTimeout(() => setText('BYPASSING_SECURITY_PROTOCOLS...'), 1000);
        const timer2 = setTimeout(() => setText('ACCESS_GRANTED // WELLCOME_TO_THE_GRID'), 2000);
        const timer3 = setTimeout(() => setIsVisible(false), 3500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-8 font-vt323">
            <div className="relative">
                <div className="text-4xl md:text-6xl text-cyber-yellow glitch-text leading-tight mb-4" data-text={text}>
                    {text}
                </div>
                <div className="w-full h-1 bg-cyber-pink shadow-[0_0_15px_#ff003c] animate-pulse"></div>
            </div>

            <div className="absolute bottom-10 left-10 text-[10px] text-cyber-cyan opacity-50 space-y-1">
                <p>STATUS: INITIALIZING...</p>
                <p>UPLINK: ACTIVE</p>
                <p>ENCRYPTION: 256-BIT_AES</p>
            </div>
        </div>
    );
};

export default CyberIntro;
