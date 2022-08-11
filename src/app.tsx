import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppProvider } from 'providers';
import { Path } from 'types';
import AppLayout from 'layout/app-layout';
import Details from 'components/details';
import Home from 'components/home';
import Search from 'components/search';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={Path.home} element={<Home />} />
          <Route path={Path.search} element={<Search />} />
          <Route path={Path.details} element={<Details />} />
        </Route>
      </Routes>
    </AppProvider>
  </BrowserRouter>
);

export default App;
