import * as jose from 'jose';
import { getSecretEnv } from '@/_lib/services/token/getSecretEnv';
class Jwt {
  private instance: typeof jose;
  public secret: Uint8Array;

  constructor() {
    this.instance = jose;
    this.secret = getSecretEnv();
  }

  generate(email: FormDataEntryValue | null) {
    const EXPIRED_IN_TWO_WEEKS = '14d';
    return new this.instance.SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(EXPIRED_IN_TWO_WEEKS)
      .sign(this.secret);
  }

  async verify(token: string) {
    try {
      const { payload } = await this.instance.jwtVerify(token, this.secret);
      return payload;
    } catch (e) {
      throw new Error('Your token expired');
    }
  }
}

export const jwtService = new Jwt();
