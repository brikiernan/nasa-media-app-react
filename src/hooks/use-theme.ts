import { useEffect, useState } from 'react';

const darkClass = 'dark-theme';
const darkLabel = 'Dark Theme';
const lightClass = 'light-theme';
const lightLabel = 'Light Theme';
const initialTheme = { className: darkClass, label: darkLabel };

export const useTheme = () => {
  const [theme, setTheme] = useState(initialTheme);

  const onChange = () => {
    setTheme(prev => {
      if (prev.className === darkClass) {
        return { className: lightClass, label: lightLabel };
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

  return { onChange, label: theme.label };
};
