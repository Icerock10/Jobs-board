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
export const ThemeSwitcher = () => {
  const { toggleTheme, isDarkMode } = UseThemeToggle();
  const { isMenuActive, toggleMenu, isBurgerMenuActive, toggleBurgerMenu } = UseVisibility();
  const { menuRef } = useClickOutside(toggleMenu, isMenuActive);
  const { burgerMenuRef } = useClickOutside(toggleBurgerMenu, isBurgerMenuActive);
  const themeIcon = isDarkMode === Themes.DARK ? <MoonIcon /> : <SunIcon />;
  
  return (
    <aside className={styles.container}>
      <figure
        onClick={toggleMenu}
        className={clsx(isMenuActive ? styles.menu__active : '')}
      >
        {themeIcon}
        <div ref={menuRef}
             className={clsx(isMenuActive ? styles.switcher : styles.hidden, styles.switcher_left)}>
          <div onClick={() => toggleTheme(Themes.LIGHT)}>Light</div>
          <div onClick={() => toggleTheme(Themes.DARK)}>Dark</div>
        </div>
      </figure>
      <figure
        onClick={toggleBurgerMenu}
        className={clsx(styles.burger, isBurgerMenuActive ? styles.menu__active : '')}
      >
        <BurgerIcon />
        <div ref={burgerMenuRef}>
          <Menu
            className={clsx(
              isBurgerMenuActive ? styles.switcher : styles.hidden,
              styles.switcher_center,
            )}
          />
        </div>
      </figure>
    </aside>
  );
};
