import { createSlice } from '@reduxjs/toolkit';
import { mockTasksData } from '@/_utils/mocks/tasks';

interface Task {
  title: string;
  status: string;
  priority: string;
  category: string;
  _id: string;
  isTaskMenuShown: boolean;
  [key: string]: any;
}

const initialState: { tasks: Task[], currentId?: string, originalTasks: Task[] } = {
  tasks: mockTasksData,
  originalTasks: mockTasksData,
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

export const { resetSort, showTaskMenu, deleteTask, setTasksAttributes, sortBy } = tasks.actions;

export default tasks.reducer;
