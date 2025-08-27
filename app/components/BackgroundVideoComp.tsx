"use client";

// import MuxPlayer from "@mux/mux-player-react";
import BackgroundVideo from "next-video/background-video";
import CowboyPromo from "@/videos/CowboyBebopHD_AdultSwimPromos_960x720_h264.mp4";
import { useContext, useEffect, useRef } from "react";
import { VideoLoadedContext } from "@/utils/VideoLoadedContext";
import {
  motion,
  AnimatePresence,
  steps,
  animate,
  useMotionValue,
} from "motion/react";
import re1 from "@/public/RE/RE Smile.svg";
import re2 from "@/public/RE/RE pout.svg";
import re3 from "@/public/RE/RE angry pout.svg";
import re4 from "@/public/RE/RE innocent.svg";
import Image from "next/image";

export default function BackgroundVideoComp() {
  const { isVideoLoaded, setIsVideoLoaded } = useContext(VideoLoadedContext);

  // const MotionImage = motion.create(Image);

  const faces = [re1, re2, re3, re4];
  const controlsRef = useRef(null);
  const marginLeft = useMotionValue(0);

  useEffect(() => {
    const controls = animate(marginLeft, -200, {
      duration: 1.5, // .75
      ease: steps(4),
      repeat: Infinity,
      repeatType: "loop",
    });
    controlsRef.current = controls;

    return controls.stop;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   console.log(isVideoLoaded);
  // }, [isVideoLoaded]);

  return (
    <>
      <AnimatePresence>
        {!isVideoLoaded && (
          <motion.div
            // exit={{ y: "100%" }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.65, 0, 0.35, 1],
              delay: 1,
            }}
            className="absolute inset-0 z-5 flex origin-bottom justify-center bg-black"
          >
            {/* <MotionImage
              // exit={{ opacity: 0 }}
              // transition={{
              //   duration: 0.5,
              //   ease: [0.65, 0, 0.35, 1],
              //   delay: 0.5,
              // }}
              src={re1}
              width={50}
              height={50}
              alt="cartoonish yellow circlular face with a mischievious smile"
              className="saturate-170"
            /> */}
            {/* <div
              // key={i}
              className="counter flex w-12 justify-center overflow-hidden bg-red-500"
            >
              <div className="numbers flex w-auto shrink-0 grow-0 basis-12 bg-green-400">
                {faces.map((img, i) => (
                  <MotionImage
                    key={i}
                    animate={{
                      marginLeft: 0.5 * i,
                    }}
                    src={img}
                    alt="cartoonish yellow face with a mischievious expression."
                    width={50}
                    height={50}
                  />
                ))}
              </div>
            </div> */}
            <div className="flex items-center justify-center">
              <div className="size-12 overflow-hidden">
                <motion.div
                  style={{ marginLeft }}
                  // TODO: find way to get current step to hold it
                  exit={{ marginLeft: 0 }}
                  // exit={controlsRef.current?.pause()}
                  // initial={{ marginLeft: 0 }}
                  // animate={{ marginLeft: "-200px" }}
                  // exit={{ marginLeft: 0 }}
                  className="flex w-auto"
                  // transition={{
                  //   duration: 1.25,
                  //   ease: steps(4),
                  //   repeat: Infinity,
                  //   repeatType: "loop",
                  // }}
                >
                  {faces.map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      className="saturate-170"
                      alt="cartoonish yellow face with a mischievious expression."
                      width={50}
                      height={50}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <BackgroundVideo
        src={CowboyPromo}
        aria-label="video-player"
        // TODO: figure out why controls are showing on safari???
        thumbnailTime={19}
        preload="true"
        className="h-screen scale-105"
        ref={(HTMLVideoElement?) => {
          // console.log(HTMLVideoElement);
          // console.log(HTMLVideoElement.shadowRoot.children[1].childNodes[1]);
          if (HTMLVideoElement) {
            (
              HTMLVideoElement.shadowRoot.children[1]
                .childNodes[1] as HTMLVideoElement
            ).style.objectFit = "cover";
          }
        }}
        onLoadedData={() => {
          setIsVideoLoaded((prevState) => !prevState);
        }}
      />
    </>
  );
}
