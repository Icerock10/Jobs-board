'use client';
import styles from './tasks.module.scss';
import { useAppSelector } from '@/_hooks/reduxHooks';
import SortIcon from '@/../public/SVG/sortIcon.svg'

export default function Tasks() {
  const { tasks } = useAppSelector(state => state.tasks);
  const tableHeadMock = ['Title', 'Status', 'Priority', 'Category']
  return (
    <div className={styles.table}>
      <div className={styles.table_head}>
        {tableHeadMock.map((item, i) => {
          return <div className={styles.table_head__item} key={i}>{item} <SortIcon /></div>
        })}
      </div>
      {[...Array(tasks.length)].map((_, i) => {
        return (
          <div className={styles.table_body} key={i}>
            {tasks.map((item, i) => {
              return (
                <>
                  <div key={i}>{item.title}</div>
                  <div key={i}>{item.todo}</div>
                  <div key={i}>{item.priority}</div>
                  <div key={i}>{item.category}</div>
                  <div>...</div>
                </>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};