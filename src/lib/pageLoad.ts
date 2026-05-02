/**
 * Captures the timestamp at module load time so the LAM timer
 * measures elapsed seconds from first page load.
 */
export const PAGE_LOAD_TS: number = performance.now();
