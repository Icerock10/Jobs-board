import axios, { AxiosInstance } from 'axios';

class ApiService {
  protected readonly instance: AxiosInstance;
  
  constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: 'Time out!',
    });
  }
  handleAxiosError(error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { data, status } = error.response;
        return { data, status };
      }
    }
  }
  setToken(token?: string) {
    this.instance.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }
  
  getInstance() {
    return this.instance;
  }
}

export const apiService = new ApiService(process.env.BASE_URL!);
