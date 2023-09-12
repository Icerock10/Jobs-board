import { CreateListing } from '@/components/CreateListing/CreateListing';
export default function Page({params}: {params: string}) {
  console.log(params);
  return (
    <>
      <CreateListing />
    </>
  )
};