export type EpisodeMatch = {
  epNum: number;
  title: string;
};

export type Episode = {
  mal_id: number;
  title: string;
  aired: Date;
  synopsis: string;
  url: string;
  episodeImagesArray: {
    url: string;
  }[];
};

export type Staff = {
  person: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    name: string;
  };
  positions: string[];
};

type VoiceActors = {
  person: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    name: string;
  };
  language: string;
};

export type Character = {
  character: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
      };
      webp: {
        image_url: string;
        small_image_url: string;
      };
    };
    name: string;
  };
  role: string;
  favorites: number;
  voice_actors: VoiceActors[];
};

export type StaffMatch = {
  name: string;
  direction: number[];
  epDirector: number[];
  seriesComp: number[];
  screenwriter: number[];
  storyboard: number[];
  animDirector: number[];
  charDesigner: number[];
  mechanicalDesigner: number[];
  composer: number[];
};

type SongTitle = {
  page: string;
  type: string;
};

export type Song = {
  links: SongTitle[];
  text: string;
};

export type GalleryImageInfo = {
  url: string;
  descriptionurl: string;
  descriptionshorturl: string;
};

export type GalleryImageUrl = {
  pageid?: number;
  missing?: boolean;
  ns: number;
  title: string;
  imagerepository: string;
  imageinfo?: GalleryImageInfo[];
};

export type SongSection = {
  depth: number;
  lists: Song[];
  paragraphs: {
    sentences: string[];
  }[];
  references: {
    template: string;
    type: string;
    data: object;
    inline: object;
  }[];
  title: string;
};

type WtfOptions = {
  lang: string;
  wiki: string;
  domain: string;
  follow_redirects: boolean;
  path: string;
  title: string;
  pageID: number;
  namespace: number;
  revisionID: number;
  timestamp: Date;
  pageImage?: any;
  wikidata?: any;
  description?: any;
};

export type Document = {
  _options: WtfOptions;
};
