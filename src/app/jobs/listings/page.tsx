import { Auth } from '@/hooks/useAuth';
import { cookies } from 'next/headers';

export default async function Listings() {
  const token = `${cookies().get('token')?.value}`;
  return (
    <div>
      Very Protected page!!!!!!
      <Auth token={token}/>
    </div>
  );
}
