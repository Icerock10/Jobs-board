import { NextRequest, NextResponse } from 'next/server';
import { listingsRepo } from '@/_lib/db/repos/listings-repo';

export const revalidate = 0;

export async function GET(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    const listings = await listingsRepo.getPublished()
    return NextResponse.json({ listings });
  } catch (error: any) {
    const { message, status } = error;
    return NextResponse.json(message, {status})
  }
}