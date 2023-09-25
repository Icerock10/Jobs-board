'use client';
import styles from './tasks.module.scss';
import { useAppDispatch, useAppSelector } from '@/_hooks/reduxHooks';
import SortIcon from '@/../public/SVG/sortIcon.svg';
import { showTaskMenu, deleteTask } from '@/store/tasks/taskSlice';
import clsx from 'clsx';
import { useClickOutside } from '@/_hooks/useClickOutside';
const tableHeadMock = ['Title', 'Status', 'Priority', 'Category'];

export default function Tasks() {
  const { tasks } = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch()
  const toggleTaskMenu = (id?: string) => dispatch(showTaskMenu(id))
  
  return (
    <div className={styles.table}>
      <div className={styles.table_head}>
        {tableHeadMock.map((item, i) => {
          return <div className={styles.table_head__item} key={i}>{item} <SortIcon /></div>;
        })}
      </div>
      {tasks.map((item, i) => {
        return (
          <div className={styles.table_body} key={i}>
            <div>{item.title}</div>
            <div>{item.todo}</div>
            <div>{item.priority}</div>
            <div>{item.category}</div>
            <div onClick={() => toggleTaskMenu(item._id)} className={styles.dots}>
              <div>...</div>
              <Menu toggleTaskMenu={toggleTaskMenu} isMenuShown={item?.isTaskMenuShown} id={item._id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Menu = ({ toggleTaskMenu, isMenuShown, id }: { toggleTaskMenu: () => void, isMenuShown: boolean, id?: string }) => {
  const dispatch = useAppDispatch();
  const { taskMenuRef } = useClickOutside(toggleTaskMenu, isMenuShown)
  return (
    <div ref={taskMenuRef} onClick={toggleTaskMenu} className={clsx(styles.menu, isMenuShown && styles.menu_active)}>
      <div className={styles.menu_item}><span>Edit</span></div>
      <div onClick={() => dispatch(deleteTask(id))} className={styles.menu_item}><span>Delete</span></div>
    </div>
  );
};