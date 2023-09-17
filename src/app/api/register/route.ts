import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/_lib/db/connect-db';
import { jwtService } from '@/_lib/token/jwtService';
import User from '@/_lib/db/models/User';
import bcrypt from 'bcrypt';
export async function POST(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    await connectDB();
    const { email, password } = await req.json();
    const isDuplicate = await User.findOne({ email }).lean()
    if (isDuplicate) {
      return NextResponse.json({ error: 'The user exists' }, { status: 401 });
    }
    const SALT_ROUNDS = 10;
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS)
    const user = await User.create({ email, password: hashedPassword})

    if(user) {
      const token = await jwtService.generate(email);
      return NextResponse.json({ token }, { status: 200 });
    }
  } catch (error: any) {
    return error;
  }
}
