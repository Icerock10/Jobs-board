import { IListing } from '@/_utils/types/types';
import { storageService } from '@/_lib/services/localStorage/storage-service';
import { StorageKey } from '@/_utils/enums/enums';
export const getListingsStorageFields = (listings: IListing) => {
  const storedHiddenIds = storageService.getItem(StorageKey.HIDDEN)
  const storedLikedIds = storageService.getItem(StorageKey.LIKED)
  return listings.map((item: IListing) => ({
    ...item,
    isHidden: storedHiddenIds ? storedHiddenIds.includes(item._id) : false,
    isLiked: storedLikedIds ? storedLikedIds.includes(item._id) : false,
  }));
}