import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect-db';
import Listing from '@/lib/db/models/Listing';

export async function POST(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    const { title, companyName, location, type } = await req.json();
    await connectDB();
    const listing = await Listing.create({ title, companyName, location, type });
    return NextResponse.json({ listing });
  } catch (error: unknown) {
    return error;
  }
}

export async function GET(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    await connectDB();
    const listings = await Listing.find({});
    return NextResponse.json({ listings });
  } catch (error: unknown) {
    return error;
  }
}
export async function DELETE(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    await connectDB();
    const { _id } = await req.json();
    const deletedListing = await Listing.deleteOne({_id})
    return NextResponse.json({ deletedListing });
  } catch (error: unknown) {
    return error;
  }
}