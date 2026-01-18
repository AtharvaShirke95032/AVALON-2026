import HeroScroll from "@/components/heroscroll";
import Navbar from "@/components/navbar";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <div className="relative z-10 text-white">
      <div>

      <HeroScroll />
      </div>
      <div className="p-5">
      <ScrollReveal
  baseOpacity={0}
  enableBlur={true}
  baseRotation={0}
  blurStrength={20}
  
>
  When does a man die? When he is hit by a bullet? No! When he suffers a disease?
  No! When he ate a soup made out of a poisonous mushroom?
  No! A man dies when he is forgotten!
</ScrollReveal>
      </div>
      
    </div>
    
  );
}