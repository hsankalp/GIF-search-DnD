import { useState, useEffect } from "react";

export function useDebounce(searchField, delay) {
  const [value, setValue] = useState(searchField);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(searchField);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [searchField, delay]);

  return value;
}
