import Image from "next/image";
import mainImage from "@/public/cowboy_bebop_promo.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="box-border">
      {/* <div className="size-full rounded-smid overflow-hidden grid grid-cols-1 grid-rows-1"> */}
      {/* <div className="h-screen rounded-smid overflow-hidden grid grid-cols-1 grid-rows-1 relative">
        <div className="col-span-full row-span-full z-2 flex items-center justify-center">
          <div className="w-100 h-100 p-5  text-white">
            <p className="text-3xl">View</p>
            <p className="text-3xl">Sessions</p>
          </div>
        </div>

        <div className="col-span-full row-span-full z-1 flex items-center justify-center mix-blend-exclusion">
          <div className="w-100 h-100 p-5 bg-cowboy-blue  text-white"></div>
        </div>

        <div className="bg-cowboy-blue mix-blend-color col-span-full row-span-full"></div>
        <Image
          src={mainImage}
          alt="Jet, and Faye frantically lunge towards camera. Faye pushes past Spike who is eating ramen. Ed is in the background climbing the steps on all fours looking on quizically at the situation."
          className="max-w-full h-auto col-span-full row-span-full"
          // className="col-span-full row-span-full object-center"
          // fill
        />
      </div> */}
      <div className="h-screen w-auto rounded-smid bg-cowboy-blue grid grid-cols-1 grid-rows-1 overflow-hidden">
        <div className="col-span-full row-span-full z-3 flex items-center justify-center">
          <Link href="/sessions">
            <div className="lg:w-100 lg:h-100 md:w-75 md:h-75 w-50 h-50 p-5  text-white">
              <p className="lg:text-3xl md:text-2xl text-xl">View</p>
              <p className="lg:text-3xl md:text-2xl text-xl">Sessions</p>
            </div>
          </Link>
        </div>

        {/* would be easier to make this an svg and resize based on viewport ? */}
        <div className="col-span-full row-span-full z-2 flex items-center justify-center mix-blend-exclusion">
          <div className="lg:w-100 lg:h-100 md:w-75 md:h-75 w-50 h-50 p-5 bg-cowboy-blue  text-white"></div>
        </div>

        <div className="bg-cowboy-blue mix-blend-color col-span-full row-span-full rounded-smid z-1"></div>
        {/* <Image
          src={mainImage}
          alt="Jet, and Faye frantically lunge towards camera. Faye pushes past Spike who is eating ramen. Ed is in the background climbing the steps on all fours looking on quizically at the situation."
          className="rounded-smid object-cover h-screen col-span-full row-span-full"
          width={1916}
          height={1040}
          // fill
        /> */}
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
        {/* <iframe
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
        ></iframe> */}
      </div>
    </main>
  );
}
