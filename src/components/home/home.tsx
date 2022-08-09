import { useEffect, useState } from 'react';
import { RuxTab, RuxTabs } from '@astrouxds/react';

import { Collection, Item } from 'types';
import { client } from 'lib/client';
import './home.css';
import MediaItem from 'components/media-item';

const baseUrl = 'https://images-assets.nasa.gov';
const tab1 = 'Most Popular';
const tab2 = 'Recent Uploads';

export const Home: React.FC = () => {
  const [isPopular, setIsPopular] = useState(true);
  const [popular, setPopular] = useState<Item[]>([]);
  const [recent, setRecent] = useState<Item[]>([]);

  useEffect(() => {
    const fetch = async () => {
      console.log('[FETCHING HOME DATA]...');
      const [rec, pop] = await Promise.all([
        client.get<Collection>(`${baseUrl}/recent.json`),
        client.get<Collection>(`${baseUrl}/popular.json`),
      ]);

      setRecent(rec.collection.items);
      setPopular(pop.collection.items);
    };

    fetch();
  }, []);

  const handleSelected = (event: any) => {
    if (event.target.innerText === tab1) return setIsPopular(true);
    setIsPopular(false);
  };

  return (
    <>
      <nav id='home-tabs'>
        <RuxTabs onRuxselected={e => console.log(e.target)}>
          <RuxTab onClick={handleSelected} selected={isPopular}>
            {tab1}
          </RuxTab>
          <RuxTab onClick={handleSelected} selected={!isPopular}>
            {tab2}
          </RuxTab>
        </RuxTabs>
      </nav>

      <main className='media-item-container'>
        {isPopular
          ? popular.map(item => (
              <MediaItem key={item.data[0].nasa_id} {...item} />
            ))
          : recent.map(item => (
              <MediaItem key={item.data[0].nasa_id} {...item} />
            ))}
      </main>
    </>
  );
};
