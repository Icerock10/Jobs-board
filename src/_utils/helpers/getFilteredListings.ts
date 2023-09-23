// import { IListing } from '@/_utils/types/types';
// export const getFilteredListings = (listings: IListing[], { title, location, type, experienceLevel, salary, favorites, hidden }: IListing) => {
//   return listings.filter(item => {
//     if (title && !item.title.toLowerCase().includes(title.toLowerCase())) {
//       return false;
//     }
//     if (location && !item.location.toLowerCase().includes(location.toLowerCase())) {
//       return false;
//     }
//     if (salary && item.salary <= Number(salary)) {
//       return false;
//     }
//     if (type && !item.type.includes(type)) {
//       return type === 'Any';
//     }
//     if (experienceLevel && !item.experienceLevel.includes(experienceLevel)) {
//       return experienceLevel === 'Any';
//     }
//     if(favorites) {
//       return item.isLiked;
//     }
//     return true;
//   });
// }