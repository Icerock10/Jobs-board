import Link from 'next/link';
import { ProfileMenu } from '@/components/ProfileMenu/ProfileMenu';

export const Menu = ({ className, email }: { className: string; email?: string }) => {
  return (
    <nav className={className}>
      <Link href={'/tasks'}>Task Board</Link>
      <Link href={'/jobs'}>Job Listings</Link>
      {email ? <ProfileMenu /> : <Link href={'/login'}>Login</Link>}
    </nav>
  );
};
