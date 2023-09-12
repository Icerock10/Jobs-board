import { CreateListing } from '@/components/CreateListing/CreateListing';

export default function Page() {
  return (
    <section className='container'>
      <div className='container_title'>
        <h1>New Listing</h1>
      </div>
      <CreateListing />
    </section>
  );
}
