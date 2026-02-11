/**
 * Data Layer - Regiment Types
 */

export interface ActivityTime {
  startTime: string; // 24-hour format, e.g., "18:00"
  endTime: string;   // 24-hour format, e.g., "23:00"
  timezone: string;  // IANA timezone or abbreviation, e.g., "CET" or "Europe/Berlin"
  description?: string; // Optional custom description
}

export interface Regiment {
  name: string;
  abbreviation: string;
  group: 'central' | 'associate';
  joinedDate: string;
  description: string;
  tags: string[];
  discord?: string;
  // Optional path to a primary logo asset (stored in public/), e.g. 'TCSLogo.png'
  logo?: string;
  // Optional extra logos to display for central group regiments
  extraLogos?: string[];
  // Optional activity time - supports both string (legacy) and structured format
  activityTime?: string | ActivityTime;
}
