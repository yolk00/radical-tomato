import arrow from "@/public/Arrow 1.svg";
import Image from "next/image";

export default function ScrollToTop() {
  return (
    // TODO: animate opacity to 0 when at the top of the page
    <div
      // className="self-end"
      className="fixed bottom-5 right-5"
    >
      {/* <button className="size-[50px] bg-black drop-shadow-sm text-white rounded-smid flex justify-center cursor-pointer">
        <Image src={arrow} alt="upwards arrow to scroll to top of page" />
      </button> */}
      <a
        href="#top"
        className="size-[50px] bg-black drop-shadow-sm text-white rounded-smid flex justify-center cursor-pointer"
      >
        <Image src={arrow} alt="upwards arrow to scroll to top of page" />
      </a>
    </div>
  );
}
