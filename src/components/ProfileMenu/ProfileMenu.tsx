import Link from 'next/link';
export const ProfileMenu = () => {
  return (
    <div>
      <Link href={'/jobs/listings'}>Protected</Link>
      <button>Logout</button>
    </div>
  );
};