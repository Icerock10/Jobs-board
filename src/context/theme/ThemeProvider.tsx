'use client';
import { ReactNode } from 'react';
import { DarkModeContext, SetDarkModeContext } from '@/context/theme/ThemeContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Theme, Themes } from '@/types/types';
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
