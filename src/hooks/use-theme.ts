import { useEffect } from 'react';
import useLocalStorage from './use-local-storage';

const darkClass = 'dark-theme';
const darkIcon = 'brightness-3';
const lightClass = 'light-theme';
const lightIcon = 'wb-sunny';
const initialTheme = { className: darkClass, icon: darkIcon };

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage('astro-theme', initialTheme);

  const onChange = () => {
    setTheme(prev => {
      if (prev.className === darkClass) {
        return { className: lightClass, icon: lightIcon };
      }
      return initialTheme;
    });
  };

  useEffect(() => {
    let body = document.querySelector('body');

    if (body) {
      body.className = theme.className;
    }
  }, [theme]);

  return { icon: theme.icon, onChange };
};
