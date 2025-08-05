export async function GetEpisodes() {
  return fetch("https://api.jikan.moe/v4/anime/1/episodes", {
    cache: "force-cache",
  })
    .then((res) => res.json())
    .then((data) => data.data);
}

type FixedUrl = {
  original: string;
  fixed: string;
};

function GetWikiFix(epName: string) {
  const fixesArr = [
    {
      original: "Waltz for Venus",
      fixed: "Waltz For Venus",
    },
    {
      original: "Jamming with Edward",
      fixed: "Jamming With Edward",
    },
    {
      original: "Toys in the Attic",
      fixed: "Toys In The Attic",
    },
    {
      original: "Speak Like a Child",
      fixed: "Speak Like A Child",
    },
    {
      original: "Pierrot le Fou",
      fixed: "Pierrot Le Fou",
    },
  ];
  const decodedName = decodeURI(epName);
  const foundEpName = fixesArr.find(({ original }) => original === decodedName);
  const matches = (item: FixedUrl) => item.original === decodedName;
  const index = fixesArr.findIndex(matches);

  if (decodedName === foundEpName?.original) {
    return fixesArr[index].fixed;
  } else {
    return decodedName;
  }
}

// can add images to prop to get image file names to feed into fetchImageSource()
export async function GetWikiExtract(param: string) {
  const paramFixed = GetWikiFix(param);

  const wikiEndpoint = `https://cowboybebop.fandom.com/api.php`;
  const wikiParams =
    "?action=parse" +
    "&format=json" + // requests the data in JSON fomat
    "&origin=*" + // omitting this param causes a CORS error
    "&page=" +
    paramFixed + // tells the link which specific wiki page to get an extract from (changes based on 'ele' param)
    "&prop=wikitext" + // an exract is the type of property being requested
    "%7Crevid" +
    "%7Cproperties" +
    "&formatversion=2"; // makes the JSON properties easier to navigate using dot notation

  const wikiLink = wikiEndpoint + wikiParams;
  // console.log(wikiLink);

  const fandomData = await fetch(wikiLink, { cache: "force-cache" })
    .then((res) => res.json())
    .then((data) => data.parse)
    .catch((error) => {
      console.log("error fetching bebop fandom data: " + error);
      return null;
    });

  return fandomData;
}

export async function GetEpisodeImages() {
  const sessionImages = await fetch(
    `https://cowboybebop.fandom.com/api.php?action=query&format=json&origin=*&list=allimages&formatversion=2&aisort=name&aifrom=Session1.jpg&aito=Session9.jpg&ailimit=26`,
    {
      cache: "force-cache",
    },
  )
    .then((res) => res.json())
    .catch((error) => {
      console.log("error fetching episode images: " + error);
      return null;
    });

  const imageArray = sessionImages.query.allimages;
  // console.log(imageArray);

  return imageArray;
}

export async function GetCharacters() {
  const characters = await fetch(
    "https://api.jikan.moe/v4/anime/1/characters",
    {
      cache: "force-cache",
    },
  )
    .then((res) => res.json())
    .then((data) => data.data)
    .catch((error) => {
      console.log("error fetching characters: " + error);
      return null;
    });

  return characters;
}

export async function GetStaff() {
  const staff = await fetch("https://api.jikan.moe/v4/anime/1/staff", {
    cache: "force-cache",
  })
    .then((res) => res.json())
    .then((data) => data.data)
    .catch((error) => {
      console.log("error fetching staff: " + error);
      return null;
    });

  return staff;
}

// TODO: specify only gallery images (?)
export async function GetGalleryImageNames(param: string) {
  const paramFixed = GetWikiFix(param);

  const wikiEndpoint = `https://cowboybebop.fandom.com/api.php`;
  const wikiParams =
    "?action=query" +
    "&format=json" + // requests the data in JSON fomat
    "&origin=*" + // omitting this param causes a CORS error
    "&prop=images" +
    "&titles=" +
    paramFixed + // tells the link which specific wiki page to get an extract from (changes based on 'ele' param)
    "&formatversion=2" +
    "&imlimit=20";

  const wikiLink = wikiEndpoint + wikiParams;

  const imageNames = await fetch(wikiLink, { cache: "force-cache" })
    .then((res) => res.json())
    .then((data) => data.query.pages[0].images)
    .catch((error) => {
      console.log("error fetching images data: " + error);
      return null;
    });

  return imageNames;
}

export async function GetGalleryImageUrl(param: string) {
  const wikiEndpoint = `https://cowboybebop.fandom.com/api.php`;
  const wikiParams =
    "?action=query" +
    "&format=json" + // requests the data in JSON fomat
    "&origin=*" + // omitting this param causes a CORS error
    "&prop=imageinfo" +
    "&titles=" +
    param + // tells the link which specific image files to extract
    "&formatversion=2" +
    // "&iiprop=url";
    "&iiprop=url%7Cdimensions";

  const wikiLink = wikiEndpoint + wikiParams;

  const imageUrls = await fetch(wikiLink, { cache: "force-cache" })
    .then((res) => res.json())
    .then((data) => data.query.pages)
    .catch((error) => {
      console.log("error fetching images data: " + error);
      return null;
    });

  return imageUrls;
}
