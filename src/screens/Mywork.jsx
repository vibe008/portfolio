"use client";
import { forwardRef, useImperativeHandle } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import minionperform from "../../public/MinionsImg/minionperformremovebg.png";
import back from "../../public/projectImg/back.png";
import next from "../../public/projectImg/next.png";
import { div } from "framer-motion/client";
const CardData = [
  {
    isIntro: true,
    content: "Welcome to My Work", // Add whatever you want here
  },
  {
    id: 1,
    img: require("../../public/projectImg/kekkadhinga.png"),
    projectName: "kekkadhinga",
    discription:
      "Kekkadhinga is a vibrant music streaming application designed for users to explore, listen, and enjoy a wide variety of regional and popular songs. The app features a user-friendly interface with smooth navigation, playlist management, and high-quality audio streaming. Built with scalability in mind, it supports dynamic content updates and personalized recommendations for an engaging music experience.",
    link: "https://play.google.com/store/apps/details?id=com.dreamzz.kekkadhinga&hl=en-IN",
  },
  {
    id: 2,
    img: require("../../public/projectImg/biblenotes.png"),
    projectName: "Bible Notes",
    discription:
      "BibleNotes is a mobile application that allows users to read and engage with the Bible interactively. Users can take notes, highlight verses, and bookmark passages for easy access. The app uses SQLite for local data storage, ensuring fast and offline access to scripture, and provides a clean UI built using React Native Paper with smooth animations via Reanimated.",
    link: "https://play.google.com/store/apps/details?id=com.nixies.biblenotes&hl=en-IN",
  },
  {
    id: 3,
    img: require("../../public/projectImg/dews.png"),
    projectName: "Dews",
    discription:
      "Dremze is a dynamic business website built for an IT company. It includes sections for services, blogs, portfolio, and team members. A secure and easy-to-use admin panel allows the company to manage content (like blog posts and service updates) in real-time. The website is designed for performance, accessibility, and professional presentation.",
    link: "https://www.the-dews.com/",
  },
  {
    id: 4,
    img: require("../../public/projectImg/kudavilingli.png"),
    projectName: "kudavilingli",
    discription:
      "This is an online platform for Kekkadhinga Beach and Resort, enabling users to check availability and book accommodations directly. The site includes high-quality imagery, booking forms, resort details, and maps. Designed for ease-of-use, it provides a seamless reservation experience with mobile responsiveness and intuitive navigation.",
    link: "https://www.kudavillingili.com/",
  },
  {
    id: 5,
    img: require("../../public/projectImg/dbr.png"),
    projectName: "DBR",
    discription:
      "DBR (Dana Beach Resort) is an event booking platform that allows users to reserve venues for weddings, parties, and corporate events online. The website provides detailed information on event packages, photo galleries, availability calendars, and contact forms. The backend supports booking management, confirmations, and client communication.",
    link: "https://www.dbr.sa/en/",
  },
];

