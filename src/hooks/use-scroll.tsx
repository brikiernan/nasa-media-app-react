import { useEffect } from 'react';

import { debounce } from 'lib/utils';
import { useAppContext } from 'providers';

export const useScroll = (pageName: string) => {
  const { positions, setPositions } = useAppContext();

  useEffect(() => {
    const { home, search } = positions;
    const isHome = pageName === 'home';

    const top = isHome ? home : search;
    const timeout = isHome ? 0 : 100;
    const time = setTimeout(() => window.scrollTo({ top }), timeout);

    return () => clearTimeout(time);
  }, [pageName, positions]);

  useEffect(() => {
    const debounced = debounce(() => {
      setPositions(prev => {
        if (pageName === 'home') {
          return { ...prev, home: window.scrollY };
        }

        return { ...prev, search: window.scrollY };
      });
    });

    window.addEventListener('scroll', debounced);

    return () => window.removeEventListener('scroll', debounced);
  }, [pageName, setPositions]);
};
