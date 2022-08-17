import { useEffect } from 'react';

import { debounce, getCookie, setCookie } from 'lib/utils';

export const useScroll = (cookieName: string) => {
  useEffect(() => {
    const cookie = getCookie(cookieName);
    if (cookie) {
      const top = parseInt(cookie);
      const time = setTimeout(() => window.scrollTo({ top }), 0);

      return () => clearTimeout(time);
    }
  }, [cookieName]);

  useEffect(() => {
    const debounced = debounce(() => setCookie(cookieName, window.scrollY));
    window.addEventListener('scroll', debounced);

    return () => window.removeEventListener('scroll', debounced);
  }, [cookieName]);
};
