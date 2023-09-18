import { NextRequest, NextResponse } from 'next/server';
import { userRepo } from '@/_lib/db/repos/user-repo';

export async function GET(req: NextRequest): Promise<NextResponse | unknown> {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1]!;
    console.log(token, 'asdas');
    const email = await userRepo.auth(token)
    return NextResponse.json({email})
  } catch (error: any) {
    const { message, status } = error;
    return NextResponse.json(message, {status})
  }
}
