import { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'playtime_admin_session';
const DEFAULT_SECRET = 'playtime_sec_prod_key_7781a9f0b2c4e6d8a1e2f3b4';

// Use environment secret or a secure fallback
function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_JWT_SECRET || process.env.SESSION_SECRET || DEFAULT_SECRET;
}

// Generate HMAC-SHA256 signature using Web Crypto API (Edge & Node compatible)
async function signData(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const secretBytes = encoder.encode(secret);
  const dataBytes = encoder.encode(data);

  const key = await crypto.subtle.importKey(
    'raw',
    secretBytes as unknown as BufferSource,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, dataBytes as unknown as BufferSource);
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export interface AdminSessionPayload {
  email: string;
  role: string;
  iat: number;
  exp: number;
}

/**
 * Creates a cryptographically signed session token: base64(payload).signature
 */
export async function createAdminToken(payload: { email: string; role?: string; maxAgeSeconds?: number }): Promise<string> {
  const maxAge = payload.maxAgeSeconds || 60 * 60 * 24 * 7; // 7 days
  const now = Math.floor(Date.now() / 1000);
  const sessionData: AdminSessionPayload = {
    email: payload.email,
    role: payload.role || 'Super Admin',
    iat: now,
    exp: now + maxAge,
  };

  const encodedPayload = Buffer.from(JSON.stringify(sessionData)).toString('base64url');
  const signature = await signData(encodedPayload, getSecret());
  return `${encodedPayload}.${signature}`;
}

/**
 * Verifies a signed session token. Returns payload if valid, null if tampered or expired.
 */
export async function verifyAdminToken(token: string | undefined | null): Promise<AdminSessionPayload | null> {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [encodedPayload, receivedSignature] = parts;

  try {
    const expectedSignature = await signData(encodedPayload, getSecret());
    if (expectedSignature !== receivedSignature) {
      return null;
    }

    const jsonStr = Buffer.from(encodedPayload, 'base64url').toString('utf8');
    const payload: AdminSessionPayload = JSON.parse(jsonStr);

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (!payload.exp || payload.exp < now) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Helper to check admin session directly from request cookies or headers
 */
export async function verifyAdminRequest(request: Request | NextRequest): Promise<AdminSessionPayload | null> {
  let token: string | undefined;

  // Check Cookie header
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader
      .split(';')
      .map((c) => c.trim().split('='))
      .filter(([k]) => Boolean(k))
      .map(([k, ...v]) => [k, decodeURIComponent(v.join('='))])
  );

  token = cookies[SESSION_COOKIE_NAME];

  // Also support Authorization header Bearer token
  if (!token) {
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    }
  }

  return verifyAdminToken(token);
}

/**
 * Escapes regex special characters to prevent ReDoS / NoSQL regex injection
 */
export function escapeRegex(text: string): string {
  if (!text) return '';
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

/**
 * Lightweight in-memory rate limiter per IP address
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  ip: string,
  key: string,
  maxAttempts: number = 5,
  windowSeconds: number = 60
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const mapKey = `${key}:${ip}`;
  const record = rateLimitMap.get(mapKey);

  if (!record || record.resetTime < now) {
    rateLimitMap.set(mapKey, { count: 1, resetTime: now + windowSeconds * 1000 });
    return { allowed: true, remaining: maxAttempts - 1 };
  }

  if (record.count >= maxAttempts) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: maxAttempts - record.count };
}

/**
 * Generates an HMAC-SHA256 signature for URL access verification (Order Access Token)
 * Prevents unauthorized users from guessing or scraping order details by orderId alone.
 */
export async function createOrderAccessToken(orderId: string): Promise<string> {
  const data = `order_access:${orderId}`;
  return signData(data, getSecret());
}

/**
 * Verifies an HMAC-SHA256 order access token from query params or headers
 */
export async function verifyOrderAccessToken(orderId: string, token: string | undefined | null): Promise<boolean> {
  if (!orderId || !token) return false;
  try {
    const expected = await createOrderAccessToken(orderId);
    return expected === token;
  } catch {
    return false;
  }
}
