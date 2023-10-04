import { UserProps } from '@/_utils/types/types';
import bcrypt from 'bcrypt';
import { createCustomError } from '@/_utils/helpers/customError';
import { jwtService } from '@/_lib/services/token/jwtService';
import { db } from '@/_lib/db/connect-db';
import { ErrorMessage, HttpStatus } from '@/_utils/enums/enums';
import { UserRepoTypes } from '@/_utils/types/types';

class UserRepository implements UserRepoTypes<UserProps> {
  private instance = db.User;
  
  async login({ email, password }: UserProps): Promise<{ token: string }> {
    const isUser = await this.instance.find({ email }).lean();
    if (!isUser.length) {
      createCustomError(ErrorMessage.NOT_FOUND_USER, HttpStatus.BAD_REQUEST);
    }
    const isPasswordValid = bcrypt.compareSync(password, isUser[0].password);
    
    if (!isPasswordValid) {
      createCustomError(ErrorMessage.INVALID_EMAIL, HttpStatus.BAD_REQUEST);
    }
    const token = await jwtService.generate(email);
    return { token };
  }
  
  async register({ email, password }: UserProps): Promise<{ token: string }> {
    const isDuplicate = await this.instance.findOne({ email }).lean();
    if (isDuplicate) {
      createCustomError(ErrorMessage.USER_EXISTS, HttpStatus.BAD_REQUEST);
    }
    const SALT_ROUNDS = 10;
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
    const user = await this.instance.create({ email, password: hashedPassword });
    if (!user) {
      createCustomError(ErrorMessage.SERVER_ERROR, HttpStatus.SERVER_ERROR);
    }
    const token = await jwtService.generate(email);
    return { token };
  }
}

export const userRepo = new UserRepository();