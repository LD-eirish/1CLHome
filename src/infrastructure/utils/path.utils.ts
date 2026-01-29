/**
 * Infrastructure Layer - Path Utilities
 * Cross-cutting path resolution utilities
 */

import { PATH_CONFIG, CACHE_CONFIG } from '../constants/api.constants';

export class PathUtils {
  /**
   * Determine base path based on current location
   */
  static getBasePath(): string {
    return globalThis.location.pathname.includes(PATH_CONFIG.resolutionsPath) 
      ? PATH_CONFIG.basePathOffset 
      : '';
  }

  /**
   * Generate cache-busting parameter
   */
  static getCacheBustParam(): string {
    return CACHE_CONFIG.enableCacheBusting ? `?v=${Date.now()}` : '';
  }

  /**
   * Resolve full path with optional cache busting
   */
  static resolvePath(relativePath: string, cacheBust: boolean = true): string {
    const basePath = this.getBasePath();
    const cacheBustParam = cacheBust ? this.getCacheBustParam() : '';
    return `${basePath}${relativePath}${cacheBustParam}`;
  }
}
