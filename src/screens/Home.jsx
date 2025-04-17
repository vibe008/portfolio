import React from "react";
import Navbar from "../components/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "../components/Hero";
import FullScreenSection from "../components/FullScreenSection";
function Home({ animateOut ,goToSection }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={animateOut ? { opacity: 0, y: -100 } : { opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className=" h-[100vh] bg-gradient-to-t from-amber-100 to-blue-600"
    >
      <div className=" w-[90%] m-auto h-[100%]">
        <Navbar  goToSection={goToSection}/>
        <Hero  animateOut={animateOut}/>
      </div>
    </motion.div>
  );
}

export default Home;
