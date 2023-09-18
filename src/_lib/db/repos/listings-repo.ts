import { db } from '@/_lib/db/connect-db';
import { IListing } from '@/_utils/types/types';
import { createCustomError } from '@/_utils/helpers/server/customError';
import Listing from '@/_lib/db/models/Listing';
import { setDraftFromDate } from '@/_utils/helpers/setDraftFromDate';
import { UpdateResult } from 'mongodb';


type IRepository<T> = {
  getPublished(isPublished: boolean): Promise<IListing[]>
  create(listingData: IListing): Promise<IListing[]>
  updateById(body: {}): Promise<UpdateResult>
  deleteById(id: string): Promise<void>
  getOneById(id: string): Promise<IListing[]>
  publishOne(id: string, daysLeft: number): Promise<UpdateResult>
}

class ListingRepository implements IRepository<IListing> {
  private instance = db.Listing;
  
  async getPublished(): Promise<IListing[]> {
    const listings = await this.instance.find({isPublished: true})
    if(!listings.length) {
      createCustomError('Server error', 500)
    }
    return listings;
  }
  async getAll(): Promise<IListing[]> {
    const listings = await this.instance.find({})
    if(!listings.length) {
      createCustomError('Listings was not found', 500)
    }
    return listings;
  }
  async create(listingData: IListing): Promise<IListing[]> {
    const listing = await this.instance.create(listingData);
    if(!listing) {
      createCustomError('Something went wrong', 500)
    }
    return listing
  }
  async deleteById(_id: string): Promise<void> {
    await this.instance.deleteOne({ _id });
  }
  async updateById({_id, listing}: any): Promise<UpdateResult> {
    const updatedListing = await Listing.findOne({ _id }).updateOne(listing);
    if(!updatedListing) {
      createCustomError('Listing was not found', 400)
    }
    return updatedListing;
  }
  async getOneById(_id: string): Promise<IListing[]> {
    const listing = await this.instance.find({_id})
    if(!listing) {
      createCustomError('Listing was not found', 400)
    }
    return listing;
  }
 async publishOne(_id: string, daysLeft: number): Promise<UpdateResult> {
   const newDraft = setDraftFromDate(daysLeft)
   const publishedListing = await Listing.findOne({ _id }).updateOne({ isPublished: true, draft: newDraft });
   return publishedListing
  }
}

export const listingsRepo = new ListingRepository();