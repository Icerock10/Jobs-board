import { getSecuredListingsOrRedirect } from '@/_lib/server-actions/server-actions';
import { Listings } from '@/_components/Listings/Listings';
export default async function ListingsPage() {
  const listings = await getSecuredListingsOrRedirect();
  return <Listings listings={listings} />;
}
