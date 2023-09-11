import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect-db';
import Listing from '@/lib/db/models/Listing';

export async function GET(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    await connectDB();
    const listings = await Listing.find({isPublished: true});
    return NextResponse.json({ listings });
  } catch (error: unknown) {
    return error;
  }
}