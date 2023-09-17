import { Form } from '@/_components/Form/Form';
import { getTokenAndRedirect } from '@/_lib/db/server-actions';

export default function Page() {
  getTokenAndRedirect()
  return <Form />;
}
