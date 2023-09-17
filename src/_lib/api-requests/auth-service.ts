import axios, { AxiosInstance } from 'axios';
import {
  AuthResponse, IListing,
  ListingsResponse,
  TokenResponse,
  UpdatedListingResponse,
} from '@/_utils/types/types';

export class AuthService {
  protected readonly instance: AxiosInstance;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: 'Time out!',
    });
  }

  setToken = (token?: string) => {
    this.instance.defaults.headers.common['authorization'] = `Bearer ${token}`;
  };

  private handleAxiosError(error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { data, status } = error.response;
        return { data: data.error, status };
      }
    }
  }

  register = async (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
    try {
      const { status, data } = await this.instance.post<TokenResponse>('/api/register', {
        email,
        password,
      });
      return { status, data };
    } catch (error) {
      return this.handleAxiosError(error);
    }
  };
  login = async (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
    try {
      const { status, data } = await this.instance.post<TokenResponse>('/api/login', {
        email,
        password,
      });
      return { status, data };
    } catch (error) {
      return this.handleAxiosError(error);
    }
  };
  getAuthUser = async (token: string) => {
    this.setToken(token);
    try {
      const { status, data } = await this.instance.get<AuthResponse>('/api/auth');
      return { status, data };
    } catch (error) {
      return this.handleAxiosError(error);
    }
  };
  getListings = async (token?: string, id?: string) => {
    const url = id ? `/api/listings?id=${id}` : '/api/listings';
    this.setToken(token);
    try {
      const { status, data } = await this.instance.get<ListingsResponse>(url);
      return { status, data };
    } catch (error) {
      return this.handleAxiosError(error);
    }
  };
  getPublishedListings = async () => {
    try {
      const { status, data } = await this.instance.get<ListingsResponse>('/api/published');
      return { status, data };
    } catch (error) {
      return this.handleAxiosError(error);
    }
  };
  deleteListing = async (_id: string, token?: string) => {
    this.setToken(token);
    try {
      const { data, status } = await this.instance.delete('/api/listings', { data: { _id } });
      return { data, status };
    } catch (error) {
      return this.handleAxiosError(error);
    }
  };
  updateListing = async (_id: string, daysLeft: number, token?: string) => {
    this.setToken(token);
    try {
      const { data, status } = await this.instance.put<UpdatedListingResponse>('/api/listings', {
        _id,
        daysLeft,
      });
      return { data, status };
    } catch (e) {
      return this.handleAxiosError(e);
    }
  };
  updateOneListing = async (_id: string, listing: object, token?: string) => {
    this.setToken(token);
    try {
      const { data, status } = await this.instance.put<UpdatedListingResponse>('/api/listings', { _id, listing });
      return { data, status };
    } catch (e) {
      return this.handleAxiosError(e);
    }
  };
  createListingFromAxios = async (listing: object, token?: string) => {
    this.setToken(token)
    try {
      const { data, status } = await this.instance.post<IListing>('/api/listings', listing)
      return { data, status }
    }
    catch (e) {
      return this.handleAxiosError(e);
    }
  }
}

export const authService = new AuthService(process.env.BASE_URL!);
