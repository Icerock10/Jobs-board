'use client';
import styles from './Form.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import { FormButton } from '@/components/Button/FormButton/FormButton';
import { signUpOrLoginAction } from '@/lib/db/server-actions';
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
          const isErrorMessage = await signUpOrLoginAction(formData, isRegistration);
          if (isErrorMessage) return toastService.error(isErrorMessage);
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
          <FormButton isValid={isValid}>{isLogin}</FormButton>
        </div>
      </form>
    </div>
  );
};
