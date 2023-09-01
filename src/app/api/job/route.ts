import { NextRequest, NextResponse } from 'next/server';
import { jwtService } from '@/lib/token/jwtService';
import connectDB from '@/lib/db/connect-db';

export async function POST(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    await connectDB();
    console.log('11111111 Im fired from job route dataBase');
    const body = await req.json()
    return NextResponse.json({ body });
  } catch (error: unknown) {
    return NextResponse.json({ error: 'You are not authed' }, { status: 401 });
  }
}
