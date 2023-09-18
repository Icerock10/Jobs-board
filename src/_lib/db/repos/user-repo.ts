import { UserProps } from '@/_utils/types/types';
import bcrypt from 'bcrypt';
import { createCustomError } from '@/_utils/helpers/customError';
import { jwtService } from '@/_lib/services/token/jwtService';
import { db } from '@/_lib/db/connect-db';


type IRepository<T> = {
  login(body: T): Promise<{ token: string }>
  register(body: T): Promise<{ token: string }>
}

class UserRepository implements IRepository<UserProps> {
  private instance = db.User;
  
  async login({ email, password }: UserProps): Promise<{ token: string }> {
    const isUser = await this.instance.find({ email }).lean();
    if (!isUser.length) {
      createCustomError('Not found user', 401);
    }
    const isPasswordValid = bcrypt.compareSync(password, isUser[0].password);
    
    if (!isPasswordValid) {
      createCustomError('Invalid email', 401);
    }
    const token = await jwtService.generate(email);
    return { token };
  }
  
  async register({ email, password }: UserProps): Promise<{ token: string }> {
    const isDuplicate = await this.instance.findOne({ email }).lean();
    if (isDuplicate) {
      createCustomError('The user exists', 401);
    }
    const SALT_ROUNDS = 10;
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
    const user = await this.instance.create({ email, password: hashedPassword });
    if (!user) {
      createCustomError('Server error', 500);
    }
    const token = await jwtService.generate(email);
    return { token };
  }
}

export const userRepo = new UserRepository();