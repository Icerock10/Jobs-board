'use client';
import styles from './tasks.module.scss';
import { useAppDispatch, useAppSelector } from '@/_hooks/reduxHooks';
import SortIcon from '@/../public/SVG/sortIcon.svg';
import {
  showTaskMenu,
  deleteTask,
  setTasksAttributes,
  sortByCriteria,
  loadTasksMock,
  resetSort,
} from '@/store/tasks/taskSlice';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useClickOutside } from '@/_hooks/useClickOutside';
import { useCallback, useState } from 'react';
import { taskMenusMock } from '@/_utils/mocks/taskMenus';

const tableHeadMock = ['Title', 'Status', 'Priority', 'Category'];
const mockTasksData = [{
  title: 'My cool Title',
  status: 'Todo',
  priority: 'High',
  category: 'Work',
  _id: 'as1dfh23gg234add2',
  isTaskMenuShown: false,
},
  {
    title: 'Title 2',
    status: 'In Progress',
    priority: 'Medium',
    category: 'Personal',
    _id: 'as1dfh23gg234aaaa',
    isTaskMenuShown: false,
  },
  {
    title: 'Title 3',
    status: 'Done',
    priority: 'Low',
    category: 'Work',
    _id: 'as1dfhaaaadd23gg234aaaa',
    isTaskMenuShown: false,
  },
  {
    title: 'Title 4',
    status: 'Done',
    priority: 'High',
    category: 'Personal',
    _id: 'as1dfhaaaadd23gg234aaaasds1132323',
    isTaskMenuShown: false,
  },]

export default function Tasks() {
  const { tasks } = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();
  const toggleTaskMenu = useCallback((id?: string) => dispatch(showTaskMenu(id)), [dispatch]);
  const [index, setIndex] = useState(-1);
  
  useEffect(() => {
    dispatch(loadTasksMock(mockTasksData))
  }, [dispatch])
  
  const toggleSelectedSortMenu = (index?: number) => setIndex(prev => {
    if (!index && index !== 0) return -1;
    if (prev === index) {
      return -1;
    }
    return index;
  });
  
  return (
    <div className={styles.table}>
      <div className={styles.table_head}>
        {tableHeadMock.map((item, i) => {
          const isSelected = index === i;
          return (
            <React.Fragment key={i}>
              <div onClick={() => toggleSelectedSortMenu(i)}
                   className={clsx(styles.table_head__item, isSelected && styles.table_head__item_active)}>
                {item}
                <SortIcon />
                <SortMenu isSelected={isSelected} toggleSelectedSortMenu={toggleSelectedSortMenu} criteria={item}/>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      {tasks.map((item) => {
        return (
          <div className={styles.table_body} key={item._id}>
            <div>{item.title}</div>
            <div>{item.status}</div>
            <div>{item.priority}</div>
            <div>{item.category}</div>
            <div onClick={() => toggleTaskMenu(item._id)} className={styles.dots}>
              <div>...</div>
              <Menu toggleTaskMenu={toggleTaskMenu} isMenuShown={item?.isTaskMenuShown} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Menu = ({ toggleTaskMenu, isMenuShown }: {
  toggleTaskMenu: () => void,
  isMenuShown: boolean,
}) => {
  const dispatch = useAppDispatch();
  const { currentId } = useAppSelector(state => state.tasks);
  const { taskMenuRef } = useClickOutside(toggleTaskMenu, isMenuShown);
  return (
    <div ref={taskMenuRef} className={clsx(styles.menu, isMenuShown && styles.menu_active)}>
      <StatusMenu />
      <div className={styles.menu_item}><span>Edit</span></div>
      <div onClick={() => dispatch(deleteTask(currentId))} className={styles.menu_item}><span>Delete</span></div>
    </div>
  );
};

const StatusMenu = () => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const { tasks, currentId } = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();
  const handleMouseEnter = (menu: string | null) => {
    setHoveredMenu(menu);
  };
  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };
  
  return taskMenusMock.map(({ menu, dropDownMenus }, i) => {
    return (
      <div key={i} onMouseEnter={() => handleMouseEnter(menu)} onMouseLeave={handleMouseLeave}
           className={clsx(styles.menu_item)}>
        <div>{menu}</div>
        <div className={clsx(styles.status, hoveredMenu === menu && styles.status_active)}>
          {dropDownMenus.map((dropDownMenu, index) => {
            const isSelectedAttribute = tasks.find(task => task._id === currentId && task[menu.toLowerCase()] === dropDownMenu);
            return (
              <div onClick={() => dispatch(setTasksAttributes({ currentId, menu, dropDownMenu }))}
                   className={clsx(styles.status_item, isSelectedAttribute && styles.status_marker)}
                   key={`---${index}`}>
                <span>{dropDownMenu}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  });
};

const SortMenu = ({ isSelected, toggleSelectedSortMenu, criteria }: {
  isSelected: boolean,
  toggleSelectedSortMenu: () => void,
  criteria: string
}) => {
  const { sortMenuRef } = useClickOutside(toggleSelectedSortMenu, isSelected);
  const dispatch = useAppDispatch()
  return (
    <div ref={sortMenuRef} className={clsx(styles.sort, isSelected && styles.sort_active)}>
      <div onClick={(e) => dispatch(sortByCriteria({criteria, targetText: e.currentTarget.textContent}))}>Asc</div>
      <div onClick={(e) => dispatch(sortByCriteria({criteria, targetText: e.currentTarget.textContent}))}>Desc</div>
      <div onClick={() => dispatch(resetSort())}>Clear Sort</div>
    </div>
  );
};












