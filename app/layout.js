import { Geist, Geist_Mono } from "next/font/google";
import { VT323 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  subsets: ["latin"],
});

export const metadata = {
  title: "AVALON 2026 | Enter the Grid",
  description: "Official Techfest of Terna Engineering College. February 2026.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${vt323.variable} ${geistSans.variable} ${geistMono.variable} font-vt323 antialiased relative`}
      >
        {/* 🔹 NOISE BACKGROUND */}
        <div className="noise-background-fixed pointer-events-none" />
        <div className="crt-overlay" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
