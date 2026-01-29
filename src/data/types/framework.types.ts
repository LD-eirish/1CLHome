/**
 * Data Layer - Framework Types
 * Type definitions for framework data structures
 */

export interface FrameworkSection {
  title: string;
  content: string;
}

export interface ComplexSection {
  title: string;
  intro: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
}

export interface ListSection {
  title: string;
  items: string[];
}

export interface MembersSection {
  title: string;
  list: Array<{
    name: string;
    joined: string;
  }>;
}

export interface FrameworkData {
  baseFramework: {
    introduction: FrameworkSection;
    membership: ComplexSection;
    governance: ComplexSection;
    officers: ListSection;
    recruitment: FrameworkSection;
    operations: FrameworkSection;
    strategy: FrameworkSection;
    communication: FrameworkSection;
    amendments: FrameworkSection;
    members: MembersSection;
  };
}
