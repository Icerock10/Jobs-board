import { getPublished } from '@/_lib/db/server-actions';
import { Listings } from '@/_components/Listings/Listings';
import { CreateLink } from '@/_components/CreateLink/CreateLink';
export default async function Jobs() {
  const listings = await getPublished()
  return (
    <section className='container'>
      <div className='container_title'>
        <h1>Jobs</h1>
        <CreateLink />
      </div>
      <Listings listings={listings} hasPublicAccess={true}/>
    </section>
  );
}
