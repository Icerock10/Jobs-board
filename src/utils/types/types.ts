export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
}
export type TokenResponse = {
  status: number
  data: {
    token: string;
  };
}
export type ListingsResponse = {
  status: number;
  data: {
    listings: IListing
  }
}
export type AuthResponse = {
  status: number;
  data: { email: string };
}
export type UpdatedListingResponse = {
  status: number;
  data: {
    listings: IListing,
    successMessage: string
  }
}
// export type Extra = {
//   extra: {
//     authService: {
//       getAuthUser: (token: string) => Promise<AuthData>;
//     };
//   };
// }
// export type IState = {
//   email: null | string;
//   status: string;
//   error?: string;
// }

export interface IListing {
  title: string;
  companyName: string;
  location: string
  url: string
  type: string
  experienceLevel: string
  salary: number
  shortDescription: string
  fullDescription: string
  isPublished: false
  draft: Date
  _id: string
}

export type Theme = Themes.DARK | Themes.LIGHT;

