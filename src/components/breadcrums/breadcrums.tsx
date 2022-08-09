import { Link } from 'react-router-dom';
import './breadcrums.css';

type BreadcrumsProps = {
  nasa_id?: string;
  search?: string;
};

export const Breadcrums: React.FC<BreadcrumsProps> = props => {
  const { nasa_id, search } = props;

  return (
    <nav id='breadcrums-nav'>
      <Link to='/'>Home</Link>
      <p>{'>'}</p>
      {search ? <Link to={search}>Media Search</Link> : <p>Media Search</p>}
      {nasa_id && (
        <>
          <p>{'>'}</p>
          <p>{nasa_id}</p>
        </>
      )}
    </nav>
  );
};
