import { Form } from '@/_components/Jobs/Form/Form';
import { getTokenAndRedirect } from '@/_lib/server-actions/server-actions';

export default function Page() {
  getTokenAndRedirect()
  return <Form />;
}
