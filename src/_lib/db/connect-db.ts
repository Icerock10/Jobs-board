import mongoose from 'mongoose';
import Listing from '@/_lib/db/models/Listing';
import User from '@/_lib/db/models/User';
mongoose.connect(process.env.MONGODB_URI!).then(() => console.log('✅ ✅ ✅ Connection established')).catch(() => 'error in DB')
mongoose.Promise = global.Promise;

export const db = {
  Listing,
  User
}