import { Link } from 'react-router-dom';
import { Path } from 'types';
import './breadcrumbs.css';

type BreadcrumbsProps = {
  id?: string;
  search?: string;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ id, search }) => (
  <nav id='breadcrumbs-nav'>
    <Link to={Path.home}>Home</Link>
    {search && (
      <>
        <p>{'>'}</p>
        <Link to={search}>Media Search</Link>
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
