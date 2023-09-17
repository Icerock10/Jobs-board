'use client';
import SunIcon from '@/../public/SVG/sun.svg';
import MoonIcon from '../../../public/SVG/moon.svg';
import styles from './ThemeSwitcher.module.scss';
import clsx from 'clsx';
import BurgerIcon from '../../../public/SVG/burger.svg';
import { Menu } from '@/_components/Menu/Menu';
import { UseThemeToggle } from '@/_hooks/useThemeToggler';
import { Themes } from '@/_utils/types/types';
import { useVisibility } from '@/_hooks/useVisibility';
import { useClickOutside } from '@/_hooks/useClickOutside';
import { ToastContainer } from 'react-toastify';

export const ThemeSwitcher = ({ email }: { email?: string }) => {
  const { toggleTheme, isDarkMode } = UseThemeToggle();
  const { isSwitcherMenuActive, toggleMenu, isBurgerMenuActive, toggleBurger } = useVisibility();
  const { switcherMenuRef } = useClickOutside(toggleMenu, isSwitcherMenuActive);
  const { burgerMenuRef } = useClickOutside(toggleBurger, isBurgerMenuActive);
  const themeIcon = isDarkMode === Themes.DARK ? <MoonIcon /> : <SunIcon />;
  return (
    <aside className={styles.container}>
      <ToastContainer theme={isDarkMode} />
      <figure
        data-set="switcher"
        onClick={toggleMenu}
        className={clsx(isSwitcherMenuActive && styles.menu__active)}
      >
        {themeIcon}
        <div
          ref={switcherMenuRef}
          className={clsx(isSwitcherMenuActive && styles.active, styles.switcher, styles.switcher__left)}
        >
          <div className={styles.switcher_toggleMenu} onClick={() => toggleTheme(Themes.LIGHT)}>Light</div>
          <div className={styles.switcher_toggleMenu} onClick={() => toggleTheme(Themes.DARK)}>Dark</div>
        </div>
      </figure>
      <figure
        onClick={toggleBurger}
        className={clsx(styles.burger, isBurgerMenuActive && styles.menu__active)}
      >
        <BurgerIcon />
        <div ref={burgerMenuRef}>
          <Menu
            email={email}
            className={clsx(
              isBurgerMenuActive && styles.burger_active,
              styles.switcher,
              styles.switcher_center,
            )}
          />
        </div>
      </figure>
    </aside>
  );
};
