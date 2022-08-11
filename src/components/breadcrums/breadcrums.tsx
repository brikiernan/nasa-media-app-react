import { Link } from 'react-router-dom';
import { Path } from 'types';
import './breadcrums.css';

type BreadcrumsProps = {
  id?: string;
  search?: string;
};

export const Breadcrums: React.FC<BreadcrumsProps> = ({ id, search }) => (
  <nav id='breadcrums-nav'>
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
