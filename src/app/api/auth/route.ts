import { NextRequest, NextResponse } from 'next/server';
import { jwtService } from '@/lib/token/jwtService';
import connectDB from '@/lib/db/connect-db';

export async function GET(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    await connectDB();
    const email = 'dp021190dns@g,com'
    if (email) {
      return NextResponse.json({ email });
    }
  } catch (error: unknown) {
    return NextResponse.json({ error: 'You are not authed' }, { status: 401 });
  }
}
