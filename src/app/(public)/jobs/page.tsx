import { Listings } from '@/_components/Listings/Listings';
import { CreateLink } from '@/_components/CreateLink/CreateLink';
import { listingsService } from '@/_lib/services/api/listings-service';
import { FilterListings } from '@/_components/FilterListings/FilterListings';
export default async function Jobs() {
  const response = await listingsService.getAll()
  return (
    <section className='container'>
      <div className='container_title'>
        <h1>Job Listings</h1>
        <CreateLink />
      </div>
      <FilterListings />
      <Listings listings={response?.data?.listings} hasPublicAccess={true}/>
    </section>
  );
}
