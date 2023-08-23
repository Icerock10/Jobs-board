import { redirect } from 'next/navigation';

export async function getFormData(data: FormData) {
  'use server'
  const email = data.get('email');
  const password = data.get('password');
  if (!email || !password) return;
  redirect('/jobs')
}