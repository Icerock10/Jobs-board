import { getMyListings } from '@/lib/db/server-actions';
import { Listings } from '@/components/Listings/Listings';
import { cookiesService } from '@/lib/cookies/cookies-service';
import { CreateLink } from '@/components/CreateLink/CreateLink';
export default async function ListingsPage() {
  const token = cookiesService.getToken()
  const listings = await getMyListings(token);
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
