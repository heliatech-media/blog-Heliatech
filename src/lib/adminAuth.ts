import crypto from 'crypto';

// Master admin key hash (Default secret token: helia-admin-2026-secure-vault)
// In production, this can also be overridden via process.env.ADMIN_SECRET_KEY
const DEFAULT_ADMIN_TOKEN = process.env.ADMIN_SECRET_KEY || 'helia-admin-2026-secure-vault';

export function verifyAdminToken(providedToken: string | null | undefined): boolean {
  if (!providedToken) return false;

  const expectedBuffer = Buffer.from(DEFAULT_ADMIN_TOKEN);
  const providedBuffer = Buffer.from(providedToken);

  if (expectedBuffer.length !== providedBuffer.length) {
    return false;
  }

  // Timing-safe comparison to prevent side-channel timing attacks
  return crypto.timingSafeEqual(expectedBuffer, providedBuffer);
}

export function getAdminToken(): string {
  return DEFAULT_ADMIN_TOKEN;
}
