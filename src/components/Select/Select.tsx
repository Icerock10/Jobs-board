import styles from './Select.module.scss';
import React, { useState } from 'react';
import ArrowUp from '@/../public/SVG/chevron_up.svg';
import ArrowDown from '@/../public/SVG/chevron_down.svg';
import CheckMark from '@/../public/SVG/checkmark.svg';
import clsx from 'clsx';
import { formatFields } from '@/utils/helpers/formatFields';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useVisibility } from '@/hooks/useVisibility';

export type SelectProps = {
  options: string[];
  fieldName: string;
  register: any;
  setValue: any
  isDbField?: string
};

export const Select = ({ options, fieldName, register, setValue, isDbField }: SelectProps) => {
  const [firstSelectOption] = options;
  const [selected, setSelected] = useState(isDbField ? isDbField : firstSelectOption);
  const { isSelectMenuOpen, toggleSelectMenu } = useVisibility();
  const { selectMenuRef } = useClickOutside(toggleSelectMenu, isSelectMenuOpen);
  
   return (
    <>
      <label htmlFor={fieldName}>{formatFields(fieldName)}</label>
      <button
        id={fieldName}
        onClick={e => {
          e.preventDefault();
          toggleSelectMenu();
        }}
        className={styles.select_button}
      >
        <span className={styles.select_button__text}>{selected}</span>
        {isSelectMenuOpen ? <ArrowUp /> : <ArrowDown />}
      </button>
      <input type="hidden" id={fieldName} {...register(fieldName)}/>
      <ul
        ref={selectMenuRef}
        className={clsx(styles.options, isSelectMenuOpen ? styles.active : '')}
      >
        {options.map((option, i) => {
          return (
            <li
              onClick={() => {
                setSelected(option);
                setValue(fieldName, option)
                toggleSelectMenu();
              }}
              key={i}
            >
              <span className={styles.options_item}>
                <span className={styles.options_item__checkmark}>
                  {selected === option ? <CheckMark /> : null}
                </span>
                {option}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
};
