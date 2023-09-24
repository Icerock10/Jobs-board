import { createSlice } from '@reduxjs/toolkit';

const initialState: {tasks: [{title: string, todo: string, priority: string, category: string}]} = {
  tasks: [{
    title: 'My cool Title',
    todo: 'Todo',
    priority: 'High',
    category: 'Work'
  }]
};

export const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
});

export const {} = tasks.actions;

export default tasks.reducer;
