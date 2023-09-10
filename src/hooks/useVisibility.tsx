import { useState } from 'react';

export const UseVisibility = () => {
  const [isMenuActive, setMenuActive] = useState<boolean>(false);
  const [isBurgerMenuActive, setBurgerMenu] = useState<boolean>(false);
  const [isProfileMenuShown, setIsProfileMenuShown] = useState<boolean>(false);
  const toggleMenu = () => setMenuActive(!isMenuActive);
  const toggleBurgerMenu = () => setBurgerMenu(!isBurgerMenuActive);
  const toggleProfileMenu = () => setIsProfileMenuShown(!isProfileMenuShown);
  
  return {
    isMenuActive,
    toggleMenu,
    isBurgerMenuActive,
    toggleBurgerMenu,
    toggleProfileMenu,
    isProfileMenuShown
  };
};