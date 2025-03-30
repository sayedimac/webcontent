class App {
  constructor() {
    this.contentEl = document.getElementById('app-content');
    this.init();
  }

  init() {
    // Build menu from pages array in config.js
    this.buildMenu();
    
    // Set up navigation handlers
    this.setupNavigation();
    
    // Load the initial page
    this.loadCurrentPage();
  }

  buildMenu() {
    const nav = document.querySelector('#navbarNav .navbar-nav');
    if (!nav || typeof pages === 'undefined') return;
    
    // Clear existing menu items
    nav.innerHTML = '';
    
    // Create menu items from pages array
    pages.forEach(page => {
      const pageId = Array.isArray(page) ? page[0] : page;
      const displayName = Array.isArray(page) ? page[1] : page;
      
      const item = document.createElement('li');
      item.className = 'nav-item';
      
      const link = document.createElement('a');
      link.className = 'nav-link';
      link.href = pageId === 'home' ? '#/' : `#/${pageId}`;
      link.setAttribute('data-route', pageId);
      link.textContent = displayName;
      
      item.appendChild(link);
      nav.appendChild(item);
    });
  }

  setupNavigation() {
    // Handle clicks on navigation links
    document.addEventListener('click', e => {
      const link = e.target.closest('[data-route]');
      if (link) {
        e.preventDefault();
        const route = link.getAttribute('data-route');
        history.pushState(null, null, route === 'home' ? '#/' : `#/${route}`);
        this.loadCurrentPage();
      }
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => this.loadCurrentPage());
  }

  loadCurrentPage() {
    // Get current route from URL hash
    const path = window.location.hash.replace('#', '') || '/';
    const page = path === '/' ? 'home' : path.substring(1);
    
    // Update active state in navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-route') === page);
    });
    
    // Check if page exists in our pages array
    const pageIds = pages.map(p => Array.isArray(p) ? p[0] : p);
    if (typeof pages !== 'undefined' && pageIds.includes(page)) {
      this.loadContent(page);
    } else {
      this.loadContent('system', 'notFound');
    }
  }
  
  async loadContent(page, section) {
    try {
      // Fetch the markdown content
      const response = await fetch(`./markdown/${page}.md`);
      if (!response.ok) throw new Error(`Failed to load ${page}`);
      
      let markdown = await response.text();
      
      // If we're looking for a specific section (for system messages)
      if (section) {
        const sectionMatch = markdown.match(new RegExp(`## ${section}([\\s\\S]*?)(?=\\n## |$)`));
        markdown = sectionMatch ? sectionMatch[1].trim() : markdown;
      }
      
      // Render the markdown content
      this.contentEl.innerHTML = window.marked ? 
        marked.parse(markdown) : 
        markdown;
        
    } catch (error) {
      console.error(`Error loading content: ${page}`, error);
      
      // Try to load the error message from system.md
      this.loadContent('system', 'pageError');
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => new App());
