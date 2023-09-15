import styles from './TextArea.module.scss'
import clsx from 'clsx';
import { IListing } from '@/utils/types/types';
import { useState } from 'react';

export type TextAreaProps = {
  fieldName: string
  labelText: string
  handleChange: (field: string, value: string) => void
  listingFromDb?: IListing
}

export const TextArea = ({listingFromDb, fieldName, labelText, handleChange}: TextAreaProps) => {
  const [textAreaValue, setTextAreaValue] = useState(listingFromDb ? listingFromDb[fieldName]: '')
  return (
    <div className={clsx(styles.form_textarea, fieldName === 'fullDescription' && styles.form_textarea__full)}>
      <label htmlFor={fieldName}>{labelText}</label>
      <textarea
        className={clsx(styles.textarea)}
        name={fieldName}
        id={fieldName}
        onChange={e => {
          setTextAreaValue(e.target.value)
          handleChange(fieldName, e.target.value)
        }}
        maxLength={200}
        value={textAreaValue}
      ></textarea>
      {fieldName === 'shortDescription' && <p className={styles.tooltip}>Max 200 characters</p>}
    </div>
  );
};