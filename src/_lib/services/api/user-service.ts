import { apiService } from '@/_lib/services/api/api-service';
import { AuthResponse, TokenResponse } from '@/_utils/types/types';

class UserService {
  private readonly axiosInstance = apiService.getInstance();
  register = async (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
    try {
      const { status, data } = await this.axiosInstance.post<TokenResponse>('/api/user/register', {
        email,
        password,
      });
      return { status, data };
    } catch (error) {
      return apiService.handleAxiosError(error);
    }
  };
  login = async (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
    try {
      const { status, data } = await this.axiosInstance.post<TokenResponse>('/api/user/login', {
        email,
        password,
      });
      return { status, data };
    } catch (error) {
      return apiService.handleAxiosError(error);
    }
  };
  getAuthUser = async (token: string) => {
    apiService.setToken(token);
    try {
      const { status, data } = await this.axiosInstance.get<AuthResponse>('/api/user/auth');
      return { status, data };
    } catch (error) {
      return apiService.handleAxiosError(error);
    }
  };
}

export const userService = new UserService();