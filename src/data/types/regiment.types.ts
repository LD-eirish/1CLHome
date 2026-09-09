/**
 * Data Layer - Regiment Types
 */

export interface ActivityTime {
  startTime: string; // 24-hour format, e.g., "18:00"
  endTime: string;   // 24-hour format, e.g., "23:00"
  timezone: string;  // IANA timezone, e.g., "CET"
}

export interface Regiment {
  name: string;
  abbreviation: string;
  group: 'central' | 'associate';
  joinedDate: string;
  description: string;
  // Optional regiment leader display name
  leader?: string;
  // Optional inactive state used for visual card treatment
  inactive?: boolean;
  tags: string[];
  discord?: string;
  // Optional path to a primary logo asset (stored in public/), e.g. 'TCSLogo.png'
  logo?: string;
  // Optional activity time - supports both string and structured format
  activityTime?: string | ActivityTime;
}
