'use client';
import Link from 'next/link';
import styles from './Header.module.scss';
import Image from 'next/image';
import MoonIcon from '../../../public/SVG/moon.svg';
import SunIcon from '../../../public/SVG/sun.svg';
import BurgerIcon from '../../../public/SVG/burger.svg';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext, themes } from '@/context/theme/ThemeContext';

export const Header = () => {
  const [active, setActive] = useState<boolean>(false);
  const { theme, setTheme }: any = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <header className={styles.header}>
      <section className={styles.header__section}>
        <picture>
          <h1>My logo</h1>
        </picture>
        <nav className={styles.header__menu}>
          <aside>
            <picture onClick={() => setActive(!active)}>
              {theme === 'light' ? (
                <SunIcon />
              ) : (
                <MoonIcon />
              )}
              <div className={active ? styles.header__menu_active : styles.hidden}>
                <p onClick={() => setTheme(themes.light)}>Light</p>
                <p onClick={() => setTheme(themes.dark)}>Dark</p>
              </div>
            </picture>
            <picture className={styles.menu__burger}>
              <BurgerIcon />
            </picture>
          </aside>
          <div className={styles.menu__hidden}>
            <Link href="/"> Task Board</Link>
            <Link href="/jobs">Job Listings</Link>
            <Link href="/">Login</Link>
          </div>
        </nav>
      </section>
    </header>
  );
};
