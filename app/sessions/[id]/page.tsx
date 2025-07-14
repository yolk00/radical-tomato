import { GetWikiExtract } from "@/lib/getData";
import Image from "next/image";
import wtf from "wtf_wikipedia";
import { episodeMatch } from "@/utils/matchData";
import CreditsSection from "@/app/components/SessionPage/CreditsSection";
import MusicSection from "@/app/components/SessionPage/MusicSection";
import GallerySection from "@/app/components/SessionPage/GallerySection";
import { EpisodeMatch } from "@/utils/types";
import Link from "next/link";
import ScrollToTop from "@/app/components/Sessions/ScrollToTop";

import { Metadata, ResolvedMetadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvedMetadata,
): Promise<Metadata> {
  // read route params
  const { id } = await params;

  // fetch data
  // TODO: use fetch link to get session images etc ; https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
  // const product = await fetch(`https://.../${id}`).then(
  //   (res) => res.json(),
  // );

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: decodeURI(id),
    description: `The synopsis, music, and images from ${id}`,
    openGraph: {
      images: [...previousImages],
    },
  };
}

// export default function Page({ params }: { params: Promise<{ id: string }> }) {
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // console.log(id);
  const decodedId = decodeURI(id);
  // const lowercaseId = decodedId.toLowerCase();
  // console.log(lowercaseId);

  // FIXME: url is case sensitive and doesn't display pages with differing cases

  // get the number of current episode
  const matches = (item: EpisodeMatch) => item.title === decodeURI(id);
  const epIndex = episodeMatch.findIndex(matches);
  const epNum = epIndex + 1;
  // console.log(epNum);

  // nav to previous/next session
  const prev = episodeMatch.at(epIndex - 1);
  const next = episodeMatch.at(epIndex + 1);

  // fetched to get synopsis
  const jikanData = await fetch(
    `https://api.jikan.moe/v4/anime/1/episodes/${epNum}`,
    {
      cache: "force-cache",
    },
  );
  const jikanEpJson = await jikanData.json();
  const { synopsis } = jikanEpJson.data;
  // console.log(jikanEpJson);

  // fetches fandom wiki data
  const wikiEpisodeData = await GetWikiExtract(id);
  const { title } = wikiEpisodeData;
  const infoBoxObject = JSON.parse(wikiEpisodeData.properties.infoboxes);
  // .at(-1) returns the last index of the array
  const airDate = infoBoxObject[0].data.at(-1).data.value;
  // console.log(infoBoxObject);
  // const encodedQuery = encodeURI(id);

  const sessionImage = infoBoxObject[0].data[1].data[0].url;
  const sessionImageAltText = infoBoxObject[0].data[1].data[0].alt;
  // console.log(sessionImage);

  // fixes "jamming with edward" fetch returning null | 'W' needs to be uppercase
  // FIXME: check pierrot le fou url
  const wtfIdFix =
    id == "Jamming%20with%20Edward" ? "Jamming%20With%20Edward" : id;
  const doc = await wtf.fetch(
    `https://cowboybebop.fandom.com/wiki/${wtfIdFix}`,
  );

  function formatEpNum(num: number) {
    if (num < 10) {
      return num.toString().padStart(2, "0");
    } else {
      return num;
    }
  }

  return (
    <main className="mt-20">
      <div className="top-section mb-8 grid gap-4 sm:grid-cols-1 md:auto-rows-min md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-1">
        <div className="episode-image col-start-1 col-end-2 mb-5">
          <Image
            src={sessionImage}
            alt={sessionImageAltText}
            width={621}
            height={477}
          />
          <div className="relative mt-5 text-xs">
            {prev?.epNum < 26 && (
              <div className="absolute left-0 duration-150 ease-in-out hover:bg-black hover:text-white">
                <span className="no-underline">&#8249; </span>
                <Link
                  href={{ pathname: `/sessions/${prev?.title}` }}
                  className="cursor-pointer underline"
                >
                  Previous Session
                </Link>
              </div>
            )}
            {next?.epNum > 0 && (
              <div className="absolute right-0 duration-150 ease-in-out hover:bg-black hover:text-white">
                <Link
                  href={{ pathname: `/sessions/${next?.title}` }}
                  className="cursor-pointer underline"
                >
                  Next Session
                </Link>
                <span> &#8250;</span>
              </div>
            )}
          </div>
        </div>
        <div className="sm:col-start-1 sm:col-end-2 md:col-start-2 md:col-end-3 lg:col-start-2 lg:col-end-5">
          <h1 className="text-3xl">{title}</h1>
          <p className="mb-3 text-neutral-600">Air Date: {airDate}</p>
          <p className="mb-3 text-sm">{synopsis}</p>
          <div className="block md:hidden lg:block">
            <CreditsSection epNum={epNum} />
          </div>
        </div>
        <div className="col-span-full col-start-1 hidden md:block lg:hidden">
          <CreditsSection epNum={epNum} />
        </div>
      </div>
      <div className="bottom-section grid grid-cols-1 gap-5 md:grid-cols-2">
        <MusicSection epNum={epNum} />
        <GallerySection title={decodedId} />
      </div>
      <ScrollToTop />
    </main>
  );
}
