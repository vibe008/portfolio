"use client";

import Link from "next/link";
import { useState } from "react";
import insta from "../../public/icon/instagram1.png";
import linkedin from "../../public/icon/linkedin1.png";
import Image from "next/image";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div id="Contact" className="h-screen w-screen flex justify-center items-center bg-gradient-to-t from-amber-100 to-blue-600 relative ">
      <div className="w-[90%] sm:w-[90%] md:w-[90%] lg:w-[80%] h-[90%]  ">
        <p className="text-center contactheadline text-[3rem] mt-3 sm:text-[3rem] md:text-[3rem] lg:text-[5rem] ">Contact Me</p>

        <div className="h-[80%] w-[100%] sm:w-[90%]  md:w-[90%] lg:w-[70%]  flex flex-col justify-center  m-auto">
          <div className="flex justify-between gap-4 mb-4">
            <input
              className="inputtrext"
              type="text"
              value={name}
              placeholder="Name"
              onInput={(e) => setName(e.target.value)}
            />
            <input
              className="inputtrext"
              type="text"
              value={email}
              placeholder="Email"
              onInput={(e) => setEmail(e.target.value)}
            />
          </div>
          <textarea
            className="textarea mb-4"
            name="message"
            placeholder="Message"
            value={message}
            id="message"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button className=" p-5  sm:w-[50%] md:w-[50%] lg:w-1/5 mx-auto rounded-[2rem] mt-16 bg-indigo-500 text-white">
            SEND MESSAGE
          </button>
        </div>

        <div className="flex flex-col absolute bottom-10   w-[100%] sm:w-full md:w-full lg:w-[20%] right-0 sm:right-0 md:right-0 lg:right-12 justify-center items-center lg:items-start " >
          <div className="flex">
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
                className="border-4"
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
          <p className="constactdetail">6268611342</p>
          <p className="constactdetail">vivekbunker65@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
