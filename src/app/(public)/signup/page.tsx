import { Form } from '@/_components/Form/Form';
import { getTokenAndRedirect } from '@/_lib/db/server-actions';

export default function Signup() {
  getTokenAndRedirect()
  return <Form isRegistration={true} />;
};