import * as jose from 'jose';
import { getSecretEnv } from '@/_lib/services/token/getSecretEnv';
import { ErrorMessage } from '@/_utils/enums/enums';
import { EXPIRED_IN_TWO_WEEKS } from '@/_utils/constants/constants';
class Jwt {
  private instance: typeof jose;
  public secret: Uint8Array;

  constructor() {
    this.instance = jose;
    this.secret = getSecretEnv();
  }

  generate(email: FormDataEntryValue | null) {
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
      throw new Error(ErrorMessage.EXPIRED_TOKEN);
    }
  }
}

export const jwtService = new Jwt();
