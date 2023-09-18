'use client';
import styles from './Header.module.scss';
import { ThemeSwitcher } from '@/_components/ThemeSwitcher/ThemeSwitcher';
import { Menu } from '@/_components/Menu/Menu';
import ThemeProvider from '@/_context/theme/ThemeProvider';
import { Logo } from '@/_components/Logo/Logo';
import { userService } from '@/_lib/services/api/user-service';
import cookies from 'js-cookie';
import { useCallback, useEffect, useState } from 'react';
export const Header = () => {
  const token = cookies.get('token')
  const [email, setEmail] = useState('')
  
  const getAuthEmail = useCallback(async () => {
    const emailFromServer = await userService.getAuthUser(token)
    setEmail(emailFromServer?.data?.email)
  }, [token])
  
  useEffect(() => {
    void getAuthEmail()
  }, [getAuthEmail])
  
  
  return (
    <header className={styles.header}>
      <section className={styles.header__section}>
        <Logo />
        <aside className={styles.header_menu}>
          <ThemeProvider>
            <ThemeSwitcher email={email}/>
          </ThemeProvider>
          <Menu email={email}/>
        </aside>
      </section>
    </header>
  );
};
