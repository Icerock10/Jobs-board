import { useAppDispatch, useAppSelector } from '@/_hooks/reduxHooks';
import { useCallback, useEffect } from 'react';
import { setInitialTasks, showTaskMenu } from '@/store/tasks/taskSlice';
import { mockTasksData } from '@/_utils/mocks/mockTasksData';

export const useTasks = () => {
  const { tasks } = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();
  const toggleTaskMenu = useCallback((id?: string) => dispatch(showTaskMenu(id)), [dispatch]);
  
  useEffect(() => {
    const storageTasks = localStorage.getItem('tasks');
    if(!storageTasks) {
      localStorage.setItem('tasks', JSON.stringify(mockTasksData))
      const updatedTasks = localStorage.getItem('tasks')
      dispatch(setInitialTasks(updatedTasks ? JSON.parse(updatedTasks) : []))
      return;
    }
    const parsedTasks = JSON.parse(storageTasks)
    dispatch(setInitialTasks(parsedTasks.length ? parsedTasks : mockTasksData))
    
  }, [dispatch]);
  
  return {
    tasks,
    toggleTaskMenu,
  };
};