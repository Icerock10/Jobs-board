import mongoose, { Model } from 'mongoose';
interface IUser {
  email: string,
  password: string
}

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

export default mongoose.models.User || mongoose.model('User', userSchema)