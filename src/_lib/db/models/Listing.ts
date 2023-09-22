import mongoose from 'mongoose';
import { IListing } from '@/_utils/types/types';

const listingSchema = new mongoose.Schema<IListing>({
  title: String,
  companyName: String,
  location: String,
  url: String,
  type: String,
  experienceLevel: String,
  salary: Number,
  shortDescription: String,
  fullDescription: String,
  isPublished: Boolean,
  isHidden: Boolean,
  draft: Date
});

export default mongoose.models.Listings || mongoose.model<IListing>('Listings', listingSchema);
