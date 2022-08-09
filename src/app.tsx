import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLayout from 'layout/app-layout';
import Details from 'components/details';
import Home from 'components/home';
import Search from 'components/search';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/details' element={<Details />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
