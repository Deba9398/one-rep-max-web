const googleAnalytics = window.gtag;

export function logEvent(
  eventName: string,
  params?: { [key: string]: string }
) {
  if (!googleAnalytics) {
    return;
  }

  googleAnalytics('event', eventName, params);
}
