"use client";
import { motion } from "framer-motion";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Herominion from "../3Dmodal/Herominion";
import AnimatedCursor from "../components/AnimatedCursor";
import AnimatedWord from "../components/AnimatedWord";
export default function Hero({ animateOut }) {
  return (
    <>
      <AnimatedCursor />
      <div className="flex h-[100%] ">
        <div className="w-screen lg:w-[50%]">
          <motion.div
            className="h-[100%] flex items-center justify-center"
            initial={{ width: "100%" }}
            animate={{ width: animateOut ? 0 : "100%" }}
            transition={{ duration: 1 }}
          >
            <div className=" h-[70%]">
              <p className="introEx  z-[9999]">creative</p>
              <span className="text-[70px] sm:text-[130px] md:text-[150px] lg:text-[130px] leading-none tracking-[0.1em] font-[900] intro uppercase">
                Design
              </span>
              {/* <AnimatedWord word="Design"/> */}
              <span className="introEx ">&</span>
              <div></div>
              <p className="text-[70px] sm:text-[130px] md:text-[150px] lg:text-[130px] leading-none tracking-[0.1em] font-[900] intro uppercase z-[1] sticky">
                Developer
              </p>
            </div>
          </motion.div>
        </div>
        <div className="hidden lg:hidden xl:block w-[50%] h-[80%]">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[2, 2, 2]} />
            <Herominion animateOut={animateOut} />
            {/* <OrbitControls /> */}
          </Canvas>
        </div>
      </div>
    </>
  );
}
