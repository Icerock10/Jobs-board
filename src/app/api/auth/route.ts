import { NextRequest, NextResponse } from 'next/server';
import { jwtService } from '@/lib/token/jwtService';
import connectDB from '@/lib/db/connect-db';

export async function GET(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    await connectDB();
    const token = req.headers.get('authorization')?.split(' ')[1]!;
    const { email } = await jwtService.verify(token)
    if (email) {
      return NextResponse.json({ email });
    }
  } catch (error: unknown) {
    return NextResponse.json({ error: 'You are not authed' }, { status: 401 });
  }
}
