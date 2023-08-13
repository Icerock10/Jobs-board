'use client';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';
import { Menu } from '@/components/Menu/Menu';

export const Header = () => {
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
        <aside className={styles.header__menu}>
          <ThemeSwitcher />
          <Menu className={styles.menu__hidden} />
        </aside>
      </section>
    </header>
  );
};
