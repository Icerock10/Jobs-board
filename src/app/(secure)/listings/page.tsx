import { getSecuredListingsOrRedirect } from '@/_lib/server-actions/server-actions';
import { Listings } from '@/_components/Listings/Listings';
import { CreateLink } from '@/_components/CreateLink/CreateLink';
export default async function ListingsPage() {
  const listings = await getSecuredListingsOrRedirect();
  return (
    <div className='container'>
      <div className='container_title'>
        <h1>My Job Listings</h1>
        <CreateLink />
      </div>
      <Listings listings={listings} />
    </div>
  );
}
