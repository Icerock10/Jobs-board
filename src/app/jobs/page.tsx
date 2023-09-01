import Link from 'next/link';
export default function Jobs() {
  return (
    <section>
      Jobs are here
      <Link href={'/jobs/new'}>Create</Link>
    </section>
  );
}
