"use client";

import { motion } from "framer-motion";

function ProjectView({ animateOut }) {
  return (
    <motion.div className="h-screen w-screen flex justify-center items-center bg-gradient-to-b from-amber-400 to-blue-300">
      <motion.div
        initial={{ marginLeft: "-500px" }}
        animate={{ marginLeft: animateOut ? 0 : "-100px" }}
        transition={{ duration: 1 }}
        className="flex justify-center items-center bg-amber-500  "
      >
        <p className="projectview">Project's</p>
        <div className="bg-black h-[5px] w-[160px]"></div>
      </motion.div>
    </motion.div>
  );
}

export default ProjectView;
