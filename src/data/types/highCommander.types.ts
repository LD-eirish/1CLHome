/**
 * Data Layer - Regiment Types
 */

export interface MandateTime {
  startTime: string; 
  endTime: string;   
  description?: string;
}

export interface HighCommanders {
  name: string;
  regiment: string;
  mandate: string;
  description: string;
}
