import styles from './Header.module.scss';
import { ThemeSwitcher } from '@/_components/ThemeSwitcher/ThemeSwitcher';
import { Menu } from '@/_components/Menu/Menu';
export const dynamic = 'force-dynamic';
import ThemeProvider from '@/_context/theme/ThemeProvider';
import { cookiesService } from '@/_lib/services/cookies/cookies-service';
import { Logo } from '@/_components/Logo/Logo';
import { userService } from '@/_lib/services/api/user-service';
import { cookies } from 'next/headers';

export const Header = async () => {
  const token = cookiesService.getToken()
  const response = await userService.getAuthUser(token);
  console.log(response);
  console.log(token);
  console.log(cookies().get('token')?.value);
  return (
    <header className={styles.header}>
      <section className={styles.header__section}>
        <Logo />
        Should be email{JSON.stringify(response?.data)}
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
