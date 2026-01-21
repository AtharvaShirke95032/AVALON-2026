"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isPointer, setIsPointer] = useState(false);

    const mouseX = useSpring(0, { damping: 20, stiffness: 200 });
    const mouseY = useSpring(0, { damping: 20, stiffness: 200 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            const target = e.target;
            setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
            {/* Main Dot */}
            <motion.div
                style={{ x: mouseX, y: mouseY }}
                className="absolute w-2 h-2 bg-cyber-cyan rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#00f0ff]"
            />

            {/* Outer Ring */}
            <motion.div
                style={{ x: mouseX, y: mouseY }}
                animate={{
                    scale: isPointer ? 1.5 : 1,
                    rotate: isPointer ? 90 : 0
                }}
                className={`absolute w-8 h-8 border border-cyber-cyan/50 -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 ${isPointer ? 'border-cyber-pink' : 'border-cyber-cyan/50'}`}
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1 bg-cyber-cyan"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-1 bg-cyber-cyan"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[1px] bg-cyber-cyan"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-[1px] bg-cyber-cyan"></div>
            </motion.div>

            {/* Trailing Glitch Square */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                }}
                animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.2, 1],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute w-12 h-12 border-[0.5px] border-cyber-pink/20 -translate-x-1/2 -translate-y-1/2 rotate-45"
            />
        </div>
    );
};

export default CustomCursor;
