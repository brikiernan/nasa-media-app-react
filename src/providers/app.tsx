import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Children, Collection, Item, Path } from 'types';
import { imagesApi, imagesAssets } from 'lib/const';
import { client } from 'lib/client';

type AppContextProps = {
  isPopular: boolean;
  items: Item[];
  popular: Item[];
  recent: Item[];
  result: string;
  results: Item[];
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setIsPopular: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextProps>({
  isPopular: true,
  items: [],
  popular: [],
  recent: [],
  result: '',
  results: [],
  search: '',
  setSearch: () => undefined,
  setIsPopular: () => undefined,
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<Children> = ({ children }) => {
  const location = useLocation();
  const isSearch = !!location.search;
  const query = isSearch ? Path.search + location.search : '';
  const result = !!query ? query.split('=')[1].split('%20').join(' ') : '';
  const [search, setSearch] = useState(query);
  const [items, setItems] = useState<Item[]>([]);
  const [popular, setPopular] = useState<Item[]>([]);
  const [recent, setRecent] = useState<Item[]>([]);
  const [results, setResults] = useState<Item[]>([]);
  const [defaultItemsLength, setDefaultItemsLength] = useState(-1);
  const [isPopular, setIsPopular] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [recent, popular] = await Promise.all([
          client.get<Collection>(`${imagesAssets}/recent.json`),
          client.get<Collection>(`${imagesAssets}/popular.json`),
        ]);

        setRecent(recent.collection.items);
        setPopular(popular.collection.items);
        const items = [...recent.collection.items, ...popular.collection.items];
        setItems(items);
        setDefaultItemsLength(items.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    if (!!search) {
      const fetch = async () => {
        try {
          const results = await client.get<Collection>(imagesApi + search);

          setItems(prev => [
            ...prev.slice(0, defaultItemsLength),
            ...results.collection.items,
          ]);

          setResults(results.collection.items);
          // console.log('[RESULTS]', results);
        } catch (error) {
          console.log(error);
        }
      };

      fetch();
    }
  }, [defaultItemsLength, search]);

  // useEffect(() => console.log('[ITEMS]', items), [items]);

  const value: AppContextProps = {
    isPopular,
    items,
    popular,
    recent,
    result,
    results,
    search,
    setSearch,
    setIsPopular,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
