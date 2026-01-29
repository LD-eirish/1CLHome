/**
 * Presentation Layer - Resolution Renderer
 * Renders resolution pages
 */

import { HtmlRenderer } from './HtmlRenderer';
import type { ResolutionModel } from '../../data/models/Resolution.model';
import type { ResolutionSection } from '../../data/types/resolution.types';

export class ResolutionRenderer extends HtmlRenderer {
  /**
   * Render complete resolution
   */
  static renderResolution(resolution: ResolutionModel | null): string {
    if (!resolution) {
      return this.createCard('<p>Resolution not found.</p>', 'card');
    }

    let html = this.renderHeroSection(resolution);
    html += this.renderContentSections(resolution.sections);
    return html;
  }

  /**
   * Render hero section
   */
  private static renderHeroSection(resolution: ResolutionModel): string {
    const base = (import.meta as any)?.env?.BASE_URL ?? '/';
    return `
      <section class="hero card">
        <div class="hero-left">
          <h2>${this.escapeHtml(resolution.title)}</h2>
          <p class="lead">${resolution.description}</p>
          <div class="pass-indicator ${resolution.status}">${resolution.status.toUpperCase()}</div>
        </div>
        <div class="hero-right">
          <img src="${base}1CLLogo.png" alt="1CL Logo" class="hero-logo"/>
          <button id="exportMain" class="no-export export-btn">Export to JPEG</button>
        </div>
      </section>
    `;
  }

  /**
   * Render content sections
   */
  private static renderContentSections(sections: ResolutionSection[]): string {
    return sections.map(section => this.renderSection(section)).join('');
  }

  /**
   * Render a single section
   */
  private static renderSection(section: ResolutionSection): string {
    const title = `<h3>${this.escapeHtml(section.title)}</h3>`;
    const content = Array.isArray(section.content) 
      ? this.renderArrayContent(section.content)
      : `<p class="lead">${section.content}</p>`;
    
    return `<section class="content card">${title}${content}</section>`;
  }

  /**
   * Render array content items
   */
  private static renderArrayContent(items: Array<{
    subtitle?: string;
    description?: string;
    points?: string[];
  }>): string {
    return items.map(item => this.renderContentItem(item)).join('');
  }

  /**
   * Render a single content item
   */
  private static renderContentItem(item: {
    subtitle?: string;
    description?: string;
    points?: string[];
  }): string {
    let html = '';
    
    if (item.subtitle) {
      html += `<h4>${this.escapeHtml(item.subtitle)}</h4>`;
    }
    if (item.description) {
      html += `<p class="lead">${item.description}</p>`;
    }
    if (item.points) {
      html += this.renderPoints(item.points);
    }
    
    return html;
  }

  /**
   * Render bullet points list
   */
  private static renderPoints(points: string[]): string {
    const listItems = points.map(point => `<li>${point}</li>`).join('');
    return `<ul>${listItems}</ul>`;
  }
}
