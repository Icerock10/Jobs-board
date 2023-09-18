import { NextRequest, NextResponse } from 'next/server';
import { listingsRepo } from '@/_lib/db/repos/listings-repo';

export async function DELETE(req: NextRequest, { params: { id } }: any): Promise<NextResponse | unknown> {
  try {
    await listingsRepo.deleteById(id);
    return NextResponse.json({ message: 'Listing successfully deleted' });
  } catch (error: any) {
    const { message, status } = error;
    return NextResponse.json(message, { status });
  }
}

export async function GET(req: NextRequest, { params: { id } }: any): Promise<NextResponse | unknown> {
  try {
    const listing = await listingsRepo.getOneById(id);
    return NextResponse.json(listing);
  } catch (error: any) {
    const { message, status } = error;
    return NextResponse.json(message, { status });
  }
}

export async function PUT(req: NextRequest, { params: { id } }: any): Promise<NextResponse | unknown> {
  try {
    const { daysLeft } = await req.json();
    const publishedListing = await listingsRepo.publishOne(id, daysLeft);
    return NextResponse.json({ publishedListing, message: 'Listing Successfully published' });
  } catch (error: any) {
    const { message, status } = error;
    return NextResponse.json(message, { status });
  }
}
