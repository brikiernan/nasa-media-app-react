import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RuxButton,
  RuxGlobalStatusBar,
  RuxInput,
  RuxSwitch,
} from '@astrouxds/react';

import { useAppContext } from 'providers';
import { useTheme } from 'hooks';
import './search-header.css';

export const SearchHeader: React.FC = () => {
  const { label, onChange } = useTheme();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { setSearch } = useAppContext();

  const handleChange = (event: any) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const search = `/search?q=${query}`;
    navigate(search);
    setSearch(search);
    setQuery('');
  };

  return (
    <RuxGlobalStatusBar
      username="Search NASA's image, video, and audio archives"
      appDomain='Nasa'
      appName='Media Search'
      slot='app-meta'
    >
      <form onSubmit={handleSubmit} id='search-form'>
        <RuxInput
          id='search-input'
          type='text'
          size='large'
          placeholder='Enter search term like... (Mars rover)'
          value={query}
          onRuxchange={handleChange}
        />
        <RuxButton
          iconOnly
          secondary
          size='large'
          icon='search'
          type='submit'
        />
      </form>
      <RuxSwitch slot='right-side' label={label} onRuxchange={onChange} />
    </RuxGlobalStatusBar>
  );
};
