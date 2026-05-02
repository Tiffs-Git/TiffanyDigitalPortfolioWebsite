import { useState } from 'react';
import BaseModal from './BaseModal';
import { getDeviceId } from '../../lib/deviceId';
import {
  getTop5,
  getTodaySubmit,
  submitToLeaderboard,
  type LeaderboardEntry,
} from '../../lib/leaderboard';

interface Props {
  elapsedSeconds: number;
  onClose: () => void;
}

export default function LAMModal({ elapsedSeconds, onClose }: Props) {
  const deviceId = getDeviceId();
  const todaySubmit = getTodaySubmit(deviceId);
  const alreadySubmitted = todaySubmit !== null && todaySubmit.time <= elapsedSeconds;

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [top5, setTop5] = useState<LeaderboardEntry[]>(() => getTop5());

  function handleSubmit() {
    const result = submitToLeaderboard(deviceId, elapsedSeconds, displayName, email || undefined);
    if (result.success) {
      setSubmittedName(result.displayName);
      setSubmitted(true);
      setTop5(getTop5());
    }
  }

  return (
    <BaseModal title="LAM: Leave a Mark!" onClose={onClose}>
      {/* Timer copy */}
      <div className="space-y-2 mb-6">
        <p className="text-warm-300 leading-relaxed">
          Most people skim. You read the fine print, don't you?
        </p>
        <p className="text-warm-300 leading-relaxed">
          You made it here in{' '}
          <span className="text-gold-300 font-semibold">{elapsedSeconds}</span> seconds.
        </p>
        <p className="text-warm-300 leading-relaxed">
          Include your name on the leaderboard.
        </p>
      </div>

      {/* Leaderboard preview */}
      {top5.length > 0 && (
        <div className="mb-6">
          <p className="text-warm-300/50 text-xs tracking-widest uppercase mb-3 font-medium">
            Top 5 Fastest
          </p>
          <div className="space-y-2">
            {top5.map((entry, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm py-1.5 px-3 rounded-lg bg-navy-900/60 border border-navy-600/30"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gold-500/70 text-xs font-medium w-4">
                    {i + 1}
                  </span>
                  <span className="text-warm-200">{entry.displayName}</span>
                </div>
                <span className="text-teal-300 text-xs font-medium">
                  {entry.time}s
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submission form */}
      {submitted ? (
        <div className="py-4 text-center space-y-1">
          <p className="text-teal-300 font-medium">Mark left.</p>
          <p className="text-warm-300/60 text-sm">
            You're on the board as <span className="text-warm-200">{submittedName}</span>.
          </p>
        </div>
      ) : alreadySubmitted ? (
        <p className="text-warm-300/50 text-sm text-center py-2">
          You already left a mark today.
        </p>
      ) : (
        <div className="space-y-3">
          <div>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display name (optional)"
              className="w-full bg-navy-900/70 border border-navy-600/50 rounded-lg px-4 py-2.5 text-sm text-warm-200 placeholder-warm-300/30 focus:outline-none focus:border-teal-600/60 transition-colors"
            />
            <p className="text-warm-300/40 text-xs mt-1.5">
              Leave blank to post as SNOOP##.
            </p>
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional)"
              className="w-full bg-navy-900/70 border border-navy-600/50 rounded-lg px-4 py-2.5 text-sm text-warm-200 placeholder-warm-300/30 focus:outline-none focus:border-teal-600/60 transition-colors"
            />
          </div>
          <div className="flex justify-end pt-1">
            <button
              onClick={handleSubmit}
              className="px-5 py-2.5 rounded-lg bg-gold-700/50 hover:bg-gold-600/60 border border-gold-600/50 hover:border-gold-500/70 text-gold-200 hover:text-gold-100 text-sm font-medium tracking-wide transition-all duration-200"
            >
              Leave your mark
            </button>
          </div>
        </div>
      )}
    </BaseModal>
  );
}
