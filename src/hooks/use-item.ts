import { useEffect, useState } from 'react';

import { Collection, Item } from 'types';
import { findItem } from 'lib/utils';
import { imagesApi } from 'lib/const';
import { client } from 'lib/client';

export const useItem = (items: Item[], id?: string) => {
  const [item, setItem] = useState<Item | null>(findItem(items, id) || null);

  useEffect(() => {
    if (item) return;

    const fetch = async () => {
      try {
        const ENDPOINT = `${imagesApi}/search?q=${id}`;
        const response = await client.get<Collection>(ENDPOINT);
        setItem(response.collection.items[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, [id, item]);

  return item;
};
