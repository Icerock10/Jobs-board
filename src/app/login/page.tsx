import { Form } from '@/components/Form/Form';

export default function Page() {
  const signInAction = async () => {
    'use server'
    console.log('hello')
  }
  return (
      <Form action={signInAction}/>
  );
};