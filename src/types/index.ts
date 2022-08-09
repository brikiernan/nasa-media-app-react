type Data = {
  center: string;
  date_created: string;
  description: string;
  media_type: string;
  nasa_id: string;
  title: string;
};

type Link = {
  href: string;
  rel: string;
  render: string;
};

export type Item = {
  data: Data[];
  href: string;
  links: Link[];
};

export type Collection = {
  collection: {
    href: string;
    items: Item[];
    version: string;
  };
};
