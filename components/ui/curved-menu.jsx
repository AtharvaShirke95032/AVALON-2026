"use client";;
import React, {useState, useRef} from "react";

import {motion, useMotionValue, AnimatePresence} from "framer-motion";
import Link from "next/link";
import {Linkedin, Github, Dribbble, Figma} from "lucide-react";

const MENU_SLIDE_ANIMATION = {
	initial: {x: "calc(100% + 100px)"},
	enter: {x: "0", transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1]}},
	exit: {
		x: "calc(100% + 100px)",
		transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1]},
	},
};

const defaultNavItems = [
	{
		heading: "Home",
		href: "/",
		subheading: "Welcome to our website",
		imgSrc: "/images/home.jpg",
	},
	{
		heading: "Components",
		href: "/components",
		subheading: "View our components",
		imgSrc: "/images/about.jpg",
	},
	{
		heading: "Services",
		href: "/services",
		subheading: "What we offer",
		imgSrc: "/images/services.jpg",
	},
	{
		heading: "Contact",
		href: "/contact",
		subheading: "Get in touch with us",
		imgSrc: "/images/contact.jpg",
	},
];

const CustomFooter = () => {
	return (
        <div
            className="flex w-full text-sm justify-between text-white px-10 md:px-24 py-5">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
				<Linkedin size={24} />
			</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
				<Github size={24} />
			</a>
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">
				<Dribbble size={24} />
			</a>
            <a href="https://www.figma.com" target="_blank" rel="noopener noreferrer">
				<Figma size={24} />
			</a>
            <a href="https://www.figma.com" target="_blank" rel="noopener noreferrer">
				<Figma size={24} />
			</a>
        </div>
    );
};

const NavLink = ({
	heading,
	href,
	setIsActive,
	index,
}) => {
	const ref = useRef(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const handleMouseMove = (
		e,
	) => {
		const rect = ref.current.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		x.set(mouseX / rect.width - 0.5);
		y.set(mouseY / rect.height - 0.5);
	};

	const handleClick = () => {
		return setIsActive(false);
	};

	const isExternalLink = index === 4 || index === 3;
	const linkProps = isExternalLink
		? {target: "_blank", rel: "noopener noreferrer"}
		: {};

	return (
        <motion.div
            onClick={handleClick}
            initial="initial"
            whileHover="whileHover"
            className="group relative flex items-center justify-between border-b border-white/30 py-4 transition-colors duration-500 md:py-8 uppercase"
            {...linkProps}>
            <Link ref={ref} onMouseMove={handleMouseMove} href={href}>
				<div className="relative flex items-start">
					<span
                        className="text-white transition-colors duration-500  text-5xl font-thin mr-2">
						{index}.
					</span>
					<div className="flex flex-row gap-2">
						<motion.span
                            variants={{
								initial: {x: 0},
								whileHover: {x: -16},
							}}
                            transition={{
								type: "spring",
								staggerChildren: 0.075,
								delayChildren: 0.25,
							}}
                            className="relative z-10 block text-5xl font-extralight text-white transition-colors duration-500  md:text-6xl">
							{heading.split("").map((letter, i) => {
								return (
                                    <motion.span
                                        key={i}
                                        variants={{
											initial: {x: 0},
											whileHover: {x: 16},
										}}
                                        transition={{type: "spring"}}
                                        className="inline-block">
                                        {letter}
                                    </motion.span>
                                );
							})}
						</motion.span>
					</div>
				</div>
			</Link>
        </motion.div>
    );
};

const Curve = () => {
	const initialPath = `M100 0 L200 0 L200 ${window.innerHeight} L100 ${window.innerHeight} Q-100 ${window.innerHeight / 2} 100 0`;
	const targetPath = `M100 0 L200 0 L200 ${window.innerHeight} L100 ${window.innerHeight} Q100 ${window.innerHeight / 2} 100 0`;

	const curve = {
		initial: {d: initialPath},
		enter: {
			d: targetPath,
			transition: {duration: 1, ease: [0.76, 0, 0.24, 1]},
		},
		exit: {
			d: initialPath,
			transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1]},
		},
	};

	return (
        <svg
            className="absolute top-0 -left-[99px] w-[100px] stroke-none h-full"
            style={{fill: "#000000"}}>
            <motion.path variants={curve} initial="initial" animate="enter" exit="exit" />
        </svg>
    );
};

const CurvedNavbar = ({setIsActive, navItems, footer}) => {
	return (
        <motion.div
            variants={MENU_SLIDE_ANIMATION}
            initial="initial"
            animate="enter"
            exit="exit"
            className="h-dvh w-screen max-w-screen-sm fixed right-0 top-0 z-40 bg-black">
            <div className="h-full pt-11 flex flex-col justify-between">
				<div className="flex flex-col text-5xl gap-3 mt-0 px-10 md:px-24">
					<div className="text-white border-b border-white/30 uppercase text-sm mb-0">
						<p>Navigation</p>
					</div>
					<section className="bg-transparent mt-0">
						<div className="mx-auto max-w-7xl">
							{navItems.map((item, index) => {
								return (<NavLink key={item.href} {...item} setIsActive={setIsActive} index={index + 1} />);
							})}
						</div>
					</section>
				</div>
				{footer}
			</div>
            <Curve />
        </motion.div>
    );
};

const DesktopNavbar = ({navItems}) => {
	return (
		<nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 items-center justify-between px-8 md:px-12 lg:px-24 py-6">
			<div className="text-white text-3xl font-semibold">
				Avalon
			</div>
			<ul className="flex items-center gap-6 lg:gap-8">
				{navItems.map((item) => (
					<li key={item.href}>
						<Link 
							href={item.href}
							className="text-white hover:text-white/80 transition-colors duration-300 uppercase text-xl font-light"
						>
							{item.heading}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

const Header = ({
	navItems = defaultNavItems,
	footer = <CustomFooter />,
}) => {
	const [isActive, setIsActive] = useState(false);
	const openAudioRef = useRef(null);
	const closeAudioRef = useRef(null);

	const handleClick = () => {
		if (isActive) {
			closeAudioRef.current?.play();
		} else {
			openAudioRef.current?.play();
		}
		setIsActive(!isActive);
	};

	return (
        <>
			{/* Desktop Navbar */}
			<DesktopNavbar navItems={navItems} />
			
			{/* Mobile Hamburger Menu */}
            <div className="relative md:hidden">
				<div
                    onClick={handleClick}
                    className="fixed -right-1 top-0 m-5 z-50 w-12 h-12 rounded-none flex items-center justify-center cursor-pointer bg-transparent">
					<div className="relative w-8 h-6 flex flex-col justify-between items-center">
						<span
                            className={`block h-1 w-7 bg-white transition-transform duration-300 ${isActive ? "rotate-45 translate-y-2" : ""}`}></span>
						<span
                            className={`block h-1 w-7 bg-white transition-opacity duration-300 ${isActive ? "opacity-0" : ""}`}></span>
						<span
                            className={`block h-1 w-7 bg-white transition-transform duration-300 ${isActive ? "-rotate-45 -translate-y-3" : ""}`}></span>
					</div>
				</div>
			</div>
            <AnimatePresence mode="wait">
				{isActive && (
					<CurvedNavbar setIsActive={setIsActive} navItems={navItems} footer={footer} />
				)}
			</AnimatePresence>
        </>
    );
};

export default Header;
