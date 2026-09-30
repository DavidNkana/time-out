const CONSENT_KEY = 'timeout:cookie_consent_v1';

export function trackEvent(event: string, properties: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  try {
    const consent = JSON.parse(window.localStorage.getItem(CONSENT_KEY) || 'null');
    if (!consent?.analytics) return;

    fetch('/api/log/error', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        message: `event:${event}`,
        severity: 'info',
        payload: { event, ...properties },
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Tracking must never interrupt shopping.
  }
}
