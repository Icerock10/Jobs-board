import { createSlice } from '@reduxjs/toolkit';

interface Task {
  title: string;
  todo: string;
  priority: string;
  category: string;
  _id: string;
  isTaskMenuShown: boolean;
}

const initialState: { tasks: Task[] } = {
  tasks: [
    {
      title: 'My cool Title',
      todo: 'Todo',
      priority: 'High',
      category: 'Work',
      _id: 'as1dfh23gg234add2',
      isTaskMenuShown: false,
    },
    {
      title: 'Title 2',
      todo: 'Todo 2',
      priority: 'High',
      category: 'Work',
      _id: 'as1dfh23gg234aaaa',
      isTaskMenuShown: false,
    },
    {
      title: 'Title 3',
      todo: 'Todo 3',
      priority: 'High',
      category: 'Work',
      _id: 'as1dfhaaaadd23gg234aaaa',
      isTaskMenuShown: false,
    },
    {
      title: 'Title 4',
      todo: 'Todo 4',
      priority: 'High',
      category: 'Work',
      _id: 'as1dfhaaaadd23gg234aaaasds1132323',
      isTaskMenuShown: false,
    },
  ],
};

export const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    showTaskMenu: (state, { payload }) => {
      payload
        ? state.tasks.map(task => task._id === payload ? task.isTaskMenuShown = !task.isTaskMenuShown : task)
        : state.tasks.map(task => task.isTaskMenuShown = false);
    },
    deleteTask: (state, { payload }) => {
      state.tasks = state.tasks.filter(task => task._id !== payload);
    },
  },
});

export const { showTaskMenu, deleteTask } = tasks.actions;

export default tasks.reducer;
