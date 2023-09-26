import { createSlice } from '@reduxjs/toolkit';
import { current } from '@reduxjs/toolkit';

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
  tasks: [],
  originalTasks: [],
  currentId: '',
};

export const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadTasksMock: (state, {payload}) => {
      state.tasks = payload;
      state.originalTasks = payload;
    },
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
    setTasksAttributes: (state, { payload: { currentId, menu, dropDownMenu } }) => {
      const lowerCasedMenu = menu.toLowerCase();
      state.tasks.map(task => ({
        task: task._id === currentId ? (task.hasOwnProperty(lowerCasedMenu) ? task[lowerCasedMenu] = dropDownMenu : task) : task,
      }));
    },
    sortByCriteria: (state, { payload }) => {
      const customOrder = ['Low', 'Medium', 'High'];
      state.tasks = state.tasks.sort((a, b) => {
        const aIndex = customOrder.indexOf(a.priority);
        const bIndex = customOrder.indexOf(b.priority);
        if (payload.targetText === 'Desc') {
          return aIndex - bIndex;
        } else if (payload.targetText === 'Asc') {
          return bIndex - aIndex;
        }
        return 0;
      });
    },
    resetSort:(state) => {
      state.tasks = state.originalTasks;
    }
  },
});

export const { resetSort, showTaskMenu, deleteTask, setTasksAttributes, sortByCriteria, loadTasksMock } = tasks.actions;

export default tasks.reducer;
