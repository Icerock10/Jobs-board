export const getCustomOrders = (criteria: string) => {
  const priorityOrder = ['Low', 'Medium', 'High'];
  const statusOrder = ['Todo', 'In Progress', 'Done'];
  const categoryOrder = ['Work', 'Personal'];
  if (criteria === 'Status') return statusOrder;
  if (criteria === 'Priority') return priorityOrder;
  if (criteria === 'Category') return categoryOrder;
};