import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect-db';
import { jwtService } from '@/lib/token/jwtService';
import { cookies } from 'next/headers'
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json()
    const { email, password } = body;
    const token = await jwtService.generate(email)
    const user = {
      email,
      token
    }
   return NextResponse.json(user)
  } catch (error: any) {
    return error
  }
}