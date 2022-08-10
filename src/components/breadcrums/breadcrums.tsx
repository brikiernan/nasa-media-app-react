import { Link } from 'react-router-dom';
import { Path } from 'types';
import './breadcrums.css';

type BreadcrumsProps = {
  nasa_id?: string;
  search?: string;
};

export const Breadcrums: React.FC<BreadcrumsProps> = ({ nasa_id, search }) => (
  <nav id='breadcrums-nav'>
    <Link to={Path.home}>Home</Link>
    {search && (
      <>
        <p>{'>'}</p>
        <Link to={search}>Media Search</Link>
      </>
    )}
    {nasa_id && (
      <>
        <p>{'>'}</p>
        <p>{nasa_id}</p>
      </>
    )}
  </nav>
);
