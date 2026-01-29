/**
 * Data Layer - Data Service
 * Handles all external data communication and fetching
 */

import { API_ENDPOINTS } from '../../infrastructure/constants/api.constants';
import { PathUtils } from '../../infrastructure/utils/path.utils';
import { Logger } from '../../infrastructure/utils/logger';
import { FrameworkModel } from '../models/Framework.model';
import { ResolutionModel } from '../models/Resolution.model';
import type { FrameworkData } from '../types/framework.types';
import type { ResolutionData } from '../types/resolution.types';

export class DataService {
  /**
   * Fetch framework data from JSON file
   */
  static async fetchFrameworkData(): Promise<FrameworkModel> {
    try {
      const path = PathUtils.resolvePath(API_ENDPOINTS.FRAMEWORK_DATA);
      const response = await fetch(path);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch framework data`);
      }
      
      const data: FrameworkData = await response.json();
      Logger.info('Framework data loaded successfully');
      return new FrameworkModel(data);
    } catch (error) {
      Logger.error('Failed to fetch framework data', error);
      throw error;
    }
  }

  /**
   * Fetch resolutions data from JSON file
   */
  static async fetchResolutions(): Promise<ResolutionModel[]> {
    try {
      const path = PathUtils.resolvePath(API_ENDPOINTS.RESOLUTIONS);
      const response = await fetch(path);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch resolutions`);
      }
      
      const data: ResolutionData[] = await response.json();
      Logger.info(`Loaded ${data.length} resolutions`);
      return data.map(item => new ResolutionModel(item));
    } catch (error) {
      Logger.error('Failed to fetch resolutions', error);
      throw error;
    }
  }

  /**
   * Fetch all data in parallel
   */
  static async fetchAllData(): Promise<{
    framework: FrameworkModel;
    resolutions: ResolutionModel[];
  }> {
    try {
      const [framework, resolutions] = await Promise.all([
        this.fetchFrameworkData(),
        this.fetchResolutions()
      ]);
      
      return { framework, resolutions };
    } catch (error) {
      Logger.error('Failed to fetch all data', error);
      throw error;
    }
  }
}
