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
  removeAll() {
    this.instance().getAll().forEach(cookie => this.instance().delete(cookie.name))
  }
  setEmail(email: string) {
    return this.instance().set('email', email)
  }
}

export const cookiesService = new Cookie()