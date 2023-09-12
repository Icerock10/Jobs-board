import { getPublished } from '@/lib/db/server-actions';
import { Job } from '@/components/Jobs/Job';
import { CreateLink } from '@/components/CreateLink/CreateLink';
export default async function Jobs() {
  const listings = await getPublished()
  return (
    <section className='container'>
      <div className='container_title'>
        <h1>Jobs</h1>
        <CreateLink />
      </div>
      <Job listings={listings} hasPublicAccess={true}/>
    </section>
  );
}
