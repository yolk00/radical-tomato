import Link from "next/link";
import BackgroundVideo from "next-video/background-video";
import CowboyPromo from "@/videos/CowboyBebopHD_AdultSwimPromos_960x720_h264.mp4";

export default function Home() {
  return (
    <main className="box-border">
      <Link href="/sessions" className="peer">
        <div className="view-session-btn absolute top-1/2 left-1/2 -translate-1/2 w-100 h-100 p-5 text-white z-2 mix-blend-difference hover:scale-90 duration-1000 ease-InOutCubic">
          <p className="text-3xl">View</p>
          <p className="text-3xl">Sessions</p>
        </div>
      </Link>
      {/* <div className="blue-blend bg-cowboy-blue mix-blend-color absolute inset-0 peer-hover:rounded-smid z-1 peer-hover:inset-3/200 duration-1000 ease-InOutCubic peer-hover:bg-transparent"></div> */}
      <div className="blue-blend bg-cowboy-blue mix-blend-color absolute inset-0 z-1 duration-1000 ease-InOutCubic peer-hover:bg-transparent"></div>

      {/* <div className="absolute top-1/2 left-1/2 -translate-1/2 z-1 flex items-center justify-center mix-blend-exclusion"> */}
      <div className="absolute top-1/2 left-1/2 -translate-1/2 z-1 flex items-center justify-center invert mix-blend-hue backdrop-blur-lg peer-hover:invert-5 peer-hover:inset-shadow-2xs peer-hover:scale-90 shadow-black duration-1000 ease-InOutCubic">
        <div className="w-100 h-100 p-5 bg-cowboy-rust text-white "></div>
      </div>

      <div className="grid grid-cols-1 grid-rows-1 h-screen w-auto -m-5 overflow-hidden">
        <BackgroundVideo
          src={CowboyPromo}
          aria-label="video-player"
          className="object-cover justify-self-center h-screen row-span-full col-span-full scale-152"
          style={{ width: "960px" }}
          // thumbnailTime={19}
        />
      </div>

      {/* <div className="video-container h-screen w-auto bg-cowboy-blue grid grid-cols-1 grid-rows-1 overflow-hidden -m-5  duration-1000 ease-InOutCubic">
        <video
          width="960"
          // height="720"
          // controls
          autoPlay
          muted
          playsInline
          loop
          preload="none"
          className="object-cover justify-self-center h-screen col-span-full row-span-full scale-150"
          aria-label="Video player"
        >
          <source
            src="/CowboyBebopHD_AdultSwimPromos_960x720_h264.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <iframe
      width="960"
      // height="720"
      // width="100%"
      // height="100%"
      src="https://www.youtube-nocookie.com/embed/qB9q7Zm-cvI?si=lcW2sBkuLbr8U3aM&amp;autoplay=1&mute=1&loop=1"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      // allowFullscreen
      className="object-cover justify-self-center h-screen col-span-full row-span-full scale-150"
      loading="lazy"
    ></iframe> 
      </div> */}
    </main>
  );
}
