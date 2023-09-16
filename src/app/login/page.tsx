import { Form } from '@/components/Form/Form';
import { getTokenAndRedirect } from '@/lib/db/server-actions';


export default function Page() {
  getTokenAndRedirect()
  return <Form />;
}
