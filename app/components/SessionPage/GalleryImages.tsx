"use client";

import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import { GalleryImageUrl } from "@/utils/types";
import Image from "next/image";
import { PreparedPhotoSwipeOptions } from "photoswipe";

export default function GalleryImages({
  filteredImageUrls,
  title,
}: {
  filteredImageUrls: GalleryImageUrl[];
  title: string;
}) {
  // console.log(filteredImageUrls);

  // TODO: create datasource array for images?
  // unsure if it will work bc of fandom url 404 problem

  const options: Partial<PreparedPhotoSwipeOptions> = {
    zoom: false,
    showHideAnimationType: "zoom",
    // spacing: 0.5,
    // padding: { top: 20, right: 20, bottom: 20, left: 20 },
  };

  // function imagePath(imageName: string) {
  //   const cleanPath = imageName.slice(5);
  //   // console.log(cleanPath);

  //   return `https://cowboybebop.fandom.com/wiki/Special:FilePath/${cleanPath}`;
  // }

  return (
    <Gallery options={options}>
      {filteredImageUrls.map((image: GalleryImageUrl, i: number) => (
        <Item<HTMLImageElement>
          key={i}
          // TODO: change open/close transition to "zoom" instead of "fade"
          // ? currently doesn't work bc content can't access dimension info
          content={
            <Image
              src={image.imageinfo[0].url}
              alt={`Gallery image from ${title} sourced from cowboybebop.fandom.com`}
              width={image.imageinfo[0].width}
              height={image.imageinfo[0].height}
              className="size-full"
            />
          }
          // content={
          //   <FandomImage
          //     url={image.imageinfo[0].url}
          //     title={title}
          //     width={image.imageinfo[0].width}
          //     height={image.imageinfo[0].height}
          //   />
          // }
          width={image.imageinfo[0].width}
          height={image.imageinfo[0].height}
          alt={`gallery image from ${title} on cowboybebop.fandom.com`}
        >
          {({ ref, open }) => (
            // <div className="mb-4" ref={ref} onClick={open}>
            <Image
              key={i}
              ref={ref}
              onClick={open}
              className="mb-4"
              src={image.imageinfo[0].url}
              alt={`gallery image from ${title} on cowboybebop.fandom.com`}
              width={image.imageinfo[0].width}
              height={image.imageinfo[0].height}
            />
            // </div>
          )}
        </Item>
      ))}
    </Gallery>
  );
}

// function FandomImage({
//   url,
//   title,
//   width,
//   height,
// }: {
//   url: string;
//   title: string;
//   width: number;
//   height: number;
// }) {
//   return (
//     <Image
//       src={url}
//       alt={`Gallery image from ${title} sourced from cowboybebop.fandom.com`}
//       width={width}
//       height={height}
//     />
//   );
// }
