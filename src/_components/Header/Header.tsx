import styles from './Header.module.scss';
import { ThemeSwitcher } from '@/_components/ThemeSwitcher/ThemeSwitcher';
import { Menu } from '@/_components/Menu/Menu';
import ThemeProvider from '@/_context/theme/ThemeProvider';
import { Logo } from '@/_components/Logo/Logo';
import { cookies } from 'next/headers';
import { userService } from '@/_lib/services/api/user-service';
export const dynamic = 'force-dynamic';
export const Header = async () => {
  const token = cookies().get('token')?.value;
  const response = await userService.getAuthUser(token)
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
