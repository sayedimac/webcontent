/**
 * App - Main application class for SPA
 */
class App {
  constructor() {
    this.contentDiv = document.getElementById('content');
    this.initialize();
  }

  /**
   * Initialize the application and set up event listeners
   */
  initialize() {
    // Set up event listeners
    window.addEventListener('hashchange', () => this.handleNavigation());
    
    // Initial navigation
    this.handleNavigation();
  }

  /**
   * Load content from markdown files
   * @param {string} pageName - The page to load
   */
  loadContent(pageName) {
    fetch(`./markdown/${pageName}.md`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load content');
        }
        return response.text();
      })
      .then(markdownContent => {
        // Use existing markdown parser or add one if needed
        const htmlContent = this.convertMarkdownToHtml(markdownContent);
        this.contentDiv.innerHTML = htmlContent;
      })
      .catch(error => {
        console.error('Error loading content:', error);
        this.contentDiv.innerHTML = '<p>Error loading content. Please try again later.</p>';
      });
  }

  /**
   * Handle navigation based on URL hash
   */
  handleNavigation() {
    const currentPage = window.location.hash.substring(1) || 'home';
    this.loadContent(currentPage);
  }

  /**
   * Convert markdown to HTML
   * @param {string} markdown - Markdown content
   * @returns {string} HTML content
   */
  convertMarkdownToHtml(markdown) {
    // Implement your markdown conversion logic here
    // If you're using a library like marked, showdown, etc., use it here
    
    // Simple placeholder implementation
    return markdown
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gm, '<li>$1</li>')
      .replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2">$1</a>')
      .replace(/\n/gm, '<br>');
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
});
