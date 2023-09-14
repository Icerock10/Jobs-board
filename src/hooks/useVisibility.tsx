import { useReducer } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  toggleBurgerMenu, toggleModal,
  toggleProfileMenu as toggleProfileMenuAction,
  toggleSwitcherMenu,
} from '@/store/visibility/visibilitySlice';

export const useVisibility = () => {
  const dispatch = useAppDispatch();
  const { isProfileMenuShown, isSwitcherMenuActive, isBurgerMenuActive, isModalShown } = useAppSelector(
    state => state.visibility,
  );
  const [isDraftMenuOpen, toggleDraftMenu] = useReducer((isOpen) => !isOpen, false);
  const [isSelectMenuOpen, toggleSelectMenu] = useReducer((isOpen) => !isOpen, false);
  const toggleMenu = () => dispatch(toggleSwitcherMenu());
  const toggleBurger = () => dispatch(toggleBurgerMenu());
  const toggleProfileMenu = () => dispatch(toggleProfileMenuAction());
  const toggleModalAction = () => dispatch(toggleModal());

  return {
    isSwitcherMenuActive,
    toggleMenu,
    isBurgerMenuActive,
    toggleBurger,
    toggleProfileMenu,
    isProfileMenuShown,
    isDraftMenuOpen,
    toggleDraftMenu,
    isSelectMenuOpen,
    toggleSelectMenu,
    toggleModalAction,
    isModalShown
  };
};