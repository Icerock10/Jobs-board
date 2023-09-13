import styles from './TextArea.module.scss'
import clsx from 'clsx';

export type TextAreaProps = {
  fieldName: string
  labelText: string
  handleChange: (field: string, value: string) => void
}

export const TextArea = ({fieldName, labelText, handleChange}: TextAreaProps) => {
  return (
    <div className={clsx(styles.form_textarea, fieldName === 'fullDescription' && styles.form_textarea__full)}>
      <label htmlFor={fieldName}>{labelText}</label>
      <textarea
        className={clsx(styles.textarea)}
        name={fieldName}
        id={fieldName}
        onChange={e => handleChange(fieldName, e.target.value)}
        maxLength={200}
      ></textarea>
      {fieldName === 'shortDescription' && <p className={styles.tooltip}>Max 200 characters</p>}
    </div>
  );
};