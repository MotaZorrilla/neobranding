"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const beams = [
    {
      initial: { x: 0, y: 0 },
      animate: {
        x: [0, 100, 0, -100, 0],
        y: [0, 50, 0, -50, 0],
      },
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      },
      color: "from-purple-500/20 via-transparent to-transparent",
    },
    {
        initial: { x: 0, y: 0 },
        animate: {
          x: [0, -80, 0, 80, 0],
          y: [0, -40, 0, 40, 0],
        },
        transition: {
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 2
        },
        color: "from-blue-500/20 via-transparent to-transparent",
      },
  ];

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
       {/* Radial Gradient overlay for depth */}
       <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
       
       {beams.map((beam, idx) => (
           <motion.div
            key={idx}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r ${beam.color} blur-[120px] opacity-40`}
            initial={beam.initial}
            animate={beam.animate}
            transition={beam.transition}
           />
       ))}
       
       {/* Grid Pattern */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
    </div>
  );
};

// Simple utility if @/utils/cn doesn't exist yet
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
