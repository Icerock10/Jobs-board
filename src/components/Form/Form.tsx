'use client';
import styles from './Form.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import { FormButton } from '@/components/Button/FormButton/FormButton';
import { Input } from '@/components/FormInput/Input';
import { useValidation } from '@/hooks/useValidation';
import { useClientActions } from '@/hooks/useClientActions';

export const Form = ({ isRegistration }: { isRegistration?: boolean }) => {
  const isLogin = isRegistration ? 'Sign up' : 'Log In';
  const { isValid, handleFieldChange } = useValidation(isRegistration);
  const { submitRegistrationOrLoginForm } = useClientActions();
  return (
    <div className={styles.container}>
      <form
        action={formData => submitRegistrationOrLoginForm(formData, isRegistration)}
        className={styles.form}
      >
        <h2>{isLogin}</h2>
        <p className={styles.text_sm}>
          You can use any email and password to log in to the demo version
        </p>
        <div className={styles.input_group}>
          <Input value='' handleChange={handleFieldChange} labelText='Email' name='email' type='text' />
          <Input value='' handleChange={handleFieldChange} labelText='Password' name='password' type='password' />
          {isRegistration && (
            <Input value='' handleChange={handleFieldChange} labelText='Confirm' name='confirm' type='password' />
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
