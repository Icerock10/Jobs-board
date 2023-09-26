import { Listing } from '@/_components/Listing/Listing';
import { getListingById } from '@/_lib/server-actions/server-actions';
export default async function Edit({ params: { id } }: { params: { id: string } }) {
  const [listing] = await getListingById(id);
  return <Listing listingFromDb={listing} />;
};