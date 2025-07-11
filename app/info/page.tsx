// import TempLoading from "../components/TempLoading";

export default function Page() {
  const sourceLinks = [
    {
      name: "Cowboy Bebop Fandom (Wikipedia API)",
      url: "https://cowboybebop.fandom.com/wiki/Main_Page",
    },
    {
      name: "Jikan API",
      url: "https://jikan.moe/",
    },
    {
      name: "MyAnimeList",
      url: "https://myanimelist.net/anime/1/Cowboy_Bebop?q=cowboy%20bebop&cat=anime",
    },
    {
      name: "aniDB",
      url: "https://anidb.net/anime/23",
    },
    {
      name: "Cowboy Bebop OST Collection (Internet Archive)",
      url: "https://archive.org/details/Cowboy-Bebop-OST-Collection",
    },
    {
      name: "Cowboy Bebop Adult Swim Promos",
      url: "https://www.youtube.com/watch?v=qB9q7Zm-cvI",
    },
  ];
  const fansiteLinks = [
    {
      name: "Jazz Messengers",
      url: "http://www.jazzmess.com/",
    },
    {
      name: "Cowboy Bebop Fandom",
      url: "https://cowboybebop.fandom.com/wiki/Main_Page",
    },
    {
      name: "The Real Folk Blues",
      url: "https://www.rfblues.com/",
    },
  ];
  return (
    <>
      {/* <TempLoading /> */}
      <h1 className="mt-50 mb-8 text-8xl font-bold uppercase md:mb-6 md:text-[12rem] lg:mb-4 lg:text-[16rem]">
        Info
      </h1>
      <div>
        <div className="mb-5">
          <p>
            The CBDb was made as a fun side project for yolk00 to practice her
            web development skills.
          </p>
          <p>
            All content on this site is owned by their respective copyright
            owners.
          </p>
          <p>
            Here are more Cowboy Bebop resources for you to look into if you
            enjoyed this site!
          </p>
        </div>
        <div className="grid auto-rows-auto grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-y-0">
          <div className="md:col-start-1">
            <h2 className="text-2xl font-bold">Fansite Links</h2>
            <ul className="">
              {fansiteLinks.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.url}
                    target="_blank"
                    className="duration-150 ease-in-out hover:bg-black hover:text-white"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-start-2">
            <h2 className="text-2xl font-bold">Sources</h2>
            <ul className="">
              {sourceLinks.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.url}
                    target="_blank"
                    className="duration-150 ease-in-out hover:bg-black hover:text-white"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
