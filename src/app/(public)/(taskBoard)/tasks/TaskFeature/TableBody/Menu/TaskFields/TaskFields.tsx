import React, { useState } from 'react';
import { taskFields } from '@/_utils/mocks/taskMenus';
import RightArrow from '@/../public/SVG/right_arrow.svg';
import clsx from 'clsx';
import styles from './TaskFields.module.scss';
import { DropDown } from '@/app/(public)/(taskBoard)/tasks/TaskFeature/TableBody/Menu/TaskFields/Dropdown/DropDown';
export const TaskFields = () => {
  const [hoveredField, setHoveredField] = useState<string | null>(null);
    const handleMouseEnter = (field: string | null) => {
    setHoveredField(field);
  };
  const handleMouseLeave = () => {
    setHoveredField(null);
  };
  
  return taskFields.map(({ field, dropDownMenus }, i) => {
    return (
      <div key={i} onMouseEnter={() => handleMouseEnter(field)} onMouseLeave={handleMouseLeave}
           className={clsx(styles.menu_item)}>
        <div className={styles.field}>{field}</div>
        <RightArrow />
        <DropDown hoveredField={hoveredField} dropDownMenus={dropDownMenus} field={field} />
      </div>
    );
  });
};