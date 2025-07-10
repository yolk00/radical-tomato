"use client";

import Image from "next/image";
import re1 from "@/public/RE/RE Smile.svg";
import re2 from "@/public/RE/RE pout.svg";
import re3 from "@/public/RE/RE angry pout.svg";
import re4 from "@/public/RE/RE innocent.svg";

import { motion } from "motion/react";

import { useState, useEffect } from "react";

export default function TempLoading() {
  const faces = [re1, re2, re3, re4];

  const [count, setCount] = useState(0);
  const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setIndex(count % faces.length);
  //     setCount((prev) => prev + 1);
  //     if (count === faces.length - 1) {
  //       setCount(0);
  //     }
  //     //   console.log(faces[index]);
  //   }, 500);

  //   return () => clearInterval(timer);
  // });

  const MotionImage = motion.create(Image);

  function getRandomIntBetween(max: number, min: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    // The maximum is inclusive and the minimum is inclusive
    const rndNum = Math.floor(
      Math.random() * (maxFloored - minCeiled + 1) + minCeiled,
    );

    return rndNum === 0 ? 1.5 : rndNum;
  }

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  // const y = useTransform(time, [0, 500], [-3, 3]);
  // const x = useTransform(time, [0, 500], [-3, 5]);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setValX(getRandomInt(-3, 3));
  //     setValY(getRandomInt(-3, 3));
  //   }, 500);

  //   return () => clearInterval(timer);
  // });

  return (
    <div className="absolute inset-0 z-40 flex h-screen w-screen items-center justify-center bg-black text-lg text-white">
      <div className="flex flex-col items-center gap-4">
        <p className="lowercase">Loading...</p>
        {/* <div className="">
          <Image
            src={faces[index]}
            alt="radical edward face icons"
            height={50}
            width={50}
            // className="invert-[.95]"
          />
        </div> */}
        <div className="flex gap-2 saturate-170">
          {faces.map((img, i) => (
            <div key={i}>
              <MotionImage
                src={img}
                alt="radical edward face icons"
                height={50}
                width={50}
                // className="animate-wiggle"
                animate={{
                  y: getRandomIntBetween(-4, 4),
                  x: getRandomIntBetween(-4, 4),
                }}
                transition={{
                  type: "tween",
                  ease: "anticipate",
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: Math.random() * 0.1,
                  duration: 0.15,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
