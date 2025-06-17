"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Sessions",
    link: "/sessions",
  },
  {
    name: "Info",
    link: "/info",
  },
  // {
  //   name: "Credits",
  //   link: "/credits",
  // },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    // <nav className="-mt-5 w-full bg-lime-300">
    //   {/* <nav className="-mt-5 w-full mb-0.5 bg-lime-300"> */}
    //   {/* <ul className="flex lg:text-8xl md:text-6xl gap-10"> */}
    //   <ul className="grid grid-cols-4 text-sm">
    //     {navLinks.map((item, i) => (
    //       <li key={i}>
    //         <Link href={item.link} className="">
    //           {item.name}
    //         </Link>
    //       </li>
    //     ))}
    //   </ul>
    // </nav>
    // <nav className=" shadow-sm rounded-smid fixed left-10 right-10 top-3 p-2.5 z-2 mix-blend-exclusion">
    <nav
      // FIXME: figure out optimal position for nav
      className={
        pathname === "/"
          ? "bg backdrop-blur-sm shadow-sm rounded-smid fixed top-3 right-5 md:left-5 md:right-auto p-2.5 z-2 mix-blend-hard-light"
          : "backdrop-blur-sm shadow-sm rounded-smid fixed top-3 right-5 md:left-5 md:right-auto p-2.5 z-2 mix-blend-exclusion"
      }
    >
      {/* <ul className="flex flex-col text-sm"> */}
      <ul className="flex gap-2 text-sm">
        {navLinks.map((item, i) => (
          <li key={i}>
            <Link
              href={item.link}
              className={
                pathname === "/"
                  ? "invert hover:bg-white hover:text-black duration-150"
                  : "bg-white hover:bg-black hover:text-white duration-150"
              }
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
