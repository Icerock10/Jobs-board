import { IListing } from '@/_utils/types/types';
export const getFilteredListings = (listings: IListing[], { title, location, type, experienceLevel, salary, favorites }: IListing) => {
  return listings.filter(item => {
    if (title && !item.title.toLowerCase().includes(title.toLowerCase())) {
      return false;
    }
    if (location && !item.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    if (salary && item.salary <= Number(salary)) {
      return false;
    }
    if (type !== 'Any' && !item.type.includes(type)) {
      return false;
    }
    if (experienceLevel !== 'Any' && !item.experienceLevel.includes(experienceLevel)) {
      return false;
    }
    return !(favorites && !item.isLiked);
  });
}