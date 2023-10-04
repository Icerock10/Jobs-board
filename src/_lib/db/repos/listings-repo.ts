import { db } from '@/_lib/db/connect-db';
import { IListing, ListingRepoTypes } from '@/_utils/types/types';
import { createCustomError } from '@/_utils/helpers/customError';
import Listing from '@/_lib/db/models/Listing';
import { setDraftFromDate } from '@/_utils/helpers/setDraftFromDate';
import { UpdateResult } from 'mongodb';
import { ErrorMessage, HttpStatus } from '@/_utils/enums/enums';


class ListingRepository implements ListingRepoTypes<IListing> {
  private instance = db.Listing;
  
  async getPublished(): Promise<IListing[]> {
    const listings = await this.instance.find({isPublished: true})
    if(!listings.length) {
      createCustomError(ErrorMessage.SERVER_ERROR, HttpStatus.SERVER_ERROR)
    }
    return listings;
  }
  async getAll(): Promise<IListing[]> {
    const listings = await this.instance.find({})
    if(!listings.length) {
      createCustomError(ErrorMessage.NOT_FOUND_LISTING, HttpStatus.BAD_REQUEST)
    }
    return listings;
  }
  async create(listingData: IListing): Promise<IListing[]> {
    const listing = await this.instance.create(listingData);
    if(!listing) {
      createCustomError(ErrorMessage.SERVER_ERROR, HttpStatus.SERVER_ERROR)
    }
    return listing
  }
  async deleteById(_id: string): Promise<void> {
    await this.instance.deleteOne({ _id });
  }
  async updateById({_id, listing}: any): Promise<UpdateResult> {
    const updatedListing = await Listing.findOne({ _id }).updateOne(listing);
    if(!updatedListing) {
      createCustomError(ErrorMessage.NOT_FOUND_LISTING, HttpStatus.BAD_REQUEST)
    }
    return updatedListing;
  }
  async getOneById(_id: string): Promise<IListing[]> {
    const listing = await this.instance.find({_id})
    if(!listing) {
      createCustomError(ErrorMessage.NOT_FOUND_LISTING, HttpStatus.BAD_REQUEST)
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