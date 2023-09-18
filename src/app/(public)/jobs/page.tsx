import { Listings } from '@/_components/Listings/Listings';
import { CreateLink } from '@/_components/CreateLink/CreateLink';
import { listingsService } from '@/_lib/services/listings-service';
export default async function Jobs() {
  const response = await listingsService.getAll()
  return (
    <section className='container'>
      <div className='container_title'>
        <h1>Jobs</h1>
        <CreateLink />
      </div>
      <Listings listings={response?.data?.listings} hasPublicAccess={true}/>
    </section>
  );
}
