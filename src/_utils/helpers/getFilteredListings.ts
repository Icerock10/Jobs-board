import { IListing } from '@/_utils/types/types';
export const getFilteredListings = (listings: IListing[], {
  title,
  location,
  type,
  experienceLevel,
  salary,
  favorites,
}: IListing) => {
  return listings.filter(item => {
    if (experienceLevel && experienceLevel !== 'Any' && !item.experienceLevel.includes(experienceLevel)) {
      return false;
    }
    if (type && type !== 'Any' && !item.type.includes(type)) {
      return false;
    }
    if (title && !item.title.toLowerCase().includes(title.toLowerCase())) {
      return false;
    }
    if (favorites && !item.isLiked) {
      return false;
    }
    if (salary && item.salary <= Number(salary)) {
      return false;
    }
    if (location && !item.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    return true;
  });
};