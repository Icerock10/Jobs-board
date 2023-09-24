import { Listings } from '@/_components/Listings/Listings';
import { listingsService } from '@/_lib/services/api/listings-service';
import { Skeleton } from '@/_components/Skeleton/Skeleton';
export default async function Jobs() {
  const response = await listingsService.getAll();
  return (
    <Listings listings={response?.data?.listings} hasPublicAccess={true} />
  );
}
