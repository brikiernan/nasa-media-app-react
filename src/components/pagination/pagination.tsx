import { usePagination, UsePaginationProps } from 'hooks';
import PaginationItem, { PaginationItemProps } from '../pagination-item';
import './pagination.css';

type PaginationProps = UsePaginationProps & {
  renderItem?: (props: PaginationItemProps) => React.ReactNode;
};

export const Pagination: React.FC<PaginationProps> = props => {
  const {
    renderItem = itemProps => <PaginationItem {...itemProps} />,
    ...rest
  } = props;

  const items = usePagination(rest);

  return (
    <nav id='pagination'>
      <ul>
        {items.map((item, i) => (
          <li key={i}>{renderItem({ ...item })}</li>
        ))}
      </ul>
    </nav>
  );
};
