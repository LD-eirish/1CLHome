/**
 * Infrastructure Layer - API Constants
 * Technical configuration for API endpoints and cache settings
 */

import type { CacheConfig, PathConfig } from '../types/common.types';

export const API_ENDPOINTS = {
  FRAMEWORK_DATA: '/1CLHome/src/data/framework-data.json',
  RESOLUTIONS: '/1CLHome/src/data/resolutions.json',
  REGIMENTS: '/1CLHome/src/data/regiments.json',
  RESOLUTION_TEMPLATE: '/1CLHome/src/data/resolution-template.json'
} as const;

export const CACHE_CONFIG: CacheConfig = {
  ttl: 5 * 60 * 1000, // 5 minutes
  enableCacheBusting: true
};

export const PATH_CONFIG: PathConfig = {
  resolutionsPath: '/resolutions/',
  basePathOffset: '../'
};
