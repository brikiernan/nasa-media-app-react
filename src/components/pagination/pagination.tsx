import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppContext } from 'providers';
import { setSearchUrl } from 'lib/utils';
import PaginationItem from './pagination-item';
import './pagination.css';

export const Pagination: React.FC = () => {
  const [paginated, setPaginated] = useState<any[]>([]);
  const { pages: count, params } = useAppContext();
  const page = +params.page;
  const isPageOne = page === 1;
  const isLastPage = page === count;

  useEffect(() => {
    const hrefs: string[] = [];
    for (let i = 0; count > i; i++) {
      const page = (i + 1).toString();
      const searchUrl = setSearchUrl({ ...params, page });
      hrefs.push(searchUrl);
    }

    setPaginated(hrefs);
  }, [count, params]);

  if (!count) return null;

  return (
    <nav id='pagination'>
      <Link
        className={isPageOne ? 'link-disabled' : ''}
        to={setSearchUrl({ ...params, page: String(page - 1) })}
      >
        {'< '}Prev
      </Link>
      <ul>
        {paginated.map((href, i) => {
          const max = 5;
          const pageNumber = i + 1;
          const isCurrentPage = page === pageNumber;
          const isFirstPage = i === 0;
          const isLastPage = i === count - 1;
          const isRightBeforeLastPage = i === count - 2;
          const isRightAfterCurrentPage = page + 1 === pageNumber;
          const isRightBeforeCurrentPage = page - 1 === pageNumber;

          if (isCurrentPage) {
            return <li key={pageNumber}>{pageNumber}</li>;
          }

          if (count <= 7) {
            return <PaginationItem key={href} href={href} page={pageNumber} />;
          }

          if (page >= max && pageNumber === 2) {
            return (
              <li className='ellipsis' key={pageNumber}>
                ...
              </li>
            );
          }

          if (
            isRightBeforeCurrentPage ||
            isRightAfterCurrentPage ||
            isFirstPage ||
            isLastPage
          ) {
            return <PaginationItem key={href} href={href} page={pageNumber} />;
          }

          if (
            (page >= max && pageNumber === 3) ||
            (page >= max && pageNumber === 4) ||
            (page >= max && pageNumber === 5)
          ) {
            return null;
          }

          if (
            pageNumber <= max ||
            (isRightBeforeLastPage && page === count - 3) ||
            ((pageNumber === count - 4 ||
              pageNumber === count - 3 ||
              pageNumber === count - 2) &&
              page > count - 4)
          ) {
            return <PaginationItem key={href} href={href} page={pageNumber} />;
          }

          if (isRightBeforeLastPage) {
            return (
              <li className='ellipsis' key={pageNumber}>
                ...
              </li>
            );
          }

          return null;
        })}
      </ul>
      <Link
        className={isLastPage ? 'link-disabled' : ''}
        to={setSearchUrl({ ...params, page: String(page + 1) })}
      >
        Next{' >'}
      </Link>
    </nav>
  );
};
