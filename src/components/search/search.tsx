import { Link } from 'react-router-dom';

import { useAppContext } from 'providers';
import { useScroll } from 'hooks';
import { setSearchUrl } from 'lib/utils';
import Loading from 'components/loading';
import MediaFilter from 'components/media-filter';
import Breadcrumbs from 'components/breadcrumbs';
import MediaItem from 'components/media-item';
import Pagination from 'components/pagination';
import PaginationItem from 'components/pagination-item';
import './search.css';

export const Search: React.FC = () => {
  // prettier-ignore
  const { isLoading, pages, params, results, searchError } = useAppContext();
  useScroll('search');

  if (isLoading) return <Loading />;

  return (
    <section id='search-container'>
      <MediaFilter />
      <div id='search-wrapper'>
        <header>
          <Breadcrumbs />
          <div>
            {!!results.length ? (
              <div id='search-meta'>
                <h2>Showing results for "{params.q}":</h2>
                <p>
                  Displaying page {params.page} of {pages}
                </p>
              </div>
            ) : searchError ? (
              <h3 id='search-error'>{searchError}</h3>
            ) : (
              <h2>No results found.</h2>
            )}
          </div>
        </header>
        <main>
          {results.map((item, i) => (
            <MediaItem key={item.data[0].nasa_id + i} {...item} />
          ))}
        </main>
        <footer>
          <Pagination
            count={pages}
            page={+params.page}
            inner={2}
            renderItem={item => (
              <PaginationItem {...item}>
                <Link to={setSearchUrl({ ...params, page: String(item.page) })}>
                  {item.page}
                </Link>
              </PaginationItem>
            )}
          />
        </footer>
      </div>
    </section>
  );
};
