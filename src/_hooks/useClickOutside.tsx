import { useEffect, useRef, RefObject } from 'react';

interface Refs {
  switcherMenuRef: RefObject<HTMLDivElement>;
  burgerMenuRef: RefObject<HTMLDivElement>;
  profileMenuRef: RefObject<HTMLDivElement>;
  draftMenuRef: RefObject<HTMLDivElement>;
  modalRef: RefObject<HTMLDivElement>;
  selectMenuRef: RefObject<HTMLUListElement>;
  taskMenuRef: RefObject<HTMLDivElement>;
  sortMenuRef: RefObject<HTMLDivElement>;
  introRef: RefObject<HTMLDivElement>;
}

export const useClickOutside = (callback: () => void, isMenuActive: boolean): Refs => {
  const switcherMenuRef = useRef<HTMLDivElement>(null);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const draftMenuRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const selectMenuRef = useRef<HTMLUListElement>(null);
  const taskMenuRef = useRef<HTMLDivElement>(null);
  const sortMenuRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isMenuActive) {
      document.body.style.pointerEvents = 'none';
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (switcherMenuRef.current && !switcherMenuRef.current.contains(target)) {
          callback();
        }
        if (burgerMenuRef.current && !burgerMenuRef.current.contains(target)) {
          callback();
        }
        if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
          callback();
        }
        if (selectMenuRef.current && !selectMenuRef.current.contains(target)) {
          callback();
        }
        if (modalRef.current && target.getAttribute('class')?.includes('container')) {
          callback();
        }
        if (draftMenuRef.current && !draftMenuRef.current.contains(target)) {
          callback();
        }
        if (taskMenuRef.current && !taskMenuRef.current.contains(target)) {
          callback();
        }
        if (sortMenuRef.current && !sortMenuRef.current.contains(target)) {
          callback();
        }
        if (introRef.current && !introRef.current.contains(target)) {
          callback();
        }
      };
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.body.style.pointerEvents = 'auto';
        document.removeEventListener('click', handleClickOutside);
      };
    }
    return;
  }, [isMenuActive, callback]);
  return {
    switcherMenuRef,
    burgerMenuRef,
    profileMenuRef,
    draftMenuRef,
    modalRef,
    selectMenuRef,
    taskMenuRef,
    sortMenuRef,
    introRef
  };
};