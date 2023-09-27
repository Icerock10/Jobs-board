import { useCallback, useState } from 'react';
export const useIndex = () => {
  const [index, setIndex] = useState(-1);
  
  const toggleSelectedSortMenu = useCallback((index?: number) => {
    setIndex((prev) => {
      if (index === undefined) return -1;
      return prev === index ? -1 : index;
    });
  }, [setIndex]);
  return {
    index,
    toggleSelectedSortMenu
  }
};