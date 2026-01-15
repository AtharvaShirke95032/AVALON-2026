import HeroScroll from "@/components/heroscroll";
import Navbar from "@/components/navbar";
import Image from "next/image";
export default function Home() {
  return (
  <div className="relative z-10 text-white">
    <div className="relative w-full">
      <HeroScroll/>
    </div>
  </div>
    
  );
}