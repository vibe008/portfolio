"use client";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Navbar({ goToSection }) {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <div>

      <div className="hidden sm:hidden  lg:block pt-2.5 h-24 z-0">
        {/* sas */}
        <div className="flex justify-between w-full">
          <div className="flex justify-between items-center w-full sm:w-full md:w-full lg:w-[30%]">
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
          <div className="hidden  lg:block">
            <ul className="flex">
              <li className="heading">
                <button onClick={() => goToSection(2)}>Works,</button>
              </li>
              <li className="heading">
                <button onClick={() => goToSection(1)}>About,</button>
              </li>
              <li className="heading">
                <button onClick={() => goToSection(3)}>Contact</button>
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="fixed top-[50px] left-0 right-0 h-[2px] bg-black z-40 w-[90%] m-auto">
        <motion.div
          style={{ scaleX }}
          className="h-full origin-left bg-gradient-to-r from-yellow-400 via-yellow-500 to-blue-500"
        />
      </div> */}
      </div>
    </div>
  );
}
