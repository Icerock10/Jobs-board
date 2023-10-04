import styles from './Header.module.scss';
import { ThemeSwitcher } from '@/_components/ThemeSwitcher/ThemeSwitcher';
import { Menu } from '@/_components/Menu/Menu';
import ThemeProvider from '@/_context/theme/ThemeProvider';
import { Logo } from '@/_components/Logo/Logo';
import { cookies } from 'next/headers';
import { jwtService } from '@/_lib/services/token/jwtService';

export const Header = async () => {
  const token = cookies().get('token')?.value;
  const response = token ? await jwtService.verify(token) : null;
  return (
    <header className={styles.header}>
      <section className={styles.header__section}>
        <Logo />
        <aside className={styles.header_menu}>
          <ThemeProvider>
            <ThemeSwitcher email={response?.email}/>
          </ThemeProvider>
          <Menu email={response?.email}/>
        </aside>
      </section>
    </header>
  );
};