const ColoursArr = ["#c4a3b3", "#ef8370", "#443bca", "#443bca", "#414f72"];
const MyWork = forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const totalSlides = CardData.length;

  useImperativeHandle(ref, () => ({
    isAtStart: atStart,
    isAtEnd: atEnd,
  }));

  // Measure slide width
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        setSlideWidth(container.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSlide = (index) => {
    const targetX = -index * slideWidth;
    animate(x, targetX, { type: "spring", stiffness: 200, damping: 30 });
  };

  const handleWheel = (e) => {
    if (e.deltaY > 20 && currentIndex < totalSlides - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollToSlide(nextIndex);
      setAtStart(false);
      setAtEnd(nextIndex === totalSlides - 1);
    } else if (e.deltaY < -20 && currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      scrollToSlide(prevIndex);
      setAtEnd(false);
      setAtStart(prevIndex === 0);
    }
  };

  const goToNextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollToSlide(nextIndex);
      setAtStart(false);
      setAtEnd(nextIndex === totalSlides - 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      scrollToSlide(prevIndex);
      setAtEnd(false);
      setAtStart(prevIndex === 0);
    }
  };

  const GotoNextPage = ()=>{
    setAtStart(currentIndex === 0);
    setAtEnd(currentIndex === totalSlides - 1);
  }
  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -100 || velocity < -500) {
      if (currentIndex < totalSlides - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        scrollToSlide(nextIndex);
        setAtStart(false);
        setAtEnd(nextIndex === totalSlides - 1); // ✅ important!
      }
    } else if (offset > 100 || velocity > 500) {
      if (currentIndex > 0) {
        const prevIndex = currentIndex - 1;
        setCurrentIndex(prevIndex);
        scrollToSlide(prevIndex);
        setAtEnd(false);
        setAtStart(prevIndex === 0); // ✅ important!
      }
    } else {
      scrollToSlide(currentIndex);
      // ✅ still update the flags in case drag ends with no movement
      setAtStart(currentIndex === 0);
      setAtEnd(currentIndex === totalSlides - 1);
    }
  };

  return (
   <div>
        <div className="relative" id="Works">
      {/* <div className="absolute inset-0 bg-white z-0" /> */}

      {/* Yellow diagonal bottom background */}
      <div className="absolute bottom-0 left-0 w-full h-2/3 bg-yellow-300 z-[-1] [clip-path:polygon(0%_40%,100%_0%,100%_100%,0%_100%)] opacity-[1] " />
      <div
        onWheel={handleWheel}
        // style={{ backgroundColor: ColoursArr[currentIndex] }}
        className="h-screen w-screen flex-col justify-center items-center overflow-hidden sm:flex-col md:flex-col lg:flex"
      >
        <div className="h-screen sm:h-screen md:h-screen lg:h-[50%] m-auto w-screen flex justify-center">
          <div className="w-[100%] sm-w-[80%] md:w-[80%] lg:w-[70%]  h-full flex overflow-hidden  items-center">
            <motion.div
              ref={containerRef}
              style={{ x }}
              drag="x"
              dragConstraints={{
                left: -slideWidth * (totalSlides - 1),
                right: 0,
              }}
              onDragEnd={handleDragEnd}
              className="slider flex w-full items-center"
            >
              {CardData.map((card, key) => (
                <motion.div
                  key={key}
                  animate={{
                    opacity: currentIndex === key ? 1 : 0.1,
                    scale: currentIndex === key ? 1 : 0.95,
                    transition: { duration: 0.2, delay: 0.5 },
                  }}
                  className="h-full  sm:flex md:flex lg:flex min-w-[100%] p-2.5"
                >
                  {card.isIntro ? (
                    // 🎉 Intro slide content
                    <>
                      <div className="flex justify-center items-center text-center px-10 h-full">
                        <motion.div
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8 }}
                          className="flex items-center justify-center h-full"
                        >
                          <p className=" projectMainHeading text-[3rem] sm:text-[2rem] md:text-[2rem] lg:text-[8rem] bg-black bg-clip-text text-transparent p-5 uppercase leading-none tracking-[0.1em] font-[900]">
                            Project's
                          </p>
                          {/* <div className="bg-black h-[2px] sm:h-[2px] md:h-[2px] lg:h-[5px] w-[160px] mt-2.5 ml-2.5"> */}
                          <div className="mt-[-60px] h-[100px] w-[100PX] sm:h-[100px] sm:w-[100PX] md:h-[100px] md:w-[100PX] lg:h-[300px] lg:w-[300PX]">
                            <Image
                              src={minionperform}
                              alt="minionperform"
                              className=" object-contain"
                            />
                            {/* <div className="bg-black h-[2px] sm:h-[2px] md:h-[2px] lg:h-[5px] w-[160px]"></div> */}
                          </div>
                        </motion.div>
                      </div>
                    </>
                  ) : (
                    // 🖼️ Normal card slide
                    <>
                      <motion.div
                        className=" sm:w-[90%] md:w-[90%] lg:w-[55%] sm:h-[50%] md:h-[50%] lg:h-full relative group"
                        // style={{ backgroundColor: ColoursArr[currentIndex] }}
                        initial={{ opacity: 0, y: 50, rotateY: -10 }}
                        animate={{ opacity: 1, y: 0, rotateY: 0 }}
                        // whileHover={{
                        //   scale: 1.04,
                        //   rotateY: 5,
                        //   // boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
                        // }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        <Image
                          src={card.img}
                          alt="project"
                          className="h-full w-full object-center"
                          quality={100}
                        />
                        {currentIndex === 1 ? (
                          ""
                        ) : (
                          <div
                            onClick={goToPrevSlide}
                            className="absolute left-[-10px] top-1/2 -translate-y-[30px]  z-[10] opacity-0 group-hover:opacity-100 cursor-pointer"
                          >
                            <Image
                              src={back}
                              alt="next"
                              height={60}
                              width={60}
                              className="object-contain"
                            />
                          </div>
                        )}
                      </motion.div>
                      <div className="sm:w-full md:w-full lg:w-[42%] m-auto flex flex-col justify-around relative group">
                        <div className="flex justify-between">
                          <a
                            href={card.link}
                            target="_blank"
                            className="projectHeadline text-blue-700 underline"
                          >
                            {card.projectName}
                          </a>
                        </div>
                        <div className="relative w-fit">
                          <p className="relative z-10 workdates">26 Feb</p>
                        </div>
                        <div className="workdescription text-[1rem] lg:text-[1.2rem] ">
                          {card.discription.slice(0, 300)} ......
                        </div>
                        <div
                          onClick={!atEnd ? goToNextSlide : undefined}
                          className={`absolute right-[-10px] top-1/2 -translate-y-[30px] z-[10] 
                            transition-opacity duration-300 
                            ${atEnd ? "opacity-0 cursor-not-allowed" : "opacity-0 group-hover:opacity-100 cursor-pointer"}`}
                        >
                          <Image
                            src={next}
                            alt="next"
                            height={60}
                            width={60}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
             <div
          onClick={() => props.goToSection(props.currentSection + 1)}
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
    <div className="h-screen bg-gradient-to-b from-yellow-300 to-indigo-500"></div>
   </div>
  );
});
export default MyWork;
