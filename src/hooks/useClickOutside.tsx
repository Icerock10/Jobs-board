import { useEffect, useRef, RefObject } from 'react';

interface Refs {
  menuRef: RefObject<HTMLDivElement>;
  burgerMenuRef: RefObject<HTMLDivElement>;
}

export const useClickOutside = (callback: () => void, isMenuActive: boolean): Refs => {
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isMenuActive) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (menuRef.current && !menuRef.current.contains(target)) {
          callback();
        }
        if (burgerMenuRef.current && !burgerMenuRef.current.contains(target)) {
          callback();
        }
      };
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }
    return;
  }, [isMenuActive, callback]);
  return {
    menuRef,
    burgerMenuRef,
  };
};