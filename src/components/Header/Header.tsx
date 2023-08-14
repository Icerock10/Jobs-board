import styles from './Header.module.scss';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';
import { Menu } from '@/components/Menu/Menu';

export const Header = () => {
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
