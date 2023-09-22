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
export type UserProps = {
  email: string;
  password: string;
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
  isPublished: boolean,
  isHidden: boolean,
  draft: Date | string | number
  _id: string
  [key: string]: any;
}

export type Theme = Themes.DARK | Themes.LIGHT;

