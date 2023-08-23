import { NextRequest, NextResponse } from 'next/server';
import { jwtService } from '@/lib/token/jwtService';
import connectDB from '@/lib/db/connect-db';

export async function GET(req: NextRequest) {
  try {
    // await connectDB();
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : '';
    const isAuthed = await jwtService.verify(token)
    return NextResponse.json({ email: 'dp02@gmail.com' });
  } catch (error: unknown) {
    return NextResponse.json({ error: 'You are not authed' }, { status: 401 })
  }
}