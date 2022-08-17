import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppContext } from 'providers';
import { setSearchUrl } from 'lib/utils';
import './pagination.css';

export const Pagination: React.FC = () => {
  const [paginated, setPaginated] = useState<string[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const { pages, params } = useAppContext();
  const currentPage = +params.page;
  const isPageOne = currentPage === 1;
  const isLastPage = currentPage === pages;

  useEffect(() => {
    /**
     * This string array should be passed in as a prop
     * to make the component reusable.
     **/
    const hrefs: string[] = [];
    for (let i = 0; pages > i; i++) {
      const page = (i + 1).toString();
      const searchUrl = setSearchUrl({ ...params, page });
      hrefs.push(searchUrl);
    }
    /* end */

    setPaths(hrefs);
    const truncatedHrefs = [...hrefs.slice(0, 4), '...', ...hrefs.slice(-2)];
    setPaginated(truncatedHrefs);
  }, [pages, params]);

  if (!!!pages) return null;

  return (
    <ul id='pagination'>
      {!isPageOne && (
        <li>
          <Link to={setSearchUrl({ ...params, page: String(currentPage - 1) })}>
            {'< '}Prev
          </Link>
        </li>
      )}
      {paginated.map(href => {
        const page = paths.indexOf(href) + 1;
        const isCurrentPage = page === +params.page;

        return (
          <li key={href}>
            {page ? (
              isCurrentPage ? (
                page
              ) : (
                <Link to={href}>{page}</Link>
              )
            ) : (
              <span>{href}</span>
            )}
          </li>
        );
      })}
      {!isLastPage && (
        <li>
          <Link to={setSearchUrl({ ...params, page: String(currentPage + 1) })}>
            Next{' >'}
          </Link>
        </li>
      )}
    </ul>
  );
};
