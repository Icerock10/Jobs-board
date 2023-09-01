import { Auth } from '@/hooks/useAuth';
import { cookies } from 'next/headers';
export default function Page() {
  const token = `${cookies().get('token')?.value}`;
  return (
    <>
      <div>CREATE NEW JOB</div>
      <Auth token={token} />
    </>
  );
}
