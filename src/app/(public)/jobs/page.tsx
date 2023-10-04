import { Listings } from '@/_components/Jobs/Listings/Listings';
import { listingsService } from '@/_lib/services/api/listings-service';
export default async function Jobs() {
  const response = await listingsService.getAll();
  return (
    <Listings listings={response?.data?.listings} hasPublicAccess={true} />
  );
}
