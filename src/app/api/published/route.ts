import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/_lib/db/connect-db';
import Listing from '@/_lib/db/models/Listing';

export const revalidate = 0;

export async function GET(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    await connectDB();
    const listings = await Listing.find({isPublished: true});
    return NextResponse.json({ listings });
  } catch (error: unknown) {
    return error;
  }
}