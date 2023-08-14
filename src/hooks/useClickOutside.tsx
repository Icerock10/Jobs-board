import { useEffect, useRef, RefObject } from 'react';

interface Refs {
  menuRef: RefObject<HTMLDivElement>;
  burgerMenuRef: RefObject<HTMLDivElement>;
}

export const useClickOutside = (handler: () => void, isMenuActive: boolean): Refs => {
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isMenuActive) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (menuRef.current && !menuRef.current.contains(target)) {
          handler();
        }
        if (burgerMenuRef.current && !burgerMenuRef.current.contains(target)) {
          handler();
        }
      };
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
    return;
  }, [handler]);
  return {
    menuRef,
    burgerMenuRef,
  };
};