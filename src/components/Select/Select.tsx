import styles from './Select.module.scss';
import { useState } from 'react';
import ArrowUp from '@/../public/SVG/chevron_up.svg';
import ArrowDown from '@/../public/SVG/chevron_down.svg';
import CheckMark from '@/../public/SVG/checkmark.svg';
import clsx from 'clsx';
import { capitalizeFirstLetter } from '@/utils/helpers/capitalizeFirstLetter';
import { useClickOutside } from '@/hooks/useClickOutside';

export const Select = ({ options, name }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const toggleSelectMenu = () => {
    setIsOpen(!isOpen);
  };
  const { selectMenuRef } = useClickOutside(toggleSelectMenu, isOpen);

  const handleSelectChange = (option: any) => {
    setSelected(option);
  };
  return (
    <>
      <label htmlFor={name}>{capitalizeFirstLetter(name)}</label>
      <button
        id={name}
        onClick={e => {
          e.preventDefault();
          toggleSelectMenu();
        }}
        className={styles.select_button}
      >
        <span className={styles.select_button__text}>{selected}</span>
        {isOpen ? <ArrowUp /> : <ArrowDown />}
      </button>
      <input type="hidden" name={name} value={selected} />
      <ul ref={selectMenuRef} className={clsx(styles.options, isOpen ? styles.active : '')}>
        {options.map((option: any, i: number) => {
          return (
            <li
              onClick={() => {
                handleSelectChange(option);
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
