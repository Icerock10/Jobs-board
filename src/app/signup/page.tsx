import { Form } from '@/components/Form/Form';
import { getTokenAndRedirect } from '@/lib/db/server-actions';

export default function Signup() {
  getTokenAndRedirect()
  return <Form isRegistration={true} />;
};