/**
 * Infrastructure Layer - Path Utilities
 * Cross-cutting path resolution utilities
 */

import { PATH_CONFIG, CACHE_CONFIG } from '../constants/api.constants';
import type { ActivityTime } from '../../data/types/regiment.types';

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

/**
 * Formats activity time for display with timezone conversion.
 * Supports both string (legacy) and structured ActivityTime format.
 * @param activityTime - The activity time to format
 * @param showOriginal - Whether to show the original timezone in parentheses (default: true)
 */
export function formatActivityTime(activityTime: string | ActivityTime | undefined, showOriginal: boolean = true): string {
  if (!activityTime) return '';
  
  // Legacy string format - return as-is
  if (typeof activityTime === 'string') {
    return activityTime;
  }
  
  const { startTime, endTime, timezone, description } = activityTime;
  
  if (description) {
    return description;
  }

  try {
    // Map timezone abbreviations to IANA timezone names
    const timezoneMap: Record<string, string> = {
      'CET': 'Europe/Berlin',
      'CEST': 'Europe/Berlin',
      'EST': 'America/New_York',
      'EDT': 'America/New_York',
      'PST': 'America/Los_Angeles',
      'PDT': 'America/Los_Angeles',
      'GMT': 'Etc/GMT',
      'UTC': 'UTC',
      'JST': 'Asia/Tokyo',
      'AEST': 'Australia/Sydney',
      'CST': 'America/Chicago',
      'MST': 'America/Denver'
    };

    const sourceTimezone = timezoneMap[timezone] || timezone;
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // If same timezone, return original format
    if (sourceTimezone === userTimezone) {
      return `${startTime}-${endTime} ${timezone}`;
    }

    // Parse times
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    // Create arbitrary UTC dates with these times
    // We use UTC midnight of today as base, then add the hours/minutes
    const now = new Date();
    const baseDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    
    // These represent "startTime" and "endTime" as if they were in UTC
    const startUTC = new Date(baseDate.getTime() + startHour * 3600000 + startMin * 60000);
    const endUTC = new Date(baseDate.getTime() + endHour * 3600000 + endMin * 60000);
    
    // Now display these UTC times as if they were in the source timezone
    const sourceFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: sourceTimezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    const sourceStartStr = sourceFormatter.format(startUTC);
    const sourceEndStr = sourceFormatter.format(endUTC);
    
    // We need to find what UTC time corresponds to startTime in sourceTimezone
    // Adjust by comparing what the formatter shows vs what we want
    const [shownStartHour, shownStartMin] = sourceStartStr.split(':').map(Number);
    const [shownEndHour, shownEndMin] = sourceEndStr.split(':').map(Number);
    
    const startOffsetMs = (startHour - shownStartHour) * 3600000 + (startMin - shownStartMin) * 60000;
    const endOffsetMs = (endHour - shownEndHour) * 3600000 + (endMin - shownEndMin) * 60000;
    
    // Adjust to get the correct UTC times
    const correctStartUTC = new Date(startUTC.getTime() + startOffsetMs);
    const correctEndUTC = new Date(endUTC.getTime() + endOffsetMs);
    
    // Now format in user's timezone
    const userFormatter = new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const localStart = userFormatter.format(correctStartUTC);
    const localEnd = userFormatter.format(correctEndUTC);
    
    // Get user's timezone abbreviation 
    const userTzShort = new Intl.DateTimeFormat(undefined, {
      timeZoneName: 'short'
    }).formatToParts(now).find(part => part.type === 'timeZoneName')?.value || 'local';

    if (!showOriginal) {
      return `${localStart}-${localEnd} ${userTzShort}`;
    }

    return `${localStart}-${localEnd} ${userTzShort} (${startTime}-${endTime} ${timezone})`;
  } catch (error) {
    // Fallback if conversion fails
    console.error('Timezone conversion error:', error);
    return `${startTime}-${endTime} ${timezone}`;
  }
}
