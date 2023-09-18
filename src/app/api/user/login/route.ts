import { NextRequest, NextResponse } from 'next/server';
import { userRepo } from '@/_lib/db/repos/user-repo';

export async function POST(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    const body = await req.json();
    const { token } = await userRepo.login(body)
    return NextResponse.json({ token });
  } catch (error: any) {
    const { message, status } = error;
    return NextResponse.json(message, {status})
  }
}
