/**
 * Data Layer - Resolution Model
 * Domain model for resolution data
 */

import type { ResolutionData, ResolutionStatus, ResolutionListItem, FrameworkUpdate } from '../types/resolution.types';

export class ResolutionModel {
  readonly id: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly description: string;
  readonly summary: string;
  readonly date: string;
  readonly status: ResolutionStatus;
  readonly sections: ResolutionData['sections'];
  private readonly frameworkUpdates: Record<string, FrameworkUpdate>;

  constructor(data: ResolutionData) {
    this.id = data.id;
    this.title = data.title;
    this.shortTitle = data.shortTitle;
    this.description = data.description;
    this.summary = data.summary;
    this.date = data.date;
    this.status = data.status;
    this.sections = data.sections || [];
    this.frameworkUpdates = data.frameworkUpdates || {};
  }

  get isPassed(): boolean {
    return this.status === 'passed';
  }

  get hasFrameworkUpdates(): boolean {
    return Object.keys(this.frameworkUpdates).length > 0;
  }

  getFrameworkUpdate(sectionName: string): FrameworkUpdate | null {
    return this.frameworkUpdates[sectionName] || null;
  }

  toListItem(): ResolutionListItem {
    return {
      id: this.id,
      title: this.title,
      summary: this.summary,
      date: this.date,
      status: this.status
    };
  }
}
