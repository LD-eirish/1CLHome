/**
 * Data Layer - Regiment Types
 */

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
}
