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
}
