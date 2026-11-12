import sql from '@/src/lib/db';

export const dynamic = 'force-dynamic';

// Hit once a day by the Vercel Cron in vercel.json so the free Supabase
// project (shared by all portfolio apps) is never paused for inactivity.
export async function GET() {
  await sql`select 1`;
  return Response.json({ ok: true, at: new Date().toISOString() });
}
