import { NextRequest, NextResponse } from 'next/server';
import { jwtService } from '@/lib/token/jwtService';

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const cookiesToken = req.cookies.get('token')?.value;
  
  if (authHeader?.startsWith('Bearer ')) {
    if(!cookiesToken) {
      return NextResponse.json({ error: 'You are not authed' }, { status: 401 })
    }
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
  if(req.url.includes('api/job')) {
    if(!cookiesToken) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 401 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/auth', '/api/job'],
};
