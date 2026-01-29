/**
 * Presentation Layer - Framework Renderer
 * Renders framework sections using consistent patterns
 */

import { HtmlRenderer } from './HtmlRenderer';
import type { FrameworkSection, ComplexSection, ListSection, MembersSection } from '../../data/types/framework.types';
import type { ProcessedFrameworkUpdate } from '../../business/types/framework-update.types';

export class FrameworkRenderer extends HtmlRenderer {
  /**
   * Render simple section
   */
  static renderSection(section: FrameworkSection): string {
    return this.createSection(section.title, section.content);
  }

  /**
   * Render complex section with subsections
   */
  static renderComplexSection(section: ComplexSection): string {
    let html = `
      <section class="content card">
        <h3>${this.escapeHtml(section.title)}</h3>
        <p class="lead">${section.intro}</p>
    `;

    for (const subsection of section.sections) {
      html += `
        <h4>${this.escapeHtml(subsection.title)}</h4>
        <p class="lead">${subsection.content}</p>
      `;
    }

    html += '</section>';
    return html;
  }

  /**
   * Render list section
   */
  static renderListSection(section: ListSection): string {
    return this.createListSection(section.title, section.items);
  }

  /**
   * Render members section
   */
  static renderMembersSection(section: MembersSection): string {
    const items = section.list.map(m => `${this.escapeHtml(m.name)} — joined: ${m.joined}`);
    let html = `
      <section class="content card">
        <h3>${this.escapeHtml(section.title)}</h3>
        <ul class="members">
    `;
    
    for (const item of items) {
      html += `<li>${item}</li>`;
    }
    
    html += '</ul></section>';
    return html;
  }

  /**
   * Render framework updates
   */
  static renderFrameworkUpdates(updates: ProcessedFrameworkUpdate[]): string {
    if (updates.length === 0) return '';

    let html = '';
    for (const update of updates) {
      html += '<div class="framework-update">';
      for (const text of update.texts) {
        html += `<p class="update-text"><em>${text}</em> <span class="update-ref">(${this.escapeHtml(update.reference)})</span></p>`;
      }
      html += '</div>';
    }

    return html;
  }
}
