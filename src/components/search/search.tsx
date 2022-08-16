import { useAppContext } from 'providers';
import { useScroll } from 'hooks';
import Loading from 'components/loading';
import MediaFilter from 'components/media-filter';
import Breadcrumbs from 'components/breadcrumbs';
import MediaItem from 'components/media-item';
import './search.css';

export const Search: React.FC = () => {
  const { isLoading, pages, params, results, search } = useAppContext();
  useScroll('search-scroll-position');

  if (isLoading) return <Loading />;

  return (
    <section id='search-container'>
      <MediaFilter />
      <div>
        <Breadcrumbs {...{ search }} />
        <div id='search-results'>
          {!!results.length ? (
            <div id='search-meta'>
              <h2>Showing results for "{params.q}":</h2>
              <p>
                Displaying page {params.page} of {pages}
              </p>
            </div>
          ) : (
            <h2>No results found.</h2>
          )}
        </div>
        <main id='search-results-container'>
          {results.map((item, i) => (
            <MediaItem key={item.data[0].nasa_id + i} {...item} />
          ))}
        </main>
      </div>
    </section>
  );
};
