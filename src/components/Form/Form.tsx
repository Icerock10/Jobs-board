'use client';
import styles from './Form.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '@/components/LoadingButton/Button';
import { signUpOrLoginAction } from '@/lib/db/_actions';
import { Input } from '@/components/FormInput/Input';
import { useValidation } from '@/hooks/useValidation';
import { toastService } from '@/lib/toast/toastr-service';

export const Form = ({ isRegistration }: { isRegistration?: boolean }) => {
  const isLogin = isRegistration ? 'Sign up' : 'Log In';
  const { isValid, handleFieldChange } = useValidation(isRegistration);

  return (
    <div className={styles.container}>
      <form
        action={async formData => {
          const response = await signUpOrLoginAction(formData, isRegistration);
          toastService.error(response);
        }}
        className={styles.form}
      >
        <h2>{isLogin}</h2>
        <p className={styles.text_sm}>
          You can use any email and password to log in to the demo version
        </p>
        <div className={styles.input_group}>
          <Input handleChange={handleFieldChange} name="email" type="text" />
          <Input handleChange={handleFieldChange} name="password" type="password" />
          {isRegistration && (
            <Input handleChange={handleFieldChange} name="confirm" type="password" />
          )}
        </div>
        <div className={styles.button_group}>
          <Link className={styles.link} href={'/jobs'}>
            Cancel
          </Link>
          <Link
            className={clsx(styles.link, styles.link_bordered)}
            href={isRegistration ? '/login' : '/signup'}
          >
            {isRegistration ? 'Login' : 'Sign Up'}
          </Link>
          <Button isLogin={isLogin} isValid={isValid} />
        </div>
      </form>
    </div>
  );
};
