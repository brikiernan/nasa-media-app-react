import SearchHeader from 'components/search-header';
import { Outlet } from 'react-router-dom';

const AppLayout: React.FC = () => {
  return (
    <>
      <SearchHeader />
      <Outlet />
    </>
  );
};

export default AppLayout;
