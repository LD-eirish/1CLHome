/**
 * Data Layer - Regiment Types
 */

export interface OfficePeriod {
  startDate: string;
  endDate: string | null;
}

export interface HighCommanders {
  name: string;
  regiment: string;
  war?: string;
  viceHighCommander?: string;
  viceRegiment?: string;
  officeStart: string;
  officeEnd: string | null;
  description: string;
}
