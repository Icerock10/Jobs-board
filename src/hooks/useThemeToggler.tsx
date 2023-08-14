import { useContext } from 'react';
import { DarkModeContext, SetDarkModeContext } from '@/context/theme/ThemeContext';
import { Theme } from '@/types/types';
export const UseThemeToggle = () => {
  const setTheme  = useContext(SetDarkModeContext)
  const isDarkMode = useContext(DarkModeContext)
  const toggleTheme = (currentTheme: Theme) => {
    setTheme(currentTheme)
  }
  
  return {
    toggleTheme,
    isDarkMode
  }
};