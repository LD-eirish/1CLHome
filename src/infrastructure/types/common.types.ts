/**
 * Infrastructure Layer - Common Types
 * Shared type definitions across all layers
 */

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface CacheConfig {
  ttl: number;
  enableCacheBusting: boolean;
}

export interface PathConfig {
  resolutionsPath: string;
  basePathOffset: string;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ErrorInfo {
  message: string;
  code?: string;
  timestamp: Date;
}
