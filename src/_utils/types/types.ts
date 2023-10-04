import { UpdateResult } from 'mongodb';
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
export type UserRepoTypes<T> = {
  login(body: T): Promise<{ token: string }>
  register(body: T): Promise<{ token: string }>
}
export type SelectProps = {
  options: string[];
  fieldName: string;
  register: any;
  setValue: any
  isDbField?: string
};
export type ListingRepoTypes<T> = {
  getPublished(isPublished: boolean): Promise<IListing[]>
  create(listingData: IListing): Promise<IListing[]>
  updateById(body: {}): Promise<UpdateResult>
  deleteById(id: string): Promise<void>
  getOneById(id: string): Promise<IListing[]>
  publishOne(id: string, daysLeft: number): Promise<UpdateResult>
}

export type Task = {
  title: string;
  status: string;
  priority: string;
  category: string;
  _id: string;
  isTaskMenuShown: boolean;
  isDeleted: boolean,
  [key: string]: any;
}
export type PreviewState = {
  listing: IListing;
  arrayOfListings: IListing[]
  originalArray: IListing[]
  showHidden: boolean
  isReset: boolean
  publishData: { price: number | null, days: number | null, title: string, id: string }
};
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

