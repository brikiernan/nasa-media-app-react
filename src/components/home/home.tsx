import { RuxTab, RuxTabs } from '@astrouxds/react';

import { useAppContext } from 'providers';
import { useScroll } from 'hooks';
import Loading from 'components/loading';
import MediaItem from 'components/media-item';
import './home.css';

const mostPopular = 'Most Popular';
const mostRecent = 'Recent Uploads';

export const Home: React.FC = () => {
  // prettier-ignore
  const { isLoading, isPopular, popular, recent, setIsPopular } = useAppContext();
  useScroll('home');

  if (isLoading) return <Loading />;

  const handleSelected = (event: any) => {
    if (event.target.id === mostPopular) return setIsPopular(true);
    setIsPopular(false);
  };

  return (
    <>
      <nav id='home-tabs'>
        <RuxTabs>
          <RuxTab
            id={mostRecent}
            onClick={handleSelected}
            selected={!isPopular}
          >
            {mostRecent}
          </RuxTab>
          <RuxTab
            id={mostPopular}
            onClick={handleSelected}
            selected={isPopular}
          >
            {mostPopular}
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
