import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect-db';
import Listing from '@/lib/db/models/Listing';

export async function POST(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    const { ...listingData } = await req.json();
    await connectDB();
    const listing = await Listing.create(listingData);
    if (listing) {
      return NextResponse.json({ message: 'Successfully created' });
    }
  } catch (error: unknown) {
    return error;
  }
}

export async function GET(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    await connectDB();
    const url = new URL(req.url);
    const _id = url.searchParams.get('id');
    if (_id) {
      const listing = await Listing.find({ _id });
      return NextResponse.json(listing);
    }
    const listings = await Listing.find({});
    return NextResponse.json({ listings });
  } catch (error: unknown) {
    return error;
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    await connectDB();
    const { _id, daysLeft } = await req.json();
    const currentDate = new Date();
    const newDraftDate = new Date(currentDate.getTime() + daysLeft * 24 * 60 * 60 * 1000);
    const foundListing = await Listing.findOne({ _id }).updateOne({ isPublished: true, draft: newDraftDate });
    return NextResponse.json({ foundListing, successMessage: 'Listing successfully published' });
  } catch (error: unknown) {
    return error;
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    await connectDB();
    const { _id } = await req.json();
    const deletedListing = await Listing.deleteOne({ _id });
    return NextResponse.json({ deletedListing, successMessage: 'Listing successfully deleted' });
  } catch (error: unknown) {
    return error;
  }
}
