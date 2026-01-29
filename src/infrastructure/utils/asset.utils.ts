export const assetPath = (p: string) => {
  const clean = p.replace(/^\//, '');
  // Resolve in order of reliability:
  // 1. <base href="..."> tag if present in document
  // 2. document.baseURI when it contains a repo subpath
  // 3. derive repo base from the first non-empty segment of location.pathname
  // 4. fall back to location.origin + Vite build-time BASE_URL
  try {
    if (typeof document !== 'undefined') {
      // 1) base tag
      const baseEl = document.querySelector('base');
      const baseHref = baseEl?.getAttribute('href');
      if (baseHref && baseHref !== '/') {
        return new URL(clean, baseHref).href;
      }

      // 2) document.baseURI if it includes a repo subpath beyond origin
      if (document.baseURI) {
        const originRoot = `${location.origin}/`;
        if (document.baseURI !== originRoot) {
          return new URL(clean, document.baseURI).href;
        }
      }

      // 3) derive from location.pathname first segment (e.g. /repo/...)
      const path = location.pathname || '/';
      const segments = path.split('/').filter(Boolean);
      if (segments.length > 0) {
        const repoBase = `/${segments[0]}/`;
        return new URL(clean, `${location.origin}${repoBase}`).href;
      }
    }
  } catch (e) {
    // continue to fallback
  }

  // 4) fallback to Vite BASE_URL at build time
  const baseUrl = (import.meta as any)?.env?.BASE_URL ?? '/';
  return new URL(clean, `${location.origin}${baseUrl}`).href;
};
