import { NextRequest, NextResponse } from 'next/server';
import { jwtService } from '@/_lib/services/token/jwtService';
import { ErrorMessage, Headers, HttpStatus } from '@/_utils/enums/enums';

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get(Headers.AUTHORIZATION);
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader?.split(' ')[1];
    if (token) {
      try {
        const response = await jwtService.verify(token);
        if (response) return NextResponse.next();
      } catch (e) {
        return NextResponse.json({ error: ErrorMessage.EXPIRED_TOKEN }, { status: HttpStatus.UNAUTHORIZED });
      }
    }
    return NextResponse.json({ error: ErrorMessage.NOT_FOUND_TOKEN }, { status: HttpStatus.UNAUTHORIZED });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/listings/:path*'],
};
