import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RuxGlobalStatusBar,
  RuxIcon,
  RuxInput,
  RuxSwitch,
} from '@astrouxds/react';

import { useAppContext } from 'providers';
import { useTheme } from 'hooks';
import './search-header.css';

export const SearchHeader: React.FC = () => {
  const { icon, onChange } = useTheme();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { setSearch } = useAppContext();

  const handleChange = (event: any) => {
    setQuery(event.target.value);
  };

  const handleSubmit = () => {
    const search = `/search?q=${query}`;
    navigate(search);
    setSearch(search);
    setQuery('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLRuxInputElement>) => {
    if (event.key !== 'Enter') return;
    handleSubmit();
  };

  return (
    <RuxGlobalStatusBar
      username="Search NASA's image, video, and audio archives"
      appDomain='Nasa'
      appName='Media Search'
      slot='app-meta'
    >
      <RuxInput
        id='search-input'
        type='search'
        size='large'
        placeholder='Enter search term like... "Mars rover"... and press enter'
        value={query}
        onRuxinput={handleChange}
        onKeyDown={handleKeyDown}
      />
      <aside id='theme-switch' slot='right-side'>
        <RuxSwitch onRuxchange={onChange} checked={icon === 'wb-sunny'} />
        <RuxIcon icon={icon} size='small' />
      </aside>
    </RuxGlobalStatusBar>
  );
};
