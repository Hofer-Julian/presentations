/**
 * Resolves a root-relative asset path against the deployed base URL.
 *
 * Vite rewrites static `src="/foo.png"` attributes at build time, but leaves
 * bound `:src` expressions alone. Paths that reach a component as a prop have
 * to be resolved here so they keep working under a subpath deployment.
 */
export function assetUrl(path: string): string {
  return path.startsWith('/') ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path
}
