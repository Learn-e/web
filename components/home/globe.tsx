"use client";
import React from "react";
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

  const colors = ["#FFFFFF"];

  return (
    <div className="flex flex-row items-center justify-center relative w-full">
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
        <div className="absolute w-full bottom-0 inset-x-0 bg-gradient-to-b pointer-events-none select-none z-40" />
        <div className="absolute w-full h-80 md:h-full z-10">
          <World data={[]} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
}
