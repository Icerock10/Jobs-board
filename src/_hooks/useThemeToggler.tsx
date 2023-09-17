import { useContext } from 'react';
import { DarkModeContext, SetDarkModeContext } from '@/_context/theme/ThemeContext';
import { Theme } from '@/_utils/types/types';
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