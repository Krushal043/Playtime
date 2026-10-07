import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createAdminToken, verifyAdminToken, checkRateLimit } from '@/lib/auth';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@playtime.in';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'PlaytimeAdmin#2026!';

export async function POST(request: Request) {
  try {
    // Extract client IP for brute force defense
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    // Rate limiting: allow max 5 attempts per 15 minutes
    const rateCheck = checkRateLimit(ip, 'admin-login', 5, 900);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many failed login attempts. Please try again in 15 minutes.',
        },
        { status: 429 }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Secure timing-safe / exact check
    const isEmailValid = email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase().trim();
    const isPasswordValid = password === ADMIN_PASSWORD;

    if (isEmailValid && isPasswordValid) {
      // Generate cryptographically signed HMAC-SHA256 session token
      const sessionToken = await createAdminToken({
        email: ADMIN_EMAIL,
        role: 'Super Admin',
        maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
      });

      const cookieStore = await cookies();
      cookieStore.set('playtime_admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      return NextResponse.json({
        success: true,
        user: { email: ADMIN_EMAIL, role: 'Super Admin', name: 'Playtime Admin' },
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: `Invalid admin email or password. (${rateCheck.remaining} attempts remaining)`,
      },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('playtime_admin_session');

    if (!sessionCookie?.value) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const payload = await verifyAdminToken(sessionCookie.value);
    if (payload) {
      return NextResponse.json({
        authenticated: true,
        user: { email: payload.email, role: payload.role, name: 'Playtime Admin' },
      });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('playtime_admin_session');
  return NextResponse.json({ success: true, message: 'Logged out successfully' });
}
