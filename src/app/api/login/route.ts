import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect-db';
import User from '@/lib/db/models/User';
import { jwtService } from '@/lib/token/jwtService';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    const { email, password } = await req.json();
    await connectDB();
    const isUser = await User.find({ email }).lean();
    if (!isUser.length) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    const isPasswordValid = bcrypt.compareSync(password, isUser[0].password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    const token = await jwtService.generate(email);
    return NextResponse.json({ token }, { status: 200 });
  } catch (error: unknown) {
    return error;
  }
}
