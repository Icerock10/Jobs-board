import { IListing } from '@/_utils/types/types';
export const getListingsStorageFields = (listings: IListing) => {
  const storedHiddenIds = JSON.parse(localStorage.getItem('hidden') || '[]');
  const storedLikedIds = JSON.parse(localStorage.getItem('liked') || '[]');
  return listings.map((item: IListing) => ({
    ...item,
    isHidden: storedHiddenIds.includes(item._id),
    isLiked: storedLikedIds.includes(item._id)
  }));
}