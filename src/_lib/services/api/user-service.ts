import { apiService } from '@/_lib/services/api/api-service';
import { TokenResponse } from '@/_utils/types/types';
import { ApiUserPath } from '@/_utils/enums/enums';

class UserService {
  private readonly axiosInstance = apiService.getInstance();
  register = async (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
    try {
      const { status, data } = await this.axiosInstance.post<TokenResponse>(ApiUserPath.REGISTER, {
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
      const { status, data } = await this.axiosInstance.post<TokenResponse>(ApiUserPath.LOGIN, {
        email,
        password,
      });
      return { status, data };
    } catch (error) {
      return apiService.handleAxiosError(error);
    }
  };
}

export const userService = new UserService();