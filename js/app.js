class App {
  constructor() {
    this.contentEl = document.getElementById('app-content');
    this.init();
  }

  async init() {
    // Build menu from pages array in config.js
    this.buildMenu();
    
    // Load all page content at once
    await this.loadAllContent();
    
    // Set up navigation and scroll to initial section
    this.setupNavigation();
    this.scrollToCurrentSection();
  }

  buildMenu() {
    const nav = document.querySelector('#navbarNav .navbar-nav');
    if (!nav || typeof pages === 'undefined') return;
    
    // Clear existing menu items
    nav.innerHTML = '';
    
    // Create menu items from pages array
    pages.forEach((page, index) => {
      const pageId = Array.isArray(page) ? page[0] : page;
      const displayName = Array.isArray(page) ? page[1] : page;
      
      const item = document.createElement('li');
      item.className = 'nav-item';
      
      const link = document.createElement('a');
      link.className = 'nav-link';
      
      // Make the first page link point to the top of the page
      if (index === 0) {
        link.href = '#'; // This will scroll to the top
        link.setAttribute('data-section', 'top');
      } else {
        link.href = `#${pageId}`;
        link.setAttribute('data-section', pageId);
      }
      
      link.textContent = displayName;
      
      item.appendChild(link);
      nav.appendChild(item);
    });
  }

  async loadAllContent() {
    // Show loading indicator
    this.contentEl.innerHTML = '<div class="text-center my-5"><h3>Loading content...</h3></div>';
    
    let allContent = '';
    const pageIds = pages.map(p => Array.isArray(p) ? p[0] : p);
    
    try {
      // Load system.md for error messages
      const systemResponse = await fetch('./markdown/system.md');
      if (systemResponse.ok) {
        const systemMd = await systemResponse.text();
        // We'll keep this in memory but not display it
        this.systemContent = systemMd;
      }
      
      // Load all page content
      for (const pageId of pageIds) {
        try {
          const response = await fetch(`./markdown/${pageId}.md`);
          if (response.ok) {
            const markdown = await response.text();
            // Create a section for each page with an id for navigation
            allContent += `<section id="${pageId}" class="page-section mb-5">${marked.parse(markdown)}</section>`;
          } else {
            allContent += this.getErrorHtml(pageId);
          }
        } catch (error) {
          console.error(`Error loading ${pageId}:`, error);
          allContent += this.getErrorHtml(pageId);
        }
      }
      
      // Render all content at once
      this.contentEl.innerHTML = allContent;
      
    } catch (error) {
      console.error('Error loading content:', error);
      this.contentEl.innerHTML = '<div class="alert alert-danger">Failed to load content</div>';
    }
  }
  
  getErrorHtml(pageId) {
    let errorMessage = `<h2>Error Loading ${pageId}</h2><p>Sorry, we couldn't load this content.</p>`;
    
    if (this.systemContent) {
      const pageErrorMatch = this.systemContent.match(/## pageError([\s\S]*?)(?=\n## |$)/);
      if (pageErrorMatch) {
        errorMessage = marked.parse(pageErrorMatch[1].trim());
      }
    }
    
    return `<section id="${pageId}" class="page-section error-section">${errorMessage}</section>`;
  }

  setupNavigation() {
    // Update active link based on scroll position
    window.addEventListener('scroll', this.updateActiveLink.bind(this));
    
    // Smooth scroll to section when clicking a link
    document.querySelectorAll('[data-section]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        
        if (sectionId === 'top') {
          // Scroll to the top of the page
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          
          // Update URL
          history.pushState(null, null, location.pathname);
        } else {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
            
            // Update URL without triggering navigation
            history.pushState(null, null, `#${sectionId}`);
          }
        }
        
        // Update active state
        this.updateActiveLink();
      });
    });
  }
  
  updateActiveLink() {
    // Find the section that's currently most visible in the viewport
    const sections = document.querySelectorAll('.page-section');
    let currentSection = '';
    let maxVisibility = 0;
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the section is visible
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      const visibility = visibleHeight / section.offsetHeight;
      
      if (visibility > maxVisibility) {
        maxVisibility = visibility;
        currentSection = section.id;
      }
    });
    
    // Special handling for top section
    if (window.scrollY < 50) {
      // If we're at the top of the page, activate the first link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-section') === 'top');
      });
      return;
    }
    
    // Update active state
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-section') === currentSection);
    });
  }
  
  scrollToCurrentSection() {
    // Get section from URL hash or default to first page
    const hash = window.location.hash.substring(1);
    const sectionId = hash || (pages.length > 0 ? 
      (Array.isArray(pages[0]) ? pages[0][0] : pages[0]) : '');
    
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ block: 'start' });
        this.updateActiveLink();
      }
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => new App());
