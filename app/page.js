import Image from "next/image";

export default function Home() {
  return (
    <div className="relative h-screen w-full">
     
     <Image
     src="/back4.png"
     alt="background"
     fill
     priority
     className="object-cover object-top"
     />
    </div>
    
  );
}
