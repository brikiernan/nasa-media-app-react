import { initialParams } from 'lib/const';

export * from './exif-data';
export type Children = { children: React.ReactNode };
export type SearchParams = typeof initialParams;
export type MediaType = 'audio' | 'image' | 'video';

type Data = {
  center: string;
  date_created: string;
  description: string;
  media_type: MediaType;
  nasa_id: string;
  title: string;
  keywords?: string[];
  location?: string;
  photographer?: string;
};

type Link = {
  href: string;
  rel: string;
  render: string;
};

export type Item = {
  data: Data[];
  href: string;
  links?: Link[];
};

export type Collection = {
  collection: {
    href: string;
    items: Item[];
    version: string;
    metadata?: {
      total_hits: number;
    };
  };
};

export type Sizes = {
  small: string | null;
  medium: string | null;
  large: string | null;
  original: string | null;
};
