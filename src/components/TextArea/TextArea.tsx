import styles from './TextArea.module.scss'
import clsx from 'clsx';

export type TextAreaProps = {
  fieldName: string
  labelText: string
}

export const TextArea = ({fieldName, labelText}: TextAreaProps) => {
  return (
    <div className={clsx(styles.form_textarea, fieldName === 'fullDescription' && styles.form_textarea__full)}>
      <label htmlFor={fieldName}>{labelText}</label>
      <textarea
        className={clsx(styles.textarea)}
        name={fieldName}
        id={fieldName}
        maxLength={200}
      ></textarea>
      {fieldName === 'shortDescription' && <p className={styles.tooltip}>Max 200 characters</p>}
    </div>
  );
};