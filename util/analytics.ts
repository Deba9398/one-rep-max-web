export function logEvent(
  eventName: string,
  params?: { [key: string]: string }
) {
  // Read at call time rather than on import: this module gets evaluated in Node during the
  // static export, and in the browser it loads before the gtag script has defined itself.
  const googleAnalytics =
    typeof window === 'undefined' ? undefined : window.gtag;

  if (!googleAnalytics) {
    return;
  }

  googleAnalytics('event', eventName, params);
}
