import { useState } from "react";

export const useLocalStorage = (keyName) => {
  const [storedValue, setStoredValue] = useState(() => {
    const value = localStorage.getItem(keyName);
    if (value) {
      return value;
    } else {
      return null;
    }
  });
  const setValue = (newValue) => {
    try {
      localStorage.setItem(keyName, newValue);
    } catch (err) {
      console.error(err);
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
