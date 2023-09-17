import styles from './Header.module.scss';
import { ThemeSwitcher } from '@/_components/ThemeSwitcher/ThemeSwitcher';
import { Menu } from '@/_components/Menu/Menu';
import ThemeProvider from '@/_context/theme/ThemeProvider';
import { authService } from '@/_lib/api-requests/auth-service';
import { cookiesService } from '@/_lib/cookies/cookies-service';
import { Logo } from '@/_components/Logo/Logo';

export const Header = async () => {
  const token = cookiesService.getToken()
  const response = token ? await authService.getAuthUser(token) : null;
  return (
    <header className={styles.header}>
      <section className={styles.header__section}>
        <Logo />
        <aside className={styles.header_menu}>
          <ThemeProvider>
            <ThemeSwitcher email={response?.data?.email}/>
          </ThemeProvider>
          <Menu email={response?.data?.email}/>
        </aside>
      </section>
    </header>
  );
};
