import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import type { Children, Collection, Item, SearchParams } from 'types';
import { imagesApi, imagesAssets, initialParams, Path } from 'lib/const';
import { client } from 'lib/client';

type AppContextProps = {
  isLoading: boolean;
  isPopular: boolean;
  items: Item[];
  pages: number;
  params: SearchParams;
  popular: Item[];
  recent: Item[];
  results: Item[];
  searchError: string;
  setIsPopular: React.Dispatch<React.SetStateAction<boolean>>;
  setParams: React.Dispatch<React.SetStateAction<SearchParams>>;
};

const AppContext = createContext<AppContextProps>({
  isLoading: false,
  isPopular: false,
  items: [],
  pages: 0,
  params: initialParams,
  popular: [],
  recent: [],
  results: [],
  searchError: '',
  setIsPopular: () => undefined,
  setParams: () => undefined,
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<Children> = ({ children }) => {
  const location = useLocation();
  const [items, setItems] = useState<Item[]>([]);
  const [popular, setPopular] = useState<Item[]>([]);
  const [recent, setRecent] = useState<Item[]>([]);
  const [results, setResults] = useState<Item[]>([]);
  const [defaultItemsLength, setDefaultItemsLength] = useState(-1);
  const [isPopular, setIsPopular] = useState(false);
  const [params, setParams] = useState(initialParams);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

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
    if (!!location.search) {
      setSearchError('');
      setPages(0);
      setResults([]);
      setIsLoading(true);
      const urlParams = new URLSearchParams(location.search);
      const search = urlParams.toString();
      const endpoint = `${imagesApi}${Path.search}?${search}`;

      const fetch = async () => {
        try {
          const results = await client.get<Collection>(endpoint);

          setItems(prev => [
            ...prev.slice(0, defaultItemsLength),
            ...results.collection.items,
          ]);

          setResults(results.collection.items);
          setPages(prev => results.collection.metadata?.total_hits || prev);
        } catch (error: any) {
          setSearchError(error.reason || error.message);
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetch();
    }
  }, [defaultItemsLength, location.search]);

  useEffect(() => {
    if (location.search) {
      const urlParams = new URLSearchParams(location.search).entries();

      for (const urlParam of urlParams) {
        setParams(prev => ({ ...prev, [urlParam[0]]: urlParam[1] }));
      }
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
    searchError,
    setIsPopular,
    setParams,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
