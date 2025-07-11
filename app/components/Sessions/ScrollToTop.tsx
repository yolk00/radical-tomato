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
    <div className="fixed right-5 bottom-5">
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
            className="flex size-[50px] cursor-pointer justify-center rounded-smid bg-black text-white drop-shadow-sm"
          >
            <Image src={arrow} alt="upwards arrow to scroll to top of page" />
          </motion.a>
        )}
      </AnimatePresence>
      {/* <p>{scrollPosition}</p> */}
    </div>
  );
}
