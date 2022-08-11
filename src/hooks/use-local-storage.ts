import { useState, useEffect } from 'react';

const setDefaultValue = <T>(key: string, defaultValue: T): T => {
  let value = defaultValue;
  try {
    value = JSON.parse(
      window.localStorage.getItem(key) || String(defaultValue)
    );
  } catch (error) {
    value = defaultValue;
  }

  return value;
};

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

const useLocalStorage = <T>(key: string, defaultValue: T): [T, SetState<T>] => {
  const [state, setState] = useState<T>(setDefaultValue<T>(key, defaultValue));

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
};

export default useLocalStorage;
