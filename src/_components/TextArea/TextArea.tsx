import styles from './TextArea.module.scss';
import clsx from 'clsx';
import { IListing } from '@/_utils/types/types';
import { UseFormRegister } from 'react-hook-form';

export type TextAreaProps = {
  fieldName: string
  labelText: string
  register: UseFormRegister<IListing>
}

export const TextArea = ({ fieldName, labelText, register }: TextAreaProps) => {
  return (
    <div className={clsx(styles.form_textarea, fieldName === 'fullDescription' && styles.form_textarea__full)}>
      <label htmlFor={fieldName}>{labelText}</label>
      <textarea
        className={clsx(styles.textarea)}
        id={fieldName}
        maxLength={200}
        {...register(fieldName, {
          required: { value: true, message: 'Field is Required' },
        })}
      ></textarea>
      {fieldName === 'shortDescription' && <p className={styles.tooltip}>Max 200 characters</p>}
    </div>
  );
};