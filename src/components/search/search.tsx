import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Collection, Item } from 'types';
import { client } from 'lib/client';
import Breadcrums from 'components/breadcrums';
import MediaItem from 'components/media-item';
import './search.css';

const baseUrl = 'https://images-api.nasa.gov';

export const Search: React.FC = () => {
  const { search } = useLocation();
  const [items, setItems] = useState<Item[]>([]);
  const result = search.split('=')[1].split('%20').join(' ');

  useEffect(() => {
    const fetch = async () => {
      const res = await client.get<Collection>(`${baseUrl}/search${search}`);

      setItems(res.collection.items);
    };

    fetch();
  }, [search]);

  return (
    <>
      <Breadcrums {...{ search }} />
      <div className='search-results'>
        <h2>Showing results for "{result}"</h2>
      </div>
      <main className='media-item-container'>
        {items.map(item => (
          <MediaItem key={item.data[0].nasa_id} {...item} />
        ))}
      </main>
    </>
  );
};
