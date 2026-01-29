/**
 * Infrastructure Layer - DOM Utilities
 * Cross-cutting DOM manipulation utilities
 */

export class DomUtils {
  /**
   * Safely get element by ID
   */
  static getElementById<T extends HTMLElement = HTMLElement>(id: string): T | null {
    return document.getElementById(id) as T | null;
  }

  /**
   * Set inner HTML safely
   */
  static setInnerHTML(elementId: string, html: string): boolean {
    const element = this.getElementById(elementId);
    if (!element) {
      console.error(`Element with ID "${elementId}" not found`);
      return false;
    }
    element.innerHTML = html;
    return true;
  }

  /**
   * Add event listener with error handling
   */
  static addEventListener<K extends keyof HTMLElementEventMap>(
    elementId: string,
    event: K,
    handler: (event: HTMLElementEventMap[K]) => void
  ): boolean {
    const element = this.getElementById(elementId);
    if (!element) {
      console.error(`Element with ID "${elementId}" not found`);
      return false;
    }
    element.addEventListener(event, handler);
    return true;
  }

  /**
   * Wait for DOM to be ready
   */
  static onReady(callback: () => void): void {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }
}
