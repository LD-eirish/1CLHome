export const assetPath = (p: string) => {
  const clean = p.replace(/^\//, '');

  // Prefer the document base URI when available at runtime. This ensures
  // asset resolution respects the current served base (useful on GitHub Pages
  // for project pages and user pages alike).
  try {
    if (typeof document !== 'undefined' && document.baseURI) {
      return new URL(clean, document.baseURI).href;
    }
  } catch (e) {
    // fallback to build-time BASE_URL
  }

  const base = (import.meta as any)?.env?.BASE_URL ?? '/';
  return `${base}${clean}`;
};
