/**
 * Presentation Layer - HTML Renderer Base
 * Reusable HTML rendering utilities
 */

export class HtmlRenderer {
  /**
   * Create a section with title and content
   */
  protected static createSection(title: string, content: string, className: string = 'lead'): string {
    return `
      <section class="content card">
        <h3>${this.escapeHtml(title)}</h3>
        <p class="${className}">${content}</p>
      </section>
    `;
  }

  /**
   * Create a section with title and HTML list
   */
  protected static createListSection(title: string, items: string[]): string {
    const listItems = items.map(item => `<li>${item}</li>`).join('');
    return `
      <section class="content card">
        <h3>${this.escapeHtml(title)}</h3>
        <ul>${listItems}</ul>
      </section>
    `;
  }

  /**
   * Escape HTML to prevent XSS (for titles only, content may contain markup)
   */
  protected static escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Create a card with custom content
   */
  protected static createCard(content: string, className: string = 'content card'): string {
    return `<section class="${className}">${content}</section>`;
  }
}
