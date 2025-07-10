import Link from "next/link";
import BackgroundVideo from "next-video/background-video";
import CowboyPromo from "@/videos/CowboyBebopHD_AdultSwimPromos_960x720_h264.mp4";

export default function Home() {
  return (
    <main className="box-border">
      {/* TODO: would need to make this a seprate component to use transition router */}
      <Link href="/sessions" className="peer">
        <div className="view-session-btn absolute top-1/2 left-1/2 z-2 h-75 w-75 -translate-1/2 p-5 text-white mix-blend-difference duration-1000 ease-InOutCubic hover:scale-90 md:h-100 md:w-100">
          <p className="text-2xl md:text-3xl">View</p>
          <p className="text-2xl md:text-3xl">Sessions</p>
        </div>
      </Link>
      <div className="blue-blend absolute inset-0 z-1 bg-cowboy-blue mix-blend-color duration-1000 ease-InOutCubic peer-hover:bg-transparent"></div>
      {/* FIXME: backdrop blur not showing up in firefox/safari */}
      <div className="absolute top-1/2 left-1/2 z-1 flex -translate-1/2 items-center justify-center mix-blend-hue invert backdrop-blur-lg duration-1000 ease-InOutCubic peer-hover:scale-90 peer-hover:invert-5">
        <div className="h-75 w-75 bg-cowboy-rust p-5 text-white saturate-200 duration-300 ease-InOutCubic md:h-100 md:w-100"></div>
      </div>
      <div className="-m-5 grid h-screen w-auto grid-cols-1 grid-rows-1 overflow-hidden">
        <BackgroundVideo
          src={CowboyPromo}
          aria-label="video-player"
          className="col-span-full row-span-full h-screen scale-152 justify-self-center object-cover"
          style={{ width: "960px" }}
          thumbnailTime={19}
          preload="true"
        />
      </div>
    </main>
  );
}
