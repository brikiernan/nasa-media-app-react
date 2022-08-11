import { useState } from 'react';
import { RuxTab, RuxTabs } from '@astrouxds/react';

import { useAppContext } from 'providers';
import MediaItem from 'components/media-item';
import './home.css';

const tab1 = 'Most Popular';
const tab2 = 'Recent Uploads';

export const Home: React.FC = () => {
  const [isPopular, setIsPopular] = useState(true);
  const { popular, recent } = useAppContext();

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
          ? popular.map((item, i) => (
              <MediaItem key={item.data[0].nasa_id + i} {...item} />
            ))
          : recent.map((item, i) => (
              <MediaItem key={item.data[0].nasa_id + i} {...item} />
            ))}
      </main>
    </>
  );
};
