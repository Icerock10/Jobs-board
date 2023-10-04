import { createSlice } from '@reduxjs/toolkit';
import { SortingOrder, StorageKey } from '@/_utils/enums/enums';
import { storageService } from '@/_lib/services/localStorage/storage-service';
import { Task } from '@/_utils/types/types';


const initialState: { tasks: Task[], currentId?: string } = {
  tasks: [],
  currentId: '',
};

export const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setInitialTasks: (state, { payload }) => {
      state.tasks = payload;
    },
    showTaskMenu: (state, { payload }) => {
      if (payload) {
        state.currentId = payload;
        state.tasks.map(task => task._id === payload ? task.isTaskMenuShown = !task.isTaskMenuShown : task);
        return;
      }
      state.tasks.map(task => task.isTaskMenuShown = false);
    },
    markTaskDeleted: (state, { payload }) => {
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task._id === payload) {
            return {
              ...task,
              isDeleted: !task.isDeleted,
            };
          }
          return task;
        }),
      };
    },
    deleteTask: (state) => {
      state.tasks = state.tasks.filter(task => !task.isDeleted);
      storageService.setUpdatedTasks(StorageKey.TASKS, state.tasks);
    },
    createTask: (state, { payload }) => {
      storageService.setTasks(StorageKey.TASKS, payload);
    },
    editTask: (state, { payload }) => {
      const taskIndex = state.tasks.findIndex(task => task._id === payload._id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = payload;
        storageService.setUpdatedTasks(StorageKey.TASKS, state.tasks);
      }
    },
    setTasksAttributes: (state, { payload: { currentId, field, dropDownMenu } }) => {
      const lowerCasedField = field.toLowerCase();
      state.tasks.map(task => ({
        task: task._id === currentId ? (task.hasOwnProperty(lowerCasedField) ? task[lowerCasedField] = dropDownMenu : task) : task,
      }));
    },
    sortByCustomOrder: (state, { payload: { customOrder, sortingOption, sortCriteria } }) => {
      state.tasks.sort((a, b) => {
        if (!customOrder.length) {
          if (a[sortCriteria] < b[sortCriteria]) {
            return -1;
          } else if (a[sortCriteria] > b[sortCriteria]) {
            return -1;
          }
          return 0;
        }
        const aIndex = customOrder.indexOf(a[sortCriteria]);
        const bIndex = customOrder.indexOf(b[sortCriteria]);
        if (sortingOption === SortingOrder.DESCENDING) return aIndex - bIndex;
        if (sortingOption === SortingOrder.ASCENDING) return bIndex - aIndex;
        return 0;
      });
    },
    resetSort: (state) => {
      state.tasks = storageService.getItem(StorageKey.TASKS);
    },
  },
});

export const {
  deleteTask,
  setInitialTasks,
  resetSort,
  editTask,
  showTaskMenu,
  markTaskDeleted,
  setTasksAttributes,
  sortByCustomOrder,
  createTask,
} = tasks.actions;

export default tasks.reducer;
