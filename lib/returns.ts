export const RETURN_WINDOW_DAYS = 7;
const RETURN_WINDOW_MS = RETURN_WINDOW_DAYS * 24 * 60 * 60 * 1000;

export function isWithinReturnWindow(receivedAt: string | null | undefined, now = Date.now()) {
  if (!receivedAt) return false;
  const receivedTime = new Date(receivedAt).getTime();
  if (Number.isNaN(receivedTime)) return false;
  return now - receivedTime >= 0 && now - receivedTime <= RETURN_WINDOW_MS;
}
