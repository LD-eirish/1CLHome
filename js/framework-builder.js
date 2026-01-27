/**
 * 1CL Dynamic Framework and Resolution Builder
 * Automatically loads and renders framework and resolutions from JSON data
 */

class FrameworkBuilder {
  constructor() {
    this.frameworkData = null;
    this.resolutions = null;
  }

  async initialize() {
    try {
      // Determine base path based on current location
      const basePath = window.location.pathname.includes('/resolutions/') ? '../' : '';
      
      // Add cache-busting parameter
      const cacheBust = `?v=${Date.now()}`;
      
      // Load both data files
      const [frameworkResponse, resolutionsResponse] = await Promise.all([
        fetch(`${basePath}data/framework-data.json${cacheBust}`),
        fetch(`${basePath}data/resolutions.json${cacheBust}`)
      ]);
      
      this.frameworkData = await frameworkResponse.json();
      this.resolutions = await resolutionsResponse.json();
      
      return true;
    } catch (error) {
      console.error('Failed to load data:', error);
      return false;
    }
  }

  // Generate complete framework HTML with resolution updates integrated
  generateFramework() {
    if (!this.frameworkData) return '';
    
    const base = this.frameworkData.baseFramework;
    let html = '';

    // Introduction
    html += this.generateSection(base.introduction.title, base.introduction.content);

    // Membership & Structure
    html += this.generateComplexSection(base.membership);
    html += this.applyFrameworkUpdates('membership');

    // Command Structure
    html += this.generateComplexSection(base.governance);
    html += this.applyFrameworkUpdates('governance');

    // Officers
    html += this.generateListSection(base.officers.title, base.officers.items);

    // Recruitment
    html += this.generateSection(base.recruitment.title, base.recruitment.content);

    // Operations
    html += this.generateSection(base.operations.title, base.operations.content);

    // Strategy
    html += this.generateSection(base.strategy.title, base.strategy.content);

    // Communication
    html += this.generateSection(base.communication.title, base.communication.content);

    // Amendments
    html += this.generateSection(base.amendments.title, base.amendments.content);

    // Members
    html += this.generateMembersSection(base.members);

    return html;
  }

  generateSection(title, content, leadClass = 'lead') {
    return `
      <section class="content card">
        <h3>${title}</h3>
        <p class="${leadClass}">${content}</p>
      </section>
    `;
  }

  generateComplexSection(section) {
    let html = `
      <section class="content card">
        <h3>${section.title}</h3>
        <p class="lead">${section.intro}</p>
    `;

    section.sections.forEach(subsection => {
      html += `
        <h4>${subsection.title}</h4>
        <p class="lead">${subsection.content}</p>
      `;
    });

    html += '</section>';
    return html;
  }

  generateListSection(title, items) {
    let html = `
      <section class="content card">
        <h3>${title}</h3>
        <ul>
    `;

    items.forEach(item => {
      html += `<li>${item}</li>`;
    });

    html += '</ul></section>';
    return html;
  }

  generateMembersSection(members) {
    let html = `
      <section class="content card">
        <h3>${members.title}</h3>
        <ul class="members">
    `;

    members.list.forEach(member => {
      html += `<li>${member.name} — joined: ${member.joined}</li>`;
    });

    html += '</ul></section>';
    return html;
  }

  applyFrameworkUpdates(sectionName) {
    if (!this.resolutions) return '';
    
    let updates = '';
    
    this.resolutions.forEach(resolution => {
      if (resolution.status === 'passed' && resolution.frameworkUpdates && resolution.frameworkUpdates[sectionName]) {
        const update = resolution.frameworkUpdates[sectionName];
        
        if (update.append) {
          updates += `<div class="framework-update">`;
          update.append.forEach(text => {
            updates += `<p class="update-text"><em>${text}</em> <span class="update-ref">(${resolution.shortTitle})</span></p>`;
          });
          updates += `</div>`;
        }
      }
    });
    
    return updates;
  }

  // Generate resolution page HTML
  generateResolution(resolutionId) {
    const resolution = this.resolutions.find(r => r.id === resolutionId);
    if (!resolution) return '<p>Resolution not found.</p>';

    let html = `
      <section class="hero card">
        <div class="hero-left">
          <h2>${resolution.title}</h2>
          <p class="lead">${resolution.description}</p>
          <div class="pass-indicator ${resolution.status}">${resolution.status.toUpperCase()}</div>
        </div>
        <div class="hero-right">
          <img src="../1CLLogo.png" alt="1CL Logo" class="hero-logo"/>
          <button id="exportMain" class="no-export export-btn">Export to JPEG</button>
        </div>
      </section>
    `;

    resolution.sections.forEach(section => {
      html += `<section class="content card"><h3>${section.title}</h3>`;
      
      if (Array.isArray(section.content)) {
        section.content.forEach(item => {
          if (item.subtitle) {
            html += `<h4>${item.subtitle}</h4>`;
          }
          if (item.description) {
            html += `<p class="lead">${item.description}</p>`;
          }
          if (item.points) {
            html += '<ul>';
            item.points.forEach(point => {
              html += `<li>${point}</li>`;
            });
            html += '</ul>';
          }
        });
      } else {
        html += `<p class="lead">${section.content}</p>`;
      }
      
      html += '</section>';
    });

    return html;
  }

  // Get all resolutions for library view
  getResolutionsList() {
    return this.resolutions.map(r => ({
      id: r.id,
      title: r.title,
      summary: r.summary,
      date: r.date,
      status: r.status
    }));
  }
}

// Export for use in pages
window.FrameworkBuilder = FrameworkBuilder;
