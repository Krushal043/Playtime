import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin API endpoints
  if (pathname.startsWith('/api/admin')) {
    // Exclude the login / auth check route
    if (pathname === '/api/admin/auth') {
      return NextResponse.next();
    }

    const token = request.cookies.get('playtime_admin_session')?.value;
    const session = await verifyAdminToken(token);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized: Valid admin authentication session required.',
        },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/admin/:path*'],
};
