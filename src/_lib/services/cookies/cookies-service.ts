import { cookies } from 'next/headers';

class Cookie {
  private instance: typeof cookies;
  constructor() {
    this.instance = cookies;
  }
  
  getToken() {
    return this.instance().get('token')?.value;
  }
  setToken(token: string) {
    return this.instance().set('token', token)
  }
  removeToken() {
    return this.instance().delete('token')
  }
}

export const cookiesService = new Cookie()