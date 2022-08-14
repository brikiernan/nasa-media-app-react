import { useAppContext } from 'providers';
import { useScroll } from 'hooks';
import Breadcrumbs from 'components/breadcrumbs';
import MediaItem from 'components/media-item';
import './search.css';

export const Search: React.FC = () => {
  const { result, results, search } = useAppContext();
  useScroll('search-scroll-position');

  return (
    <>
      <Breadcrumbs {...{ search }} />
      <div className='search-results'>
        {!!results.length ? (
          <h2>Showing results for "{result}"</h2>
        ) : (
          <h2>No results found.</h2>
        )}
      </div>
      <main className='media-item-container'>
        {results.map((item, i) => (
          <MediaItem key={item.data[0].nasa_id + i} {...item} />
        ))}
      </main>
    </>
  );
};
