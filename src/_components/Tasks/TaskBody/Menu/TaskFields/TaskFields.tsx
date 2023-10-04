import React, { useState } from 'react';
import { taskFields } from '@/_utils/mocks/taskMenus';
import RightArrow from '../../../../../../public/SVG/right_arrow.svg';
import clsx from 'clsx';
import styles from './TaskFields.module.scss';
import { DropDown } from '@/_components/Tasks/TaskBody/Menu/TaskFields/DropDown/DropDown';
export const TaskFields = () => {
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  
  return taskFields.map(({ field, dropDownMenus }, i) => {
    return (
      <div key={`myUniqueKey-${i}`} onMouseEnter={() => setHoveredField(field)} onMouseLeave={() => setHoveredField(null)}
           className={clsx(styles.menu_item)}>
        <div className={styles.field}>{field}</div>
        <RightArrow />
        <DropDown hoveredField={hoveredField} dropDownMenus={dropDownMenus} field={field} />
      </div>
    );
  });
};