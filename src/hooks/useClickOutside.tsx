import { useEffect, useRef, RefObject } from 'react';

interface Refs {
  menuRef: RefObject<HTMLDivElement>;
  burgerMenuRef: RefObject<HTMLDivElement>;
  profileMenuRef: RefObject<HTMLDivElement>;
  dropDownRef: RefObject<HTMLDivElement>;
  modalRef: RefObject<HTMLDivElement>;
}

export const useClickOutside = (callback: () => void, isMenuActive: boolean): Refs => {
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const dropDownRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (isMenuActive) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const isSwitcher = target.closest('figure')?.getAttribute('data-set') === 'switcher';
        if (menuRef.current && !menuRef.current.contains(target)) {
          if(isSwitcher) return;
          callback();
        }
        const isEmail = target.closest('div')?.textContent?.includes('@')
        if (burgerMenuRef.current && !burgerMenuRef.current.contains(target) && !isEmail) {
          if(isEmail) return;
          callback();
        }
        if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
          callback();
        }
        if (modalRef.current && target.getAttribute('class')?.includes('container')) {
          callback()
        }
        const isButton = target.closest('button');
        if (dropDownRef.current && !dropDownRef.current.contains(target)) {
          if(isButton) return;
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
    profileMenuRef,
    dropDownRef,
    modalRef
  };
};