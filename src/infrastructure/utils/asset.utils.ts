export const assetPath = (p: string) => {
  const base = (import.meta as any)?.env?.BASE_URL ?? '/';
  const clean = p.replace(/^\//, '');
  return `${base}${clean}`;
};
