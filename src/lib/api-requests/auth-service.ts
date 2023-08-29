import axios, { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

export class AuthService {
  protected readonly instance: AxiosInstance;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: 'Time out!',
    });
  }

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
  getAuthUser = async (token?: string) => {
    const config = {
      headers: {
        'authorization': `Bearer ${token}`,
      },
    };
    try {
      const { status, data } = await this.instance.get('/api/auth', config);
      return { status, data };
    } catch (error) {
      return this.handleAxiosError(error);
    }
  };
}

export const authService = new AuthService('http://localhost:3000');
