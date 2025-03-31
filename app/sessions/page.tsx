import SessionItem from "../components/Sessions/SessionItem";
import ScrollToTop from "../components/Sessions/ScrollToTop";
import { GetEpisodeImages } from "@/lib/getData";
import { Episode } from "@/utils/types";

export default async function Page() {
  const episodesData = await fetch(
    "https://api.jikan.moe/v4/anime/1/episodes",
    {
      cache: "force-cache",
    }
  )
    .then((res) => res.json())
    .then((data) => data.data);
  // const episodesData = await data.json();
  // const episodesData = await GetEpisodes();

  const fetchedImagesArray = await GetEpisodeImages();

  function sortByTime(a, b) {
    const x = new Date(a.timestamp);
    const y = new Date(b.timestamp);

    return x.getTime() - y.getTime();
  }

  const imagesSortedByTime = fetchedImagesArray.sort(sortByTime);
  const sortedByTimeCopy = [...imagesSortedByTime];
  // episodes 19 - 22 were added later, so this extracts them to a new array
  const lastFourArray = sortedByTimeCopy.splice(22 - sortedByTimeCopy.length);

  // merge 'b' with 'a' at index 'i'
  function merge(a, b, i = 0) {
    return a.slice(0, i).concat(b, a.slice(i));
  }
  // this merges them back together in order
  const episodeImagesArray = merge(sortedByTimeCopy, lastFourArray, 18);

  // console.log(episodesData);

  return (
    <div className="w-full flex flex-col" id="top">
      {/* <h1 className="uppercase lg:text-[16rem] md:text-[12rem] sm:text-8xl font-bold mt-50 lg:mb-4 md:mb-6 mb-8"> */}
      <h1 className="uppercase lg:text-[12rem] md:text-[8rem] sm:text-9xl font-bold mt-50 lg:mb-4 md:mb-6 mb-8">
        Sessions
      </h1>
      <div className="grid grid-cols-(--grid-gallery) gap-x-0.5 -m-5">
        {/* <div className="grid grid-cols-4 w-screen gap-x-2 -m-5"> */}
        {episodesData.map((episode: Episode) => (
          <SessionItem
            key={episode.mal_id}
            {...episode}
            episodeImagesArray={episodeImagesArray}
          />
        ))}
      </div>
      <ScrollToTop />
    </div>
  );
}
