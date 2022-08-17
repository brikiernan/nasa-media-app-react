import { Link } from 'react-router-dom';

import { useAppContext } from 'providers';
import { Path } from 'lib/const';
import { setSearchUrl } from 'lib/utils';
import './breadcrumbs.css';

type BreadcrumbsProps = { id?: string };

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ id }) => {
  const { params } = useAppContext();

  return (
    <nav id='breadcrumbs-nav'>
      <Link to={Path.home}>Home</Link>
      {!!params.q && (
        <>
          <p>{'>'}</p>
          <Link to={setSearchUrl({ ...params, page: id ? params.page : '1' })}>
            Media Search
          </Link>
        </>
      )}
      {id && (
        <>
          <p>{'>'}</p>
          <p>{id}</p>
        </>
      )}
    </nav>
  );
};
