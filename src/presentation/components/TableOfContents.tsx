/**
 * Presentation Layer - Table of Contents Component
 * Dynamically generates and manages interactive table of contents
 */

import { useEffect, useState } from 'react';

interface TocSection {
  id: string;
  title: string;
  subsections?: TocSubsection[];
}

interface TocSubsection {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  readonly contentId: string;
}

/**
 * Generate TOC from rendered content
 */
function generateTocFromContent(contentId: string): TocSection[] {
  const content = document.getElementById(contentId);
  if (!content) return [];

  const sections: TocSection[] = [];
  const cards = content.querySelectorAll('.card');

  cards.forEach((card, sectionIndex) => {
    const h3 = card.querySelector('h3');
    if (!h3) return;

    const sectionId = `section-${sectionIndex}`;
    h3.id = sectionId;
    h3.setAttribute('tabindex', '-1');

    const subsections: TocSubsection[] = [];
    const h4Elements = card.querySelectorAll('h4');

    h4Elements.forEach((h4, subIndex) => {
      const subId = `section-${sectionIndex}-${subIndex}`;
      h4.id = subId;
      h4.setAttribute('tabindex', '-1');

      subsections.push({
        id: subId,
        title: h4.textContent || ''
      });
    });

    sections.push({
      id: sectionId,
      title: h3.textContent || '',
      subsections: subsections.length > 0 ? subsections : undefined
    });
  });

  return sections;
}

/**
 * Scroll to section smoothly
 */
function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    element.focus();
  }
}

export function TableOfContents({ contentId }: Readonly<TableOfContentsProps>) {
  const [sections, setSections] = useState<TocSection[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  // Collapse when viewport is small (width or height) to avoid overlaying content
  useEffect(() => {
    const checkSize = () => {
      const shouldCollapse = window.innerWidth <= 900 || window.innerHeight <= 700;
      setCollapsed(shouldCollapse);
    };

    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  useEffect(() => {
    // Generate TOC after content is rendered
    const timer = setTimeout(() => {
      const tocSections = generateTocFromContent(contentId);
      setSections(tocSections);
    }, 100);

    return () => clearTimeout(timer);
  }, [contentId]);

  useEffect(() => {
    // Position TOC to align with framework content and adjust on scroll
    const handleScroll = () => {
      // Only apply dynamic positioning on desktop (width > 768px)
      if (window.innerWidth <= 768) return;
      
      const toc = document.querySelector('.toc') as HTMLElement;
      const contentElement = document.getElementById(contentId);
      if (!toc || !contentElement) return;

      const scrollTop = window.scrollY;
      const contentTop = contentElement.offsetTop;
      const headerHeight = 70;
      const minTop = headerHeight + 20; 
      const extraOffset = 18;

      // Calculate where TOC should be positioned
      const calculatedTop = contentTop - scrollTop + extraOffset;

      // TOC should start at content position but never go above the header
      if (calculatedTop > minTop) {
        toc.style.top = `${calculatedTop}px`;
      } else {
        toc.style.top = `${minTop}px`;
      }
    };

    const handleResize = () => {
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll(); // Set initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [contentId, sections]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  if (sections.length === 0) return null;

  return (
    <>
      <aside className={`toc card ${collapsed ? 'collapsed' : 'expanded'}`} aria-hidden={collapsed}>
        <div className="toc-header">
          <h3 className="toc-title">Contents</h3>
          <button
            className="toggle-btn toc-toggle"
            aria-expanded={!collapsed}
            aria-controls="framework-toc"
            onClick={() => setCollapsed((s) => !s)}
          >
            <span className="toggle-icon" aria-hidden>
              {collapsed ? '\u25BA' : '\u25C4'}
            </span>
            <span className="toggle-label">{collapsed ? 'Open' : 'Close'}</span>
          </button>
        </div>
        <nav id="framework-toc" aria-label="Framework sections">
          <ul className="toc-list">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(e) => { handleLinkClick(e, section.id); if (window.innerWidth <= 900) setCollapsed(true); }}
                  aria-label={`Jump to ${section.title}`}
                >
                  {section.title}
                </a>
                {section.subsections && section.subsections.length > 0 && (
                  <ul>
                    {section.subsections.map((sub) => (
                      <li key={sub.id}>
                        <a
                          href={`#${sub.id}`}
                          onClick={(e) => { handleLinkClick(e, sub.id); if (window.innerWidth <= 900) setCollapsed(true); }}
                          aria-label={`Jump to ${sub.title}`}
                        >
                          {sub.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
