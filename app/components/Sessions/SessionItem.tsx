// import cvrImg from "@/public/cowboy_bebop_promo.jpg";
import Image from "next/image";
import Link from "next/link";
// import { GetWikiExtract } from "@/lib/getData";
import { Episode } from "@/utils/types";

export default async function SessionItem({
  title,
  mal_id,
  aired,
  episodeImagesArray,
}: Episode) {
  // add zero to start of numbers with one integer
  function formatEpNum(num: number) {
    if (num < 10) {
      return num.toString().padStart(2, "0");
    } else {
      return num;
    }
  }

  const paddedIndex = mal_id - 1;

  const sessionImage = episodeImagesArray[paddedIndex].url;

  // const lowercaseTitle = title.toLowerCase();

  // console.log(title);

  return (
    <Link
      href={{
        pathname: `/sessions/${title}`,
        // query: {
        //   id: mal_id,
        // },
        // query: {
        //   title: mal_id,
        // },
      }}
      // className="w-[22.5rem] h-[28.75rem]"
      className="w-full h-[28.75rem]"
    >
      <div className="w-full h-[315px] bg-cowboy-blue">
        <Image
          src={sessionImage}
          // src={cvrImg}
          // alt={sessionImageAltText}
          alt="alt text"
          width={621}
          height={477}
          className="size-full object-cover"
        />
      </div>
      <div className="flex justify-between p-1">
        <div className="text-sm">
          <p className="uppercase">{title}</p>
          <p className="text-neutral-600">
            {new Date(aired).toISOString().split("T00:00:00.000Z")}
          </p>
        </div>
        <p className="text-3xl">{formatEpNum(mal_id)}</p>
      </div>
    </Link>
  );
}
