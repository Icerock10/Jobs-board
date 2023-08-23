import axios, { AxiosInstance } from 'axios';

export class AuthService {
  protected readonly instance: AxiosInstance;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: 'Time out!',
    });
  }

  register = (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
    return this.instance.post('/api/register', { email, password }).then(({ data }) => {
      return data.token;
    });
  };
  getAuthUser = (token?: string) => {
    const config = {
      headers: {
        'authorization': `Bearer ${token}`,
      },
    };
    return this.instance
      .get('/api/auth', config)
      .then(({ data: { email } }) => email)
      .catch(e => console.log(e.response.data));
  };
}

export const authService = new AuthService('http://localhost:3000');
