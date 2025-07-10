import { GetGalleryImageNames, GetGalleryImageUrl } from "@/lib/getData";
import Image from "next/image";
import { GalleryImageInfo, GalleryImageUrl } from "@/utils/types";

type GalleryImage = {
  ns: string;
  title: string;
};

export default async function GallerySection({ title }: { title: string }) {
  const imageNames = await GetGalleryImageNames(title);

  // creates an array of a single string of image names to be queried
  const imageNameArr = imageNames.reduce(
    (accumulator: string[], img: GalleryImage) => {
      // adds all image file names to array
      accumulator.push(img.title);

      // replaces commas with %7C "spaces" for param query
      const newArr = accumulator.join(",").replace(/,/g, "%7C").split();
      return newArr;
    },
    [],
  );

  // gets the image urls
  const imageUrls = await GetGalleryImageUrl(imageNameArr);

  // filters out missing images
  const filteredImageUrls = imageUrls.filter(
    (image) => image.missing === undefined,
  );
  // console.log(imageUrls);
  return (
    <div className="photos-section">
      <h2 className="mb-2 text-2xl font-bold">Gallery</h2>
      <div className="w-full columns-2 md:columns-3">
        {filteredImageUrls.map((image, i) => (
          <div key={i} className="mb-4">
            <Image
              key={i}
              src={image.imageinfo[0].url}
              alt={`gallery image from ${title} on cowboybebop.fandom.com`}
              width="846"
              height="631"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
