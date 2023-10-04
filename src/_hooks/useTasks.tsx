import { useAppDispatch, useAppSelector } from '@/_hooks/reduxHooks';
import { useCallback, useEffect } from 'react';
import { storageService } from '@/_lib/services/localStorage/storage-service';
import { setInitialTasks, showTaskMenu } from '@/store/tasks/taskSlice';
import { mockTasksData } from '@/_utils/mocks/mockTasksData';
import { StorageKey } from '@/_utils/enums/enums';

export const useTasks = () => {
  const { tasks } = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();
  const toggleTaskMenu = useCallback((id?: string) => dispatch(showTaskMenu(id)), [dispatch]);
 
  useEffect(() => {
    const storageTasks = storageService.getItem(StorageKey.TASKS)
    if (!storageTasks || !storageTasks.length) {
      storageService.setTasks(StorageKey.TASKS, mockTasksData)
      const updatedTasks = storageService.getItem(StorageKey.TASKS)
      dispatch(setInitialTasks(updatedTasks));
      return;
    }
    dispatch(setInitialTasks(storageTasks));
  }, [dispatch]);
  
  return {
    tasks,
    toggleTaskMenu,
  };
};