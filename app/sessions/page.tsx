import SessionItem from "../components/Sessions/SessionItem";
import ScrollToTop from "../components/Sessions/ScrollToTop";
import { GetEpisodeImages } from "@/lib/getData";
import { Episode } from "@/utils/types";

import { Suspense } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sessions",
};

export default async function Page() {
  const episodesData = await fetch(
    "https://api.jikan.moe/v4/anime/1/episodes",
    {
      cache: "force-cache",
    },
  )
    .then((res) => res.json())
    .then((data) => data.data);

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
    <div className="flex w-full flex-col" id="top">
      <h1 className="mt-50 mb-8 font-bold uppercase sm:text-9xl md:mb-6 md:text-[8rem] lg:mb-4 lg:text-[12rem]">
        Sessions
      </h1>
      <div className="-m-5 grid grid-cols-(--grid-gallery) gap-x-0.5">
        {episodesData.map((episode: Episode) => (
          <Suspense key={episode.mal_id} fallback={<Skeleton />}>
            <SessionItem {...episode} episodeImagesArray={episodeImagesArray} />
          </Suspense>
        ))}
      </div>
      <ScrollToTop />
    </div>
  );
}

function Skeleton() {
  return <div className="h-[28.75rem] w-full bg-cowboy-blue"></div>;
}
