'use client';
import SunIcon from '@/../public/SVG/sun.svg';
import MoonIcon from '../../../public/SVG/moon.svg';
import styles from './ThemeSwitcher.module.scss';
import clsx from 'clsx';
import BurgerIcon from '../../../public/SVG/burger.svg';
import { Menu } from '@/components/Menu/Menu';
import { UseThemeToggle } from '@/hooks/useThemeToggler';
import { Themes } from '@/utils/types/types';
import { UseVisibility } from '@/hooks/useVisibility';
import { useClickOutside } from '@/hooks/useClickOutside';
import { ToastContainer } from 'react-toastify';

export const ThemeSwitcher = ({ email }: { email?: string }) => {
  const { toggleTheme, isDarkMode } = UseThemeToggle();
  const { isMenuActive, toggleMenu, isBurgerMenuActive, toggleBurgerMenu } = UseVisibility();
  const { menuRef } = useClickOutside(toggleMenu, isMenuActive);
  const { burgerMenuRef } = useClickOutside(toggleBurgerMenu, isBurgerMenuActive);
  const themeIcon = isDarkMode === Themes.DARK ? <MoonIcon /> : <SunIcon />;
  return (
    <aside className={styles.container}>
      <ToastContainer theme={isDarkMode} />
      <figure
        data-set="switcher"
        onClick={toggleMenu}
        className={clsx(isMenuActive && styles.menu__active)}
      >
        {themeIcon}
        <div
          ref={menuRef}
          className={clsx(isMenuActive && styles.active, styles.switcher, styles.switcher__left)}
        >
          <div className={styles.switcher_toggleMenu} onClick={() => toggleTheme(Themes.LIGHT)}>Light</div>
          <div className={styles.switcher_toggleMenu} onClick={() => toggleTheme(Themes.DARK)}>Dark</div>
        </div>
      </figure>
      <figure
        onClick={toggleBurgerMenu}
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
