/**
 * Data Layer - Framework Model
 * Domain model for framework data
 */

import type { 
  FrameworkData, 
  FrameworkSection, 
  ComplexSection, 
  ListSection, 
  MembersSection 
} from '../types/framework.types';

export class FrameworkModel {
  private readonly data: FrameworkData;

  constructor(data: FrameworkData) {
    this.data = data;
  }

  get introduction(): FrameworkSection | null {
    return this.data.baseFramework?.introduction || null;
  }

  get membership(): ComplexSection | null {
    return this.data.baseFramework?.membership || null;
  }

  get governance(): ComplexSection | null {
    return this.data.baseFramework?.governance || null;
  }

  get officers(): ListSection | null {
    return this.data.baseFramework?.officers || null;
  }

  get recruitment(): FrameworkSection | null {
    return this.data.baseFramework?.recruitment || null;
  }

  get operations(): FrameworkSection | null {
    return this.data.baseFramework?.operations || null;
  }

  get strategy(): FrameworkSection | null {
    return this.data.baseFramework?.strategy || null;
  }

  get communication(): FrameworkSection | null {
    return this.data.baseFramework?.communication || null;
  }

  get amendments(): FrameworkSection | null {
    return this.data.baseFramework?.amendments || null;
  }

  get members(): MembersSection | null {
    return this.data.baseFramework?.members || null;
  }
}
