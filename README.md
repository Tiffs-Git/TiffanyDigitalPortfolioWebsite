# BoltWebsite

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-qunrzka5)

---

## Easter Egg Features

Three UX easter eggs are built into the site for curious visitors.

### 1) Maintenance Hatch
Entry point: subtle text link at the very bottom of the footer.
Opens a modal with visual-only alarm flash (respects `prefers-reduced-motion`).

### 2) LAM (Leaderboard)
Entry point: the **LAM** button in the Project Map card (Work & Projects section).
Measures time from first page load (in seconds). Displays a Top 5 fastest leaderboard.
Submission is opt-in; blank display names are auto-filled as `SNOOP##`.

**Leaderboard persistence:**
Currently stored in `localStorage` (client-only; each visitor has their own view).
To swap to a global server-side leaderboard with Supabase:
1. Create a Supabase table: `lam_leaderboard(id, display_name, time_seconds, submitted_at, device_id)`
2. Update `src/lib/leaderboard.ts` -- replace `loadAll()`, `saveAll()`, and `getTop5()` with Supabase queries.
   See the comments at the top of that file for step-by-step guidance.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your `.env` file.

### 3) System Artifact
Entry point: small utility link at the bottom-right of the About section.
Opens a modal with a link to an external article (opens in a new tab).

**To update the article URL:**
Edit `src/lib/config.ts` and update `SYSTEM_ARTIFACT_ARTICLE_URL` and `SYSTEM_ARTIFACT_LINK_LABEL`
to point to the real article.
