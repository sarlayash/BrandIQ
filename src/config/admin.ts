/**
 * Demo Admin Authentication Configuration
 * 
 * IMPORTANT: In production environments, replace this client-side demo configuration
 * with a secure backend authentication system (Firebase Auth, Supabase, OAuth2, or JWT).
 */
export const DEMO_ADMIN_CONFIG = {
  username: 'kapiladmin',
  password: 'admin123',
  displayName: 'Kapil Narula (Lead Assessor & Admin)',
  email: 'admin@aipersonalbranding.iq',
  institutionName: 'AI Personal Branding Institute',
  defaultVerificationPrefix: 'KAPIL-IQ-',
} as const;

export function verifyAdminCredentials(user: string, pass: string): boolean {
  return (
    user.trim().toLowerCase() === DEMO_ADMIN_CONFIG.username.toLowerCase() &&
    pass === DEMO_ADMIN_CONFIG.password
  );
}
