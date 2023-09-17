'use client';
import { ReactNode } from 'react';
import { DarkModeContext, SetDarkModeContext } from '@/_context/theme/ThemeContext';
import { useLocalStorage } from '@/_hooks/useLocalStorage';
import { Theme, Themes } from '@/_utils/types/types';
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', Themes.DARK)
  return (
    <DarkModeContext.Provider value={theme}>
      <SetDarkModeContext.Provider value={setTheme}>
        {children}
      </SetDarkModeContext.Provider>
    </DarkModeContext.Provider>
  )
};

export default ThemeProvider;
