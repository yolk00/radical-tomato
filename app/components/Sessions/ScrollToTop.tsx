"use client";

import arrow from "@/public/Arrow 1.svg";
import Image from "next/image";

import { useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";

export default function ScrollToTop() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // console.log("Y Progress scroll: ", latest);
    setScrollPosition(latest);
  });

  return (
    <div
      // className="self-end"
      className="fixed bottom-5 right-5"
    >
      {/* <button className="size-[50px] bg-black drop-shadow-sm text-white rounded-smid flex justify-center cursor-pointer">
        <Image src={arrow} alt="upwards arrow to scroll to top of page" />
      </button> */}
      <AnimatePresence>
        {/* TODO: change scroll to top point for mobile? */}
        {/* or if height of page is greater than x ? */}
        {scrollPosition > 1250 && (
          <motion.a
            initial={{ opacity: 0, y: "50px" }}
            animate={{ opacity: 1, y: "0px" }}
            exit={{ opacity: 0, y: "50px" }}
            transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
            href="#top"
            id="scroll-btn"
            className="size-[50px] bg-black drop-shadow-sm text-white rounded-smid flex justify-center cursor-pointer"
          >
            <Image src={arrow} alt="upwards arrow to scroll to top of page" />
          </motion.a>
        )}
      </AnimatePresence>
      {/* <p>{scrollPosition}</p> */}
    </div>
  );
}
