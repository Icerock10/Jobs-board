import { v4 as uuidv4 } from 'uuid';

export const mockTasksData = [{
  title: 'My cool Title',
  status: 'Todo',
  priority: 'High',
  category: 'Work',
  _id: uuidv4(),
},
  {
    title: 'Title 2',
    status: 'In Progress',
    priority: 'Medium',
    category: 'Personal',
    _id: uuidv4(),
  },
  {
    title: 'Title 3',
    status: 'Done',
    priority: 'Low',
    category: 'Work',
    _id: uuidv4(),
  },
  {
    title: 'Title 4',
    status: 'Done',
    priority: 'High',
    category: 'Personal',
    _id: uuidv4(),
  }];