declare global {
  interface Window {
    __orbitReapplyLang?: () => void;
  }
}

/** Re-runs client-side PT→EN after React re-injects Portuguese HTML. */
export function reapplyOrbitLang() {
  if (typeof window === 'undefined') return;
  if (typeof window.__orbitReapplyLang === 'function') {
    window.__orbitReapplyLang();
  }
}
