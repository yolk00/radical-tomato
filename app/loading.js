"use client";

import Image from "next/image";
import re1 from "@/public/RE/RE Smile.svg";
import re2 from "@/public/RE/RE pout.svg";
import re3 from "@/public/RE/RE angry pout.svg";
import re4 from "@/public/RE/RE innocent.svg";

import { motion } from "motion/react";

export default function Loading() {
  const faces = [re1, re2, re3, re4];

  const MotionImage = motion.create(Image);

  function getRandomIntBetween(max, min) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    // The maximum is inclusive and the minimum is inclusive
    const rndNum = Math.floor(
      Math.random() * (maxFloored - minCeiled + 1) + minCeiled,
    );

    return rndNum === 0 ? 1.5 : rndNum;
  }

  return (
    <div className="absolute inset-0 z-40 flex h-screen w-screen cursor-wait items-center justify-center bg-black text-lg text-white">
      <div className="flex flex-col items-center gap-4">
        <p className="">Loading</p>
        <div className="flex gap-2 saturate-170">
          {faces.map((img, i) => (
            <div key={i}>
              <MotionImage
                src={img}
                alt="radical edward face icons"
                height={50}
                width={50}
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
