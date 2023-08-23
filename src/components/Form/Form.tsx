import React from 'react';
import styles from './Form.module.scss';
import Link from 'next/link';
import clsx from 'clsx';

export const Form = ({ isRegister, action }: { isRegister?: boolean, action: (data: FormData) => void }) => {
  const isLogin = isRegister ? 'Sign up' : 'Log In';
  return (
    <form action={action} className={styles.container}>
      <div className={styles.form}>
        <h2>{isLogin}</h2>
        <p className={styles.text__sm}>
          You can use any email and password to log in to the demo version
        </p>
        <div className={styles.input__group}>
          <label htmlFor="email">Email</label>
          <input name="email" id="email" type="text" />
          <label htmlFor="password"> Password</label>
          <input name="password" id="password" type="password" />
          {isRegister && (
            <React.Fragment>
              <label htmlFor="confirm"> Confirm Password</label>
              <input name="confirm" id="confirm" type="password" />
            </React.Fragment>
          )}
        </div>
        <div className={styles.button__group}>
          <Link className={styles.link} href={'/jobs'}>
            Cancel
          </Link>
          <Link className={clsx(styles.link, styles.link_bordered)} href={isRegister ? '/login' : '/signup'}>
            {isRegister ? 'Login' : 'Sign Up'}
          </Link>
          <button className={styles.login}>{isLogin}</button>
        </div>
      </div>
    </form>
  );
};
