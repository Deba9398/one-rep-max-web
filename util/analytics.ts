const googleAnalytics = window.gtag;

export function LogEvent(
  eventName: string,
  params?: { [key: string]: string }
) {
  if (!googleAnalytics) {
    return;
  }

  googleAnalytics('event', eventName, params);
}
