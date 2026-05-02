/**
 * Leaderboard persistence - localStorage implementation.
 *
 * HOW THIS WORKS:
 * Entries are stored per-device in localStorage under 'lam_leaderboard'.
 * Because this is client-only storage the leaderboard is local to each visitor.
 *
 * TO SWAP TO SERVER PERSISTENCE (e.g. Supabase):
 *  1. Create a Supabase table: lam_leaderboard (id, display_name, time_seconds, submitted_at, device_id)
 *  2. Replace getTop5() to call: supabase.from('lam_leaderboard').select('*').order('time_seconds').limit(5)
 *  3. Replace submitToLeaderboard() to call: supabase.from('lam_leaderboard').upsert(...)
 *  4. The one-per-day / best-time rules can move to a Postgres function or RLS policy.
 *  The localStorage rate-limiting keys (lam_submit_*) can remain as an optimistic client-side guard.
 */

export interface LeaderboardEntry {
  displayName: string;
  time: number; // seconds (float, 1 decimal)
  date: string; // UTC YYYY-MM-DD
}

const LEADERBOARD_KEY = 'lam_leaderboard';
const SUBMIT_PREFIX = 'lam_submit_';

function getUtcDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadAll(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    return raw ? (JSON.parse(raw) as LeaderboardEntry[]) : [];
  } catch {
    return [];
  }
}

function saveAll(entries: LeaderboardEntry[]): void {
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
}

/** Returns the top 5 entries sorted by fastest time (ascending). */
export function getTop5(): LeaderboardEntry[] {
  return loadAll()
    .sort((a, b) => a.time - b.time)
    .slice(0, 5);
}

export interface SubmitResult {
  success: boolean;
  /** 'already_submitted_faster' = user already has a faster time today; submit disabled */
  reason?: 'already_submitted_faster';
  displayName: string;
}

interface StoredSubmit {
  time: number;
  name: string;
}

/**
 * Submits a leaderboard entry for the given device.
 * Rules:
 *  - One submission per day per device (UTC day).
 *  - If the device already has a submission today, only update if the new time is faster.
 *  - If displayName is blank, auto-generate "SNOOP" + two-digit suffix (00-99).
 */
export function submitToLeaderboard(
  deviceId: string,
  time: number,
  rawDisplayName: string,
  _email?: string, // accepted for future server-side use; not persisted in client-only mode
): SubmitResult {
  const today = getUtcDate();
  const submitKey = `${SUBMIT_PREFIX}${deviceId}_${today}`;

  const existingRaw = localStorage.getItem(submitKey);
  if (existingRaw) {
    const prev = JSON.parse(existingRaw) as StoredSubmit;
    if (time >= prev.time) {
      // Not faster - reject
      return { success: false, reason: 'already_submitted_faster', displayName: prev.name };
    }
    // Faster time - remove old entry and replace
    const displayName = resolveDisplayName(rawDisplayName);
    const entries = loadAll().filter(
      (e) => !(e.date === today && e.displayName === prev.name),
    );
    entries.push({ displayName, time, date: today });
    saveAll(entries);
    localStorage.setItem(submitKey, JSON.stringify({ time, name: displayName }));
    return { success: true, displayName };
  }

  // First submission today
  const displayName = resolveDisplayName(rawDisplayName);
  const entries = loadAll();
  entries.push({ displayName, time, date: today });
  saveAll(entries);
  localStorage.setItem(submitKey, JSON.stringify({ time, name: displayName }));
  return { success: true, displayName };
}

/**
 * Returns the device's best submission for today, or null if none.
 */
export function getTodaySubmit(deviceId: string): StoredSubmit | null {
  const today = getUtcDate();
  const submitKey = `${SUBMIT_PREFIX}${deviceId}_${today}`;
  const raw = localStorage.getItem(submitKey);
  if (!raw) return null;
  return JSON.parse(raw) as StoredSubmit;
}

function resolveDisplayName(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed) return trimmed;
  const suffix = String(Math.floor(Math.random() * 100)).padStart(2, '0');
  return `SNOOP${suffix}`;
}
