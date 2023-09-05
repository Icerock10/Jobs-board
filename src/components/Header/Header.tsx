import styles from './Header.module.scss';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';
import { Menu } from '@/components/Menu/Menu';
import ThemeProvider from '@/context/theme/ThemeProvider';

export const Header = async () => {
  return (
    <header className={styles.header}>
      <section className={styles.header__section}>
        <picture>
          <h1>My logo</h1>
        </picture>
        <aside className={styles.header_menu}>
          <ThemeProvider>
            <ThemeSwitcher />
          </ThemeProvider>
          <Menu />
        </aside>
      </section>
    </header>
  );
};
