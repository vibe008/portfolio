"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function FullScreenSection({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      transition={{ duration: 1.8, delay: 2.7, ease: "easeInOut" }}
      className="h-screen w-full"
    >
      {children}
    </motion.div>
  );
}
