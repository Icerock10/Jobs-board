'use client';
import styles from './Form.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import { FormButton } from '@/_components/Button/FormButton/FormButton';
import { Input } from '@/_components/FormInput/Input';
import { useClientActions } from '@/_hooks/useClientActions';
import { useForm } from 'react-hook-form';

export const Form = ({ isRegistration }: { isRegistration?: boolean }) => {
  const isLogin = isRegistration ? 'Sign up' : 'Log In';
  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
    watch,
    register,
  } = useForm();
  
  const { submitRegistrationOrLoginForm } = useClientActions();
  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit((data) => submitRegistrationOrLoginForm(data, isRegistration))}
        className={styles.form}
      >
        <h2>{isLogin}</h2>
        <p className={styles.text_sm}>
          You can use any email and password to log in to the demo version
        </p>
        <div className={styles.input_group}>
          <Input register={register} name='email' labelText='Email' type='text' />
          <Input register={register} name='password' labelText='Password' type='password' />
          {isRegistration && (
            <Input watch={watch} register={register} name='confirm' labelText='Confirm' type='password' />
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
          <FormButton isValid={isValid} isSubmitting={isSubmitting}>{isLogin}</FormButton>
        </div>
      </form>
    </div>
  );
};
