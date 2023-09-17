import { NextRequest, NextResponse } from 'next/server';
import { jwtService } from '@/_lib/token/jwtService';

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader?.split(' ')[1];
    if(token !== 'undefined') {
      try {
        const response = await jwtService.verify(token);
        if(response) return NextResponse.next()
      } catch (e) {
        return NextResponse.json({ error: 'Token expired' }, { status: 401 });
      }
    } else {
      return NextResponse.json({ error: 'Token not found' }, { status: 401 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/auth', '/api/listings'],
};
