"use client";

import { useTransitionRouter } from "next-view-transitions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

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
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useTransitionRouter();
  return (
    <nav
      className={
        pathname === "/"
          ? "bg fixed top-3 right-5 z-2 rounded-smid bg-white/5 p-2.5 mix-blend-hard-light shadow-sm backdrop-blur-sm md:right-auto md:left-5"
          : "fixed top-3 right-5 z-2 rounded-smid bg-white/5 p-2.5 mix-blend-exclusion shadow-sm backdrop-blur-sm md:right-auto md:left-5"
      }
    >
      <ul className="flex gap-2 text-sm">
        {navLinks.map((item, i) => (
          <li key={i}>
            <Link
              href={item.link}
              className={
                pathname === "/"
                  ? "invert duration-150 hover:bg-white hover:text-black"
                  : "bg-white duration-150 hover:bg-black hover:text-white"
              }
              // onClick={(e) => {
              //   e.preventDefault();
              //   router.push(item.link, { onTransitionReady: pageAnim });
              // }}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// animations for next-view-transitions
const pageAnim = () => {
  // anim for outgoing page
  document.documentElement.animate(
    [
      {
        opacity: 1,
        scale: 1,
        transform: "translateY(0)",
        backgroundColor: "#000000",
      },
      {
        opacity: 0.2,
        scale: 0.9,
        transfrom: "translateY(-100px)",
        backgroundColor: "#00000050",
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.65, 0, 0.35, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    },
  );

  // anim for incoming page
  document.documentElement.animate(
    [
      {
        transform: "translateY(100%)",
      },
      {
        transfrom: "translateY(0)",
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.65, 0, 0.35, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    },
  );
};
