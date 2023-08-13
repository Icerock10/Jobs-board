import { themes } from '@/context/theme/ThemeContext';
export const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const theme = `${window.localStorage.getItem('theme')}`;
    if (Object.values(themes).includes(theme)) return theme;
  }
  return themes.light;
};