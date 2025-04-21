"use client";
import { useEffect, useState, useRef } from "react";
import Home from "../screens/Home";
import About from "../screens/About";
import MyWork from "../screens/Mywork";
import Contact from "../screens/Contact";
import { motion } from "framer-motion";
import { slide as Menu } from "react-burger-menu";
import insta from "../../public/icon/instagram1.png";
import linkedin from "../../public/icon/linkedin1.png";
import Image from "next/image";
import MinionwithTorch from "../../public/MinionsImg/minionfall.jpg";
import Menuicon from "../../public/icon/menu.png";
import remove from "../../public/icon/remove.png";
import Link from "next/link";
export default function App() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [menuopen, setMenuopen] = useState(false);
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
    setMenuopen(false);
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
      setMenuopen(false);
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
      <Menu
        isOpen={menuopen}
        width={280}
        // onStateChange={( isOpen ) => setMenuopen(isOpen)}
        right
        pageWrapId={"page-wrap"}
        disableOverlayClick
        disableCloseOnEsc
        outerContainerId={"outer-container"}
        elastic
      >
        <div className="bg-white h-full flex items-center justify-center ">
          <div
            className="absolute top-3 left-3 z-10 block sm:block lg:hidden"
            onClick={() => {
              setMenuopen(false);
            }}
          >
            <Image src={remove} alt="Menuicon" height={30} />
          </div>
          <div className=" flex flex-col justify-center items-center h-[20%]">
            <Link
              href="/"
              className="nav-name mr-2 text-[1rem] sm:text-[1.1rem] md:text-[1.5rem] lg:text-[1.1rem]"
            >
              Vivek Bunker
            </Link>
            <ul className="flex ">
              <li className="nav-profile tracking-wide text-[1.3rem] md:text-[1.9rem]">
                UX/UI Designer , Developer
              </li>
            </ul>
          </div>
          <ul className="pt-8 h-[40%] w-[70%] m-auto flex flex-col justify-center items-center ">
            <li className="leading-none tracking-[0.1em] font-[900] intro uppercase text-4xl my-5">
              <button onClick={() => goToSection(2)}>Works</button>
            </li>
            <li className="leading-none tracking-[0.1em] font-[900] intro uppercase text-4xl my-5">
              <button onClick={() => goToSection(1)}>About</button>
            </li>
            <li className="leading-none tracking-[0.1em] font-[900] intro uppercase text-4xl my-5">
              <button onClick={() => goToSection(3)}>Contact</button>
            </li>
          </ul>
          <div className=" h-[20%] w-full absolute bottom-0 flex justify-center items-center">
            <a
              href="https://www.instagram.com/your_username"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={insta}
                alt="Instagram"
                width={30}
                height={30}
                className="mx-2.5"
              />
            </a>
            <a
              className="ml-2"
              href="https://www.instagram.com/your_username"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={linkedin} alt="Instagram" width={30} height={30} />
            </a>
          </div>
        </div>
      </Menu>
      {menuopen ? (
        ""
      ) : (
        <div
          className="absolute top-3 left-3 z-10 block sm:block lg:hidden"
          onClick={() => {
            setMenuopen(true);
          }}
        >
          <Image src={Menuicon} alt="Menuicon" height={30} />
        </div>
      )}

      <div className="block sm:block md:block lg:hidden"></div>
      <div
        ref={(el) => {
          sectionsRef.current[0] = el;
        }}
        className="h-[200vh] w-full bg-[#ffdb03] "
      >
        <Home animateOut={animateOut} goToSection={goToSection} />
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
        className="h-[100%] w-full relative"
      >
        {menuopen ? (
          ""
        ) : (
          <div
            className="absolute top-3 left-3 z-10 block sm:block lg:hidden"
            onClick={() => {
              setMenuopen(true);
            }}
          >
            <Image src={Menuicon} alt="Menuicon" height={30} />
          </div>
        )}
        <About />
      </div>
      <div
        ref={(el) => {
          sectionsRef.current[2] = el;
        }}
        className="h-[200vh] w-full relative"
      >
        {menuopen ? (
          ""
        ) : (
          <div
            className="absolute top-3 left-3 z-10 block sm:block lg:hidden"
            onClick={() => {
              setMenuopen(true);
            }}
          >
            <Image src={Menuicon} alt="Menuicon" height={30} />
          </div>
        )}
        <MyWork ref={myWorkRef} />
        <div className="h-screen">
          <div
            onClick={() => goToSection(currentSection + 1)}
            className=" w-10 h-20 rounded-full border-4 border-yellow-200 flex sm:flex md:flex lg:hidden justify-center z-[10] absolute bottom-[50%] left-[50%] items-center cursor-pointer  "
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
      </div>
      <div
        ref={(el) => {
          sectionsRef.current[3] = el;
        }}
        className="h-screen w-full relative"
      >
        {menuopen ? (
          ""
        ) : (
          <div
            className="absolute top-3 left-3 z-10 block sm:block lg:hidden"
            onClick={() => {
              setMenuopen(true);
            }}
          >
            <Image src={Menuicon} alt="Menuicon" height={30} />
          </div>
        )}
        <Contact />
      </div>
    </div>
  );
}
