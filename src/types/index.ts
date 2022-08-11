export enum Path {
  details = '/:id',
  home = '/',
  search = '/search',
}

export type Children = {
  children: React.ReactNode;
};

export type MediaType = 'audio' | 'image' | 'video';

type Data = {
  center: string;
  date_created: string;
  description: string;
  media_type: MediaType;
  nasa_id: string;
  title: string;
  keywords?: string[];
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
  };
};
