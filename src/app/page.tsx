"use client";
import { useEffect, useState, useRef } from "react";
import Home from "../screens/Home";
import About from "../screens/About";
import MyWork from "../screens/Mywork";
import Contact from "../screens/Contact";
import Image from "next/image";
import { motion } from "framer-motion";
import MinionwithTorch from "../../public/MinionsImg/minionfall.jpg";
export default function App() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const myWorkRef = useRef<{ isAtStart: boolean; isAtEnd: boolean }>({
    isAtStart: true,
    isAtEnd: false,
  });

  const [currentSection, setCurrentSection] = useState<number>(0);
  const [animateOut, setAnimateOut] = useState<boolean>(false);
  const isScrolling = useRef<boolean>(false);

  const scrollToSection = (index: number) => {
    const section = sectionsRef.current[index];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ✅ Shared logic to scroll
  const goToSection = (next: number) => {
    if (isScrolling.current || next === currentSection) return;

    isScrolling.current = true;

    if (currentSection === 0) {
      setAnimateOut(true);
      setTimeout(() => {
        setCurrentSection(next);
        scrollToSection(next);
        isScrolling.current = false;
      }, 1500);
    } else if (next === 0) {
      setAnimateOut(false);
      setCurrentSection(next);
      scrollToSection(next);
      isScrolling.current = false;
    } else {
      setCurrentSection(next);
      scrollToSection(next);
      setTimeout(() => {
        isScrolling.current = false;
      }, 1500);
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      console.log("e",e)
      if (isScrolling.current) return;

      let next = currentSection;

      if (currentSection === 2) {
        const { isAtStart, isAtEnd } = myWorkRef.current;
        if (e.deltaY < 0 && !isAtStart) return;
        if (e.deltaY > 0 && !isAtEnd) return;
      }

      if (e.deltaY > 0 && currentSection < 3) {
        next = currentSection + 1;
      } else if (e.deltaY < 0 && currentSection > 0) {
        next = currentSection - 1;
      }

      goToSection(next);
    };

    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (isScrolling.current) return;

      const deltaY = touchStartY - touchEndY;
      if (Math.abs(deltaY) < 50) return;

      let next = currentSection;

      if (currentSection === 2) {
        const { isAtStart, isAtEnd } = myWorkRef.current;
        if (deltaY < 0 && !isAtStart) return;
        if (deltaY > 0 && !isAtEnd) return;
      }

      if (deltaY > 0 && currentSection < 3) {
        next = currentSection + 1;
      } else if (deltaY < 0 && currentSection > 0) {
        next = currentSection - 1;
      }

      goToSection(next);
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSection]);

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* <Navbar goToSection={goToSection}/> */}
      <div
        ref={(el) => {
          sectionsRef.current[0] = el;
        }}
        className="h-[200vh] w-full bg-[#ffdb03] "
      >
        <Home animateOut={animateOut}  goToSection={goToSection}/>
        <div className="bg-[#ffdb03]">
          <Image
            className="w-screen h-screen object-contain"
            src={MinionwithTorch}
            alt="MinionwithTorch"
          />
        </div>
      </div>
      <div
        ref={(el) => {
          sectionsRef.current[1] = el;
        }}
        className="h-[100%] w-full "
      >
        <About />
      </div>
      <div
        ref={(el) => {
          sectionsRef.current[2] = el;
        }}
        className="h-[200vh] w-full relative"
      >
        <MyWork ref={myWorkRef} />
        <div
          onClick={() => goToSection(currentSection + 1)}
          className=" w-10 h-20 rounded-full border-4 border-yellow-200 flex sm:flex md:flex lg:hidden justify-center z-[10] absolute bottom-5 left-[50%] items-center cursor-pointer  "
        >
            <motion.div
              className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-400 to-yellow-50 absolute bottom-0 "
              animate={{
                y: [0, -25, 0], 
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
        </div>
      </div>

      <div
        ref={(el) => {
          sectionsRef.current[3] = el;
        }}
        className="h-screen w-full"
      >
        <Contact />
      </div>
    </div>
  );
}
