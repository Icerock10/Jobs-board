import { redirect } from 'next/navigation';
import Link from 'next/link';
export default async function Home() {
  return (
    <div>
      <Link href={'/jobs'}>LINK TO JOBS</Link>
    </div>
  )
}
