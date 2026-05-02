const STORAGE_KEY = 'egg_device_id';

/**
 * Returns a stable anonymous device identifier stored in localStorage.
 * Created once on first visit. Used for per-device submission rate limiting.
 */
export function getDeviceId(): string {
  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id =
      typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}
