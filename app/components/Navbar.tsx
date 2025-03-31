import Link from "next/link";

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
  {
    name: "Credits",
    link: "/credits",
  },
];

export default function Navbar() {
  return (
    // <nav className="-mt-5 w-full bg-lime-300">
    <nav className="-mt-5 w-full mb-0.5">
      {/* <ul className="flex lg:text-8xl md:text-6xl gap-10"> */}
      <ul className="grid grid-cols-4 text-sm">
        {navLinks.map((item, i) => (
          <li key={i}>
            <Link href={item.link} className="">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
