import { Auth } from '@/hooks/useAuth';
import { cookies } from 'next/headers';
import { Test } from '@/components/Test/Test';
export default async function Listings() {
  const token = `${cookies().get('token')?.value}`;
  
  return (
    <div>
      <Test />
      Very Protected page!!!!!!
      <Auth token={token}/>
    </div>
  );
}
