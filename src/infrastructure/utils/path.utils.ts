/**
 * Infrastructure Layer - Path Utilities
 * Cross-cutting path resolution utilities
 */

import { PATH_CONFIG, CACHE_CONFIG } from '../constants/api.constants';
import type { ActivityTime } from '../../data/types/regiment.types';

const TIMEZONE_ALIAS_MAP: Record<string, string> = {
  CET: 'Europe/Berlin',
  CEST: 'Europe/Berlin',
  EET: 'Europe/Helsinki',
  EEST: 'Europe/Helsinki',
  EST: 'America/New_York',
  EDT: 'America/New_York',
  PST: 'America/Los_Angeles',
  PDT: 'America/Los_Angeles',
  AKST: 'America/Anchorage',
  AKDT: 'America/Anchorage',
  HST: 'Pacific/Honolulu',
  GMT: 'Etc/GMT',
  UTC: 'UTC',
  BST: 'Europe/London',
  JST: 'Asia/Tokyo',
  AEST: 'Australia/Sydney',
  CST: 'America/Chicago',
  CDT: 'America/Chicago',
  MST: 'America/Denver'
};

const SUPPORTED_TIMEZONE_LOOKUP: Map<string, string> = (() => {
  const lookup = new Map<string, string>();

  if (typeof Intl.supportedValuesOf !== 'function') {
    return lookup;
  }

  try {
    const zones = Intl.supportedValuesOf('timeZone');
    for (const zone of zones) {
      lookup.set(zone.toUpperCase(), zone);
    }
  } catch {
    // Fallback to runtime validation only.
  }

  for (const [alias, zone] of Object.entries(TIMEZONE_ALIAS_MAP)) {
    lookup.set(alias.toUpperCase(), zone);
  }

  return lookup;
})();

function isValidTimeZone(timeZone: string): boolean {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone });
    return true;
  } catch {
    return false;
  }
}

function parseUtcOffsetTimeZone(raw: string): string | null {
  const normalized = raw.trim().toUpperCase();
  if (normalized === 'Z' || normalized === 'UTC' || normalized === 'GMT') {
    return 'UTC';
  }

  const offsetRegex = /^(UTC|GMT)\s*([+-])\s*(\d{1,2})(?::?(\d{2}))?$/;
  const match = offsetRegex.exec(normalized);
  if (!match) return null;

  const sign = match[2];
  const hours = Number(match[3]);
  const minutes = Number(match[4] ?? '0');

  if (!Number.isInteger(hours) || hours < 0 || hours > 14) return null;
  if (!Number.isInteger(minutes) || minutes < 0 || minutes > 59) return null;

  // Etc/GMT supports whole-hour offsets only.
  if (minutes !== 0) return null;

  if (hours === 0) return 'UTC';

  // Sign is reversed in Etc/GMT names: UTC+2 => Etc/GMT-2.
  const etcSign = sign === '+' ? '-' : '+';
  return `Etc/GMT${etcSign}${hours}`;
}

function normalizeTimeZoneInput(rawTimeZone: string | undefined): string | null {
  if (!rawTimeZone) return null;

  const trimmed = rawTimeZone.trim();
  if (!trimmed) return null;

  const canonicalKey = trimmed.replaceAll(' ', '_').toUpperCase();
  const canonicalTimeZone = SUPPORTED_TIMEZONE_LOOKUP.get(canonicalKey);
  if (canonicalTimeZone) return canonicalTimeZone;

  if (isValidTimeZone(trimmed)) return trimmed;

  const mapped = TIMEZONE_ALIAS_MAP[trimmed.toUpperCase()];
  if (mapped && isValidTimeZone(mapped)) return mapped;

  const parsedOffset = parseUtcOffsetTimeZone(trimmed);
  if (parsedOffset && isValidTimeZone(parsedOffset)) return parsedOffset;

  return null;
}

function parseTimeParts(time: string): { hour: number; minute: number } | null {
  const [hourStr, minuteStr] = time.split(':');
  const hour = Number(hourStr);
  const minute = Number(minuteStr);

  if (!Number.isInteger(hour) || !Number.isInteger(minute)) return null;
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;

  return { hour, minute };
}

function getDatePartsInTimeZone(date: Date, timeZone: string): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
} {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const parts = formatter.formatToParts(date);
  const get = (type: string): number => Number(parts.find((p) => p.type === type)?.value ?? '0');

  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
    hour: get('hour'),
    minute: get('minute'),
    second: get('second')
  };
}

function getTimeZoneOffsetMs(date: Date, timeZone: string): number {
  const zoned = getDatePartsInTimeZone(date, timeZone);
  const zonedAsUtc = Date.UTC(
    zoned.year,
    zoned.month - 1,
    zoned.day,
    zoned.hour,
    zoned.minute,
    zoned.second
  );

  return zonedAsUtc - date.getTime();
}

function zonedLocalTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string
): Date {
  const localAsUtcMs = Date.UTC(year, month - 1, day, hour, minute, 0);
  let utcMs = localAsUtcMs - getTimeZoneOffsetMs(new Date(localAsUtcMs), timeZone);

  // Re-run offset calculation at the computed instant for DST boundaries.
  utcMs = localAsUtcMs - getTimeZoneOffsetMs(new Date(utcMs), timeZone);
  return new Date(utcMs);
}

function addDaysUtc(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

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
export function formatActivityTime(activityTime: string | ActivityTime | undefined, showOriginal: boolean = false): string {
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
    const sourceTimezone = normalizeTimeZoneInput(timezone);
    const userTimezone = normalizeTimeZoneInput(Intl.DateTimeFormat().resolvedOptions().timeZone) || 'UTC';

    if (!sourceTimezone) {
      return `${startTime}-${endTime} ${timezone}`;
    }

    // If same timezone, return original format
    if (sourceTimezone === userTimezone) {
      return `${startTime}-${endTime} ${timezone}`;
    }

    const start = parseTimeParts(startTime);
    const end = parseTimeParts(endTime);
    if (!start || !end) {
      return `${startTime}-${endTime} ${timezone}`;
    }

    // Use today's date in the source timezone as an anchor.
    const now = new Date();
    const sourceToday = getDatePartsInTimeZone(now, sourceTimezone);
    const startUtc = zonedLocalTimeToUtc(
      sourceToday.year,
      sourceToday.month,
      sourceToday.day,
      start.hour,
      start.minute,
      sourceTimezone
    );

    let endUtc = zonedLocalTimeToUtc(
      sourceToday.year,
      sourceToday.month,
      sourceToday.day,
      end.hour,
      end.minute,
      sourceTimezone
    );

    // If end appears earlier than start, treat it as next day in source timezone.
    if (endUtc.getTime() <= startUtc.getTime()) {
      const nextDay = addDaysUtc(startUtc, 1);
      const nextSourceDate = getDatePartsInTimeZone(nextDay, sourceTimezone);
      endUtc = zonedLocalTimeToUtc(
        nextSourceDate.year,
        nextSourceDate.month,
        nextSourceDate.day,
        end.hour,
        end.minute,
        sourceTimezone
      );
    }

    const userFormatter = new Intl.DateTimeFormat(undefined, {
      timeZone: userTimezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const localStart = userFormatter.format(startUtc);
    const localEnd = userFormatter.format(endUtc);

    const userTzShort = new Intl.DateTimeFormat(undefined, {
      timeZone: userTimezone,
      timeZoneName: 'short'
    }).formatToParts(startUtc).find(part => part.type === 'timeZoneName')?.value || userTimezone;

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
