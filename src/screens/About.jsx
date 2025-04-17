"use client";
import FullScreenSection from "../components/FullScreenSection";
export default function About() {
  return (
    <div className=" h-full flex justify-center items-center" id="About" >
      <div className="w-[90%] m-auto  flex justify-center items-center ">
        <div className="">
          <div className="w-[90%] m-auto">
            <video
              src="/Gifs/minionsvid.mp4"
              autoPlay
              muted
              playsInline
              className="w-[80px] ml-[-38px] mb-[-2px]"
              onEnded={() => console.log("Video finished")}
            />
            <p className="text-[50px] leading-none tracking-[0.1em] font-[900] intro uppercase">
              Hello I Am
            </p>
            <p className="nav-name">Vivek Bunker</p>
          </div>
          <p className="about-para sm:text-[1rem] md:text-[1rem] lg:text-[1.8rem] w-[90%] m-auto">
            a passionate Web & App Developer with 2 years of hands-on experience
            building modern, responsive, and user-friendly applications. I
            specialize in crafting intuitive mobile apps using React Native and
            Ionic, and building dynamic web experiences with React.js, Next.js,
            Angular, and Bootstrap. On the backend, I work primarily with
            Node.js, creating fast and scalable APIs to power seamless user
            interactions. I love turning ideas into real, functional products —
            whether it's an engaging mobile app or a robust web platform. My
            focus is always on clean code, performance, and a smooth user
            experience. Let’s build something great together.
          </p>
        </div>
      </div>
    </div>
  );
}
