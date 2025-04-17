import { motion } from "framer-motion";

export default function AnimatedWord({ word }) {
  return (
    <motion.div className="flex gap-2" whileHover="hover">
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          className="text-[130px] leading-none tracking-[0.1em] font-[900] intro uppercase"
          variants={{
            hover: {
              color: "#F9D423", // yellow on hover
              transition: {
                delay: i * 0.05,
                duration: 0.3,
              },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
      
    </motion.div>
  );
}
