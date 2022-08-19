import { Link } from 'react-router-dom';

type PaginationItemProps = {
  href: string;
  page: number;
};

export const PaginationItem: React.FC<PaginationItemProps> = props => {
  const { href, page } = props;

  return (
    <li>
      <Link to={href}>{page}</Link>
    </li>
  );
};
