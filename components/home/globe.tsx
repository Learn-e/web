"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const World = dynamic(() => import("../ui/globe").then((m) => m.World), {
  ssr: false,
});

export function Globe() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#1c1c1c",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#2e2e2e",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#FFFFFF",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  return (
    <div className="relative flex flex-row items-center justify-center w-full">
      <div className="mx-auto w-full relative overflow-hidden h-full md:h-[40rem]">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        ></motion.div>
        <div className="absolute inset-x-0 bottom-0 z-40 w-full pointer-events-none select-none bg-gradient-to-b" />
        <div className="absolute z-10 w-full h-80 md:h-full">
          <World data={[]} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
}
