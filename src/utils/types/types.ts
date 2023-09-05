export enum Themes {
  LIGHT = 'light',
  DARK = 'dark',
}

export type AuthData<T = unknown> = {
  data: { email: string } | T;
  status: number;
}
export type Extra = {
  extra: {
    authService: {
      getAuthUser: (token: string) => Promise<AuthData>;
    };
  };
}
export type IState = {
  email: null | string;
  status: string;
  error?: string;
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
  isPublished: false
  draft: Date
}

export type Theme = Themes.DARK | Themes.LIGHT;

