// This app is a static export: every component renders once in Node at build time, and
// the browser's first render has to produce identical markup or hydration fails. Anything
// backed by localStorage therefore has to report its build-time default until
// loadClientPreferences() runs from a mount effect.
let loaded = false;

export function areClientPreferencesLoaded() {
  return loaded;
}

// Idempotent, and safe to call from any effect that is about to read a stored preference.
// Child effects run before parent effects, so components call this themselves rather than
// relying on an ancestor having done it first.
export function loadClientPreferences() {
  if (typeof window === 'undefined') {
    return;
  }

  loaded = true;
}
