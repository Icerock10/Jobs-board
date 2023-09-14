import styles from './Select.module.scss';
import { useEffect, useState } from 'react';
import ArrowUp from '@/../public/SVG/chevron_up.svg';
import ArrowDown from '@/../public/SVG/chevron_down.svg';
import CheckMark from '@/../public/SVG/checkmark.svg';
import clsx from 'clsx';
import { formatFields } from '@/utils/helpers/formatFields';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useVisibility } from '@/hooks/useVisibility';

export type SelectProps = {
  options: string[];
  name: string;
  handleChange: (field: string, value: string) => void;
};

export const Select = ({ options, name, handleChange }: SelectProps) => {
  const [selected, setSelected] = useState(options[0]);
  const { isSelectMenuOpen, toggleSelectMenu } = useVisibility();
  const { selectMenuRef } = useClickOutside(toggleSelectMenu, isSelectMenuOpen);
  
  useEffect(() => {
    handleChange(name, selected);
  }, [selected, handleChange, name]);

  return (
    <>
      <label htmlFor={name}>{formatFields(name)}</label>
      <button
        id={name}
        onClick={e => {
          e.preventDefault();
          toggleSelectMenu();
        }}
        className={styles.select_button}
      >
        <span className={styles.select_button__text}>{selected}</span>
        {isSelectMenuOpen ? <ArrowUp /> : <ArrowDown />}
      </button>
      <input type="hidden" name={name} value={selected} />
      <ul
        ref={selectMenuRef}
        className={clsx(styles.options, isSelectMenuOpen ? styles.active : '')}
      >
        {options.map((option, i) => {
          return (
            <li
              onClick={() => {
                setSelected(option);
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
