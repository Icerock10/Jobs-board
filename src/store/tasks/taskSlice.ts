import { createSlice, current } from '@reduxjs/toolkit';
import { mockTasksData } from '@/_utils/mocks/tasks';
import { manageLocalStorageItems } from '@/_utils/helpers/manageLocalStorageItems';


interface Task {
  title: string;
  status: string;
  priority: string;
  category: string;
  _id: string;
  isTaskMenuShown: boolean;
  
  [key: string]: any;
}

const storageTasks = localStorage.getItem('tasks');

const initialState: { tasks: Task[], currentId?: string, originalTasks: Task[] } = {
  tasks: storageTasks ? JSON.parse(storageTasks) : [],
  originalTasks: storageTasks ? JSON.parse(storageTasks) : [],
  currentId: '',
};

export const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    showTaskMenu: (state, { payload }) => {
      if (payload) {
        state.currentId = payload;
        state.tasks.map(task => task._id === payload ? task.isTaskMenuShown = !task.isTaskMenuShown : task);
        return;
      }
      state.tasks.map(task => task.isTaskMenuShown = false);
    },
    deleteTask: (state, { payload }) => {
      state.tasks = state.tasks.filter(task => task._id !== payload);
    },
    createTask: (state, { payload }) => {
      manageLocalStorageItems('tasks', payload)
      return {
        ...state,
        tasks: [...state.tasks, payload],
      };
    },
    editTask: (state, { payload }) => {
      const taskIndex = state.tasks.findIndex(task => task._id === payload._id);
      if(taskIndex !== -1) {
        state.tasks[taskIndex] = payload
        state.originalTasks = [...state.tasks]
      }
    },
    setTasksAttributes: (state, { payload: { currentId, field, dropDownMenu } }) => {
      const lowerCasedField = field.toLowerCase();
      state.tasks.map(task => ({
        task: task._id === currentId ? (task.hasOwnProperty(lowerCasedField) ? task[lowerCasedField] = dropDownMenu : task) : task,
      }));
    },
    sortBy: (state, { payload: { customOrder, sortingOption, sortCriteria } }) => {
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
        if (sortingOption === 'Desc') return aIndex - bIndex;
        if (sortingOption === 'Asc') return bIndex - aIndex;
        return 0;
      });
    },
    resetSort: (state) => {
      state.tasks = state.originalTasks;
    },
  },
});

export const { resetSort, editTask, showTaskMenu, deleteTask, setTasksAttributes, sortBy, createTask } = tasks.actions;

export default tasks.reducer;
