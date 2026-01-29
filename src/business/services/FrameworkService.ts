/**
 * Business Layer - Framework Service
 * Orchestrates framework business logic and data operations
 */

import { DataService } from '../../data/services/DataService';
import { FrameworkModel } from '../../data/models/Framework.model';
import { ResolutionModel } from '../../data/models/Resolution.model';
import type { ResolutionListItem } from '../../data/types/resolution.types';
import type { ProcessedFrameworkUpdate } from '../types/framework-update.types';

export class FrameworkService {
  private frameworkData: FrameworkModel | null = null;
  private resolutions: ResolutionModel[] = [];

  /**
   * Initialize framework data
   */
  async initialize(): Promise<boolean> {
    try {
      const { framework, resolutions } = await DataService.fetchAllData();
      this.frameworkData = framework;
      this.resolutions = resolutions;
      return true;
    } catch (error) {
      console.error('Failed to initialize framework data:', error);
      return false;
    }
  }

  /**
   * Get framework updates for a specific section
   */
  getFrameworkUpdatesForSection(sectionName: string): ProcessedFrameworkUpdate[] {
    const updates: ProcessedFrameworkUpdate[] = [];
    
    for (const resolution of this.resolutions) {
      if (resolution.isPassed && resolution.hasFrameworkUpdates) {
        const update = resolution.getFrameworkUpdate(sectionName);
        if (update?.append) {
          updates.push({
            texts: update.append,
            reference: resolution.shortTitle
          });
        }
      }
    }

    return updates;
  }

  /**
   * Get framework data
   */
  getFrameworkData(): FrameworkModel | null {
    return this.frameworkData;
  }

  /**
   * Get all resolutions
   */
  getResolutions(): ResolutionModel[] {
    return this.resolutions;
  }

  /**
   * Get resolution by ID
   */
  getResolutionById(resolutionId: string): ResolutionModel | null {
    return this.resolutions.find(r => r.id === resolutionId) || null;
  }

  /**
   * Get resolutions list for library view
   */
  getResolutionsList(): ResolutionListItem[] {
    return this.resolutions.map(r => r.toListItem());
  }
}
