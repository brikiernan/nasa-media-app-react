import { RuxTab, RuxTabs } from '@astrouxds/react';

import { useAppContext } from 'providers';
import { useScroll } from 'hooks';
import Loading from 'components/loading';
import MediaItem from 'components/media-item';
import './home.css';

const tab1 = 'Most Popular';
const tab2 = 'Recent Uploads';

export const Home: React.FC = () => {
  // prettier-ignore
  const { isLoading, isPopular, popular, recent, setIsPopular } = useAppContext();
  useScroll('home-scroll-position');

  if (isLoading) return <Loading />;

  const handleSelected = (event: any) => {
    if (event.target.id === tab1) return setIsPopular(true);
    setIsPopular(false);
  };

  return (
    <>
      <nav id='home-tabs'>
        <RuxTabs>
          <RuxTab id={tab1} onClick={handleSelected} selected={isPopular}>
            {tab1}
          </RuxTab>
          <RuxTab id={tab2} onClick={handleSelected} selected={!isPopular}>
            {tab2}
          </RuxTab>
        </RuxTabs>
      </nav>
      <main id='home-item-container'>
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
