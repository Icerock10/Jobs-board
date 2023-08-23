import { Form } from '@/components/Form/Form';
import { signUpAction } from '@/app/signup/help';

export default function Signup() {
  return <Form isRegister={true} action={signUpAction}></Form>;
};