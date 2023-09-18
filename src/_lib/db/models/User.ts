import mongoose from 'mongoose';
import { UserProps } from '@/_utils/types/types';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

export default mongoose.models.User || mongoose.model<UserProps>('User', userSchema);
