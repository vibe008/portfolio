// components/AnimatedCursor.jsx
"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function AnimatedCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const cursorY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX - 15);
      mouseY.set(e.clientY - 15);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <motion.div
    //   className="fixed top-0 left-0 w-[30px] h-[30px] border-[2px] border-yellow-400 rounded-full pointer-events-none z-[9999]"
    className="fixed top-0 left-0 w-[90px] h-[90px] rounded-full pointer-events-none  
    backdrop-blur-[6px] bg-transparent 
    border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
    />
  );
}
