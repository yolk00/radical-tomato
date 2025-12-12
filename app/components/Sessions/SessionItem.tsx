"use client";

import Image from "next/image";
import Link from "next/link";
import { Episode } from "@/utils/types";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

// export default async function SessionItem({
export default function SessionItem({
  title,
  mal_id,
  aired,
  episodeImagesArray,
}: Episode) {
  // add zero to start of numbers with one integer
  function formatEpNum(num: number) {
    if (num < 10) {
      return num.toString().padStart(2, "0");
    } else {
      return num;
    }
  }

  const paddedIndex = mal_id - 1;

  const sessionImage = episodeImagesArray[paddedIndex].url;

  const MotionLink = motion.create(Link);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <MotionLink
      href={{
        pathname: `/sessions/${title}`,
      }}
      className="group h-[28.75rem] w-full"
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{
      //   duration: 0.3,
      //   ease: [0.25, 1, 0.5, 1],
      //   delay: 0.165 * mal_id,
      // }}
      // ***** New Below
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.3,
                ease: [0.25, 1, 0.5, 1],
                delay: (mal_id % 5) * 0.1,
              },
            }
          : null
      }
    >
      <div className="h-[315px] w-full">
        <Image
          src={sessionImage}
          alt="alt text"
          width={621}
          height={477}
          className="size-full object-cover duration-300 group-hover:brightness-75"
        />
      </div>
      <div className="flex justify-between p-1">
        <div className="text-sm">
          <p className="uppercase duration-150 group-hover:bg-black group-hover:text-white">
            {title}
          </p>
          <p className="w-fit text-neutral-600 duration-150 group-hover:bg-black group-hover:text-white">
            {new Date(aired).toISOString().split("T00:00:00.000Z")}
          </p>
        </div>
        <p className="text-3xl duration-150 group-hover:bg-black group-hover:text-white">
          {formatEpNum(mal_id)}
        </p>
      </div>
    </MotionLink>
  );
}
