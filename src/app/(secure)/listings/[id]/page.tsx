import { Listing } from '@/_components/Listing/Listing';
import { getListingById } from '@/_lib/db/server-actions';
export default async function Edit({params: { id }}: {params: {id: string}}) {
  const [listing] = await getListingById(id)
  return (
    <section className='container'>
      <div className='container_title'>
        <h1>Edit Listing</h1>
      </div>
      <Listing listingFromDb={listing} />
    </section>
  )
};