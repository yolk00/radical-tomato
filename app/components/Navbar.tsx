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
];

export default function Navbar() {
  const pathname = usePathname();
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
