import { useAppContext } from 'providers';
import Breadcrumbs from 'components/breadcrumbs';
import MediaItem from 'components/media-item';
import './search.css';

export const Search: React.FC = () => {
  const { result, results, search } = useAppContext();

  return (
    <>
      <Breadcrumbs {...{ search }} />
      <div className='search-results'>
        <h2>Showing results for "{result}"</h2>
      </div>
      <main className='media-item-container'>
        {results.map((item, i) => (
          <MediaItem key={item.data[0].nasa_id + i} {...item} />
        ))}
      </main>
    </>
  );
};
