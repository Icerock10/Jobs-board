'use client';
import { ReactNode, useEffect, useState } from 'react';
import { ThemeContext } from '@/context/theme/ThemeContext';
import { getInitialTheme } from '@/utils/getTheme';
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(getInitialTheme);
  
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
