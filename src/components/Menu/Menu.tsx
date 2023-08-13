import Link from 'next/link';
export const Menu = ({className}: {className: string}) => {
  return (
    <nav className={className}>
      <Link href="/"> Task Board</Link>
      <Link href="/jobs">Job Listings</Link>
      <Link href="/">Login</Link>
    </nav>
  );
};