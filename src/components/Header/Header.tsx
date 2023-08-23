import styles from './Header.module.scss';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';
import { Menu } from '@/components/Menu/Menu';
import ThemeProvider from '@/context/theme/ThemeProvider';
import { cookies } from 'next/headers';
import { authService } from '@/lib/api-requests/auth-service';

export const Header = async () => {
  const token = cookies().get('token')?.value;
  const email = await authService.getAuthUser(token)
  return (
    <header className={styles.header}>
      <section className={styles.header__section}>
        <picture>
          <h1>My logo</h1>
        </picture>
        <aside className={styles.header__menu}>
          <ThemeProvider><ThemeSwitcher /></ThemeProvider>
          <Menu className={styles.menu__hidden} email={email}/>
        </aside>
      </section>
    </header>
  );
};
