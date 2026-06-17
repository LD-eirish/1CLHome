export const assetPath = (p: string) => {
  const clean = p.replace(/^\//, '');
  const rawBaseUrl = (import.meta as any)?.env?.BASE_URL ?? '/';
  const normalizedBaseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl : `${rawBaseUrl}/`;

  if (typeof location !== 'undefined') {
    return new URL(`${normalizedBaseUrl}${clean}`, location.origin).href;
  }

  return `${normalizedBaseUrl}${clean}`;
};
