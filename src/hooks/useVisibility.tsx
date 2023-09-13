import { useReducer } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  toggleBurgerMenu,
  toggleProfileMenu as toggleProfileMenuAction,
  toggleSwitcherMenu,
} from '@/store/visibility/visibilitySlice';

export const useVisibility = () => {
  const dispatch = useAppDispatch();
  const { isProfileMenuShown, isSwitcherMenuActive, isBurgerMenuActive } = useAppSelector(
    state => state.visibility,
  );
  const [isDraftMenuOpen, toggleDraftMenu] = useReducer((isOpen) => !isOpen, false);
  const toggleMenu = () => dispatch(toggleSwitcherMenu());
  const toggleBurger = () => dispatch(toggleBurgerMenu());
  const toggleProfileMenu = () => dispatch(toggleProfileMenuAction());

  return {
    isSwitcherMenuActive,
    toggleMenu,
    isBurgerMenuActive,
    toggleBurger,
    toggleProfileMenu,
    isProfileMenuShown,
    isDraftMenuOpen,
    toggleDraftMenu
  };
};