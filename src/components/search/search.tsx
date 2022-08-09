import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Collection, Item } from 'types';
import { client } from 'lib/client';
import Breadcrums from 'components/breadcrums';
import MediaItem from 'components/media-item';

const baseUrl = 'https://images-api.nasa.gov';

export const Search: React.FC = () => {
  const { search } = useLocation();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const [response] = await Promise.all([
        client.get<Collection>(`${baseUrl}/search${search}`),
        // client.get<Collection>(`${baseUrl}/popular.json`),
      ]);

      setItems(response.collection.items);
    };

    fetch();
  }, [search]);

  return (
    <>
      <Breadcrums />
      <main className='media-item-container'>
        {items.map(item => (
          <MediaItem key={item.data[0].nasa_id} {...item} />
        ))}
      </main>
    </>
  );
};
