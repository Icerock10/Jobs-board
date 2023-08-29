import { NextRequest, NextResponse } from 'next/server';
import { jwtService } from '@/lib/token/jwtService';
import connectDB from '@/lib/db/connect-db';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader?.split(' ')[1] : '';
    if(token === 'undefined') return NextResponse.json({ error: 'Token was not provided' }, { status: 401 });
    const { email } = await jwtService.verify(token);
    if (email) {
      return NextResponse.json({ email });
    }
  } catch (error: unknown) {
    return NextResponse.json({ error: 'You are not authed' }, { status: 401 });
  }
}
