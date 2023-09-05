'use client'
import { removeJob } from '@/lib/db/_actions';
export const Job = ({listings}: any) => {
  console.log(listings);
  return (
    <div>
      {listings?.map((listing: any, index: number) => {
        const { title, companyName, _id } = listing;
        return <div key={index}>
          <p>{title}{companyName}</p>
          <button onClick={() => removeJob(_id)}>Delete</button>
        </div>
      })}
    </div>
  );
};