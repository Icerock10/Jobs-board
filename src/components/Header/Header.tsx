import styles from './Header.module.scss';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';
import { Menu } from '@/components/Menu/Menu';
import ThemeProvider from '@/context/theme/ThemeProvider';
import { cookies } from 'next/headers';
import { authService } from '@/lib/api-requests/auth-service';

export const Header = async () => {
  const token = cookies().get('token')?.value;
  const response = await authService.getAuthUser(token);
  return (
    <header className={styles.header}>
      <section className={styles.header__section}>
        <picture>
          <h1>My logo</h1>
        </picture>
        <aside className={styles.header_menu}>
          <ThemeProvider>
            <ThemeSwitcher email={response?.data.email} />
          </ThemeProvider>
          <Menu email={response?.data.email} />
        </aside>
      </section>
    </header>
  );
};
