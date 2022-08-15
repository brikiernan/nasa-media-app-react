import { Outlet } from 'react-router-dom';
import SearchHeader from 'components/search-header';

const AppLayout: React.FC = () => (
  <>
    <SearchHeader />
    <Outlet />
  </>
);

export default AppLayout;
