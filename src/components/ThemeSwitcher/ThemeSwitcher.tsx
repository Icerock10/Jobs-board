import SunIcon from '../../../public/SVG/sun.svg';
import MoonIcon from '../../../public/SVG/moon.svg';
import { ThemeContext, themes } from '@/context/theme/ThemeContext';
import styles from './ThemeSwitcher.module.scss';
import clsx from 'clsx';
import BurgerIcon from '../../../public/SVG/burger.svg';
import { useContext, useState } from 'react';
import { Menu } from '@/components/Menu/Menu';
export const ThemeSwitcher = () => {
  const [active, setActive] = useState<boolean>(false);
  const [isBurgerDropActive, setIsBurgerDropActive] = useState<boolean>(false);
  const { theme, setTheme }: any = useContext(ThemeContext);
  return (
    <aside className={styles.container}>
      <figure
        className={clsx(active ? styles.menu__active : '')}
        onClick={() => setActive(!active)}
      >
        {theme === 'light' ? <SunIcon /> : <MoonIcon />}
      </figure>
      <figure
        onClick={() => setIsBurgerDropActive(!isBurgerDropActive)}
        className={clsx(styles.burger, isBurgerDropActive ? styles.menu__active : '')}
      >
        <BurgerIcon />
        <Menu
          className={clsx(
            isBurgerDropActive ? styles.switcher : styles.hidden,
            styles.switcher_center,
          )}
        />
      </figure>
      <div className={clsx(active ? styles.switcher : styles.hidden, styles.switcher_left)}>
        <div onClick={() => setTheme(themes.light)}>Light</div>
        <div onClick={() => setTheme(themes.dark)}>Dark</div>
      </div>
    </aside>
  );
};
