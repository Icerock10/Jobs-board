import axios, { AxiosInstance } from 'axios';
import { AuthData } from '@/utils/types/types';

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
      const { status, data } = await this.instance.post<{
        status: number;
        data: { token: string };
      }>('/api/register', { email, password });
      return { status, data };
    } catch (error) {
      return this.handleAxiosError(error);
    }
  };
  login = async (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
    try {
      const { status, data } = await this.instance.post('/api/login', { email, password });
      return { status, data };
    } catch (error) {
      return this.handleAxiosError(error);
    }
  };
  getAuthUser = async (token: string): Promise<AuthData> => {
    this.setToken(token);
    try {
      const { status, data } = await this.instance.get('/api/auth');
      return { status, data };
    } catch (error) {
      return this.handleAxiosError(error) as AuthData;
    }
  };
  getListings = async (token?: string) => {
    this.setToken(token);
    try {
      const { status, data } = await this.instance.get('/api/listings');
      return { status, data };
    } catch (error) {
      return this.handleAxiosError(error) as AuthData;
    }
  };
  getPublishedListings = async () => {
    try {
      return await this.instance.get('/api/published');
    } catch (error) {
      return this.handleAxiosError(error) as AuthData;
    }
  }
  deleteListing = async (_id: string, token: string) => {
    this.setToken(token);
    try {
      const { data, status } = await this.instance.delete('/api/listings', { data: { _id } });
      return { data, status };
    } catch (error) {
      return this.handleAxiosError(error) as AuthData;
    }
  };
}

export const authService = new AuthService('http://localhost:3000');
