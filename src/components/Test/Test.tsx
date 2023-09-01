'use client';
import { toastService } from '@/lib/toast/toastr-service';
export const Test = () => {
  const fetchTodos = async () => {
    const data = {
      location: 'Lviv',
      level: 'Senior',
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    };
    const response = await fetch('http://localhost:3000/api/job', options);
    if (response.status === 401) {
      return toastService.error(response.statusText);
    }
  };
  return <button onClick={fetchTodos}>CLICK MEEE!!!!!!</button>;
};