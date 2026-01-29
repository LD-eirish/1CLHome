/**
 * Infrastructure Layer - API Constants
 * Technical configuration for API endpoints and cache settings
 */

import type { CacheConfig, PathConfig } from '../types/common.types';

export const API_ENDPOINTS = {
  FRAMEWORK_DATA: 'src/data/framework-data.json',
  RESOLUTIONS: 'src/data/resolutions.json',
  REGIMENTS: 'src/data/regiments.json',
  RESOLUTION_TEMPLATE: 'src/data/resolution-template.json'
} as const;

export const CACHE_CONFIG: CacheConfig = {
  ttl: 5 * 60 * 1000, // 5 minutes
  enableCacheBusting: true
};

export const PATH_CONFIG: PathConfig = {
  resolutionsPath: '/resolutions/',
  basePathOffset: '../'
};
