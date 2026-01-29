/**
 * Data Layer - Resolution Types
 * Type definitions for resolution data structures
 */

export type ResolutionStatus = 'passed' | 'failed' | 'pending' | 'draft';

export interface ResolutionSection {
  title: string;
  content: string | Array<{
    subtitle?: string;
    description?: string;
    points?: string[];
  }>;
}

export interface FrameworkUpdate {
  append?: string[];
  modify?: Record<string, string>;
  remove?: string[];
}

export interface ResolutionData {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  summary: string;
  date: string;
  status: ResolutionStatus;
  sections: ResolutionSection[];
  frameworkUpdates?: Record<string, FrameworkUpdate>;
}

export interface ResolutionListItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  status: ResolutionStatus;
}
