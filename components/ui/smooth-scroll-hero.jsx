"use client";;
import * as React from "react";
import { useEffect } from "react";

import {
	motion,
	useMotionTemplate,
	useScroll,
	useTransform,
} from "framer-motion";
import FuzzyText from "@/components/FuzzyText";

const SmoothScrollHeroBackground = ({
	scrollHeight,
	desktopImage,
	mobileImage,
	initialClipPercentage,
	finalClipPercentage,
}) => {
	const {scrollY} = useScroll();

	const clipStart = useTransform(scrollY, [0, scrollHeight], [initialClipPercentage, 0]);
	const clipEnd = useTransform(scrollY, [0, scrollHeight], [finalClipPercentage, 100]);

	const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

	const backgroundSize = useTransform(scrollY, [0, scrollHeight + 500], ["170%", "100%"]);
	
	// Text and button opacity - appear as user scrolls
	const textOpacity = useTransform(scrollY, [scrollHeight * 0.3, scrollHeight * 0.7], [0, 1]);
	const textY = useTransform(scrollY, [scrollHeight * 0.3, scrollHeight * 0.7], [30, 0]);

	return (
        <motion.div
            className="sticky top-0 h-screen w-full bg-black"
            style={{
				clipPath,
				willChange: "transform, opacity",
			}}>
            {/* Mobile background */}
            <motion.div
                className="absolute inset-0 md:hidden"
                style={{
					backgroundImage: `url(${mobileImage})`,
					backgroundSize,
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}} />
            {/* Desktop background */}
            <motion.div
                className="absolute inset-0 hidden md:block"
                style={{
					backgroundImage: `url(${desktopImage})`,
					backgroundSize,
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}} />
            
            {/* Text and Button Content */}
            <motion.div
                className="absolute inset-0 flex flex-col items-center justify-end pb-32 md:pb-40 z-10 px-4"
                style={{
					opacity: textOpacity,
					y: textY,
				}}>
                <motion.h1 
                    className="text-white text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 uppercase tracking-wider"
                    style={{
						textShadow: "2px 2px 8px rgba(0, 0, 0, 0.8)",
					}}>
                    Where Technology Meets Innovation
                </motion.h1>
                <motion.button
                    className="px-8 py-4 bg-white text-black font-bold text-lg uppercase tracking-wider hover:bg-white/90 transition-colors duration-300 mt-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    register now
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

/**
 * A smooth scroll hero component with parallax background effect
 * @param props - Component props
 * @returns React component
 */
const SmoothScrollHero = ({
   scrollHeight = 1500,
   desktopImage = "https://images.unsplash.com/photo-1511884642898-4c92249e20b6",
   mobileImage = "https://images.unsplash.com/photo-1511207538754-e8555f2bc187?q=80&w=2412&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   initialClipPercentage = 25,
   finalClipPercentage = 75,
}) => {
   useEffect(() => {
       // Reset scroll position to top on mount/refresh
       window.scrollTo(0, 0);
   }, []);

   const {scrollY} = useScroll();
   
   // 404 text opacity - disappear as user scrolls
   const error404Opacity = useTransform(scrollY, [0, scrollHeight * 0.5], [1, 0]);
   const error404Scale = useTransform(scrollY, [0, scrollHeight * 0.5], [1, 0.8]);

   return (
       <div
           style={{height: `calc(${scrollHeight}px + 100vh)`}}
           className="relative w-full">
           <SmoothScrollHeroBackground
               scrollHeight={scrollHeight}
               desktopImage={desktopImage}
               mobileImage={mobileImage}
               initialClipPercentage={initialClipPercentage}
               finalClipPercentage={finalClipPercentage} />
           
           {/* Centered Fuzzy Text (outside clipped container) */}
           <motion.div
               className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none w-full px-4 md:px-8"
               style={{
                   opacity: error404Opacity,
                   scale: error404Scale,
               }}>
               <div className="flex items-center justify-center w-full">
                   <FuzzyText
                       baseIntensity={0.2}
                       hoverIntensity={0.5}
                       enableHover={true}
                       fontSize="clamp(3.5rem, 8vw, 8rem)"
                       className="text-center"
                   >
                       EXPLORE THE DIGITAL FRONTIER
                   </FuzzyText>
               </div>
           </motion.div>
       </div>
   );
};
export default SmoothScrollHero;
