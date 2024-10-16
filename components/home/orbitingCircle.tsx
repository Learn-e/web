import { Baby, Briefcase, Gamepad2, Timer } from "lucide-react";
import OrbitingCircles from "../magicui/orbiting-circles";

export default function OrbitingCircle() {
  return (
    <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
      <span className="py-4 font-semibold leading-none text-center text-transparent whitespace-pre-wrap pointer-events-none bg-gradient-to-b from-black to-gray-300 bg-clip-text text-8xl dark:from-white dark:to-black">
        Équilibre
      </span>

      {/* Inner Circles */}
      <OrbitingCircles
        className="size-[45px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={120}
      >
        <Briefcase size={72} />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[45px] border-none bg-transparent"
        duration={20}
        delay={10}
        radius={120}
      >
        <Baby size={72} />
      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={240}
        duration={20}
        reverse
      >
        <Timer size={72} />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={240}
        duration={20}
        delay={20}
        reverse
      >
        <Gamepad2 size={72} />
      </OrbitingCircles>
    </div>
  );
}
