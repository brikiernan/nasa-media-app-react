import { createContext, useContext, useState } from 'react';

import { Children } from 'types';

type AppContextProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const AppContext = createContext<AppContextProps>({
  search: '',
  setSearch: () => undefined,
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<Children> = ({ children }) => {
  const [search, setSearch] = useState<string>('');

  const value: AppContextProps = {
    search,
    setSearch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
