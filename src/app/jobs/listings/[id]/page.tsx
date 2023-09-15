import { Listing } from '@/components/Listing/Listing';
export default async function Edit({params: { id }}: {params: {id: string}}) {
  const response = await fetch(`http://localhost:3000/api/listings?id=${id}`, {method: 'GET', cache: 'no-cache'})
  const [listing] = await response.json()
  return (
    <section className='container'>
      <div className='container_title'>
        <h1>Edit Listing</h1>
      </div>
      <Listing listingFromDb={listing} />
    </section>
  )
};