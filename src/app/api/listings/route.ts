import { NextRequest, NextResponse } from 'next/server';
import { listingsRepo } from '@/_lib/db/repos/listings-repo';
import { ResponseMessage } from '@/_utils/enums/enums';

export async function POST(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    const { ...listingData } = await req.json();
    await listingsRepo.create(listingData);
    return NextResponse.json({ message: ResponseMessage.CREATE_ON_SUCCESS });
  } catch (error: any) {
    const { message, status } = error;
    return NextResponse.json(message, { status });
  }
}

export async function GET(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    const listings = await listingsRepo.getAll();
    return NextResponse.json(listings);
  } catch (error: any) {
    const { message, status } = error;
    return NextResponse.json(message, { status });
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    const body = await req.json();
    const updatedListing = await listingsRepo.updateById(body)
    return NextResponse.json({ updatedListing, message: ResponseMessage.UPDATE_ON_SUCCESS });
  } catch (error: unknown) {
    return error;
  }
}
