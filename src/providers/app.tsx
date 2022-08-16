import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import type { Children, Collection, Item } from 'types';
import { imagesApi, imagesAssets, initialParams, Path } from 'lib/const';
import { client } from 'lib/client';

type Params = typeof initialParams;

type AppContextProps = {
  isLoading: boolean;
  isPopular: boolean;
  items: Item[];
  pages: number;
  params: Params;
  popular: Item[];
  recent: Item[];
  results: Item[];
  search: string;
  setIsPopular: React.Dispatch<React.SetStateAction<boolean>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const AppContext = createContext<AppContextProps>({
  isLoading: false,
  isPopular: true,
  items: [],
  pages: 0,
  params: initialParams,
  popular: [],
  recent: [],
  results: [],
  search: '',
  setIsPopular: () => undefined,
  setSearch: () => undefined,
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<Children> = ({ children }) => {
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [popular, setPopular] = useState<Item[]>([]);
  const [recent, setRecent] = useState<Item[]>([]);
  const [results, setResults] = useState<Item[]>([]);
  const [defaultItemsLength, setDefaultItemsLength] = useState(-1);
  const [isPopular, setIsPopular] = useState(true);
  const [params, setParams] = useState(initialParams);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isSearch = !!location.search;
    if (isSearch) {
      setSearch(Path.search + location.search);
    }
  }, [location.search]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    if (!!search) {
      const fetch = async () => {
        try {
          setIsLoading(true);
          const results = await client.get<Collection>(imagesApi + search);

          setItems(prev => [
            ...prev.slice(0, defaultItemsLength),
            ...results.collection.items,
          ]);

          setResults(results.collection.items);
          setPages(results.collection.metadata?.total_hits || 0);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetch();
    }
  }, [defaultItemsLength, search, location]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search).entries();

    for (const urlParam of urlParams) {
      setParams(prev => ({ ...prev, [urlParam[0]]: urlParam[1] }));
    }
  }, [location.search]);

  const value: AppContextProps = {
    isLoading,
    isPopular,
    items,
    pages: Math.ceil(pages / 100),
    params,
    popular,
    recent,
    results,
    search,
    setIsPopular,
    setSearch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
