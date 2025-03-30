// Simple SPA routing system
class App {
    constructor() {
        this.routes = {
            '/': this.homePage,
            '/about': this.aboutPage,
            '/menu': this.menuPage,
            '/contact': this.contactPage
        };

        this.contentEl = document.getElementById('app-content');

        // Initialize the router
        this.initRouter();

        // Load the current route
        this.handleRouteChange();
    }

    initRouter() {
        // Set up navigation event listeners
        document.querySelectorAll('[data-route]').forEach(link => {
            link.addEventListener('click', (e) => {
                const route = link.getAttribute('data-route');
                history.pushState(null, null, route === 'home' ? '#/' : `#/${route}`);
                this.handleRouteChange();
                e.preventDefault();
            });
        });

        // Handle popstate event (browser back/forward buttons)
        window.addEventListener('popstate', () => this.handleRouteChange());
    }

    handleRouteChange() {
        const path = window.location.hash.replace('#', '') || '/';
        const routeHandler = this.routes[path] || this.notFoundPage;

        // Update active link in navbar
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
            const route = link.getAttribute('data-route');
            const currentRoute = path === '/' ? 'home' : path.substring(1);
            if (route === currentRoute) {
                link.classList.add('active');
            }
        });

        routeHandler.call(this);
    }

    // Render page content
    renderContent(html) {
        this.contentEl.innerHTML = html;
    }

    // Fetch and parse markdown content
    async fetchMarkdown(file) {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${file}`);
            }
            const markdown = await response.text();
            return marked.parse(markdown);
        } catch (error) {
            console.error('Error fetching markdown:', error);
            // Provide a fallback content when fetch fails due to CORS
            if (file.includes('menu.md')) {
                return this.getMenuFallbackContent();
            }
            return `<div class="alert alert-danger">
                <p>Error loading content: ${error.message}</p>
                <p>This is likely due to CORS restrictions when running locally. 
                Try one of these solutions:</p>
                <ul>
                    <li>Use a local server (like Live Server in VS Code)</li>
                    <li>Use the fallback content we've provided</li>
                </ul>
            </div>`;
        }
    }

    // Fallback content for menu when fetch fails
    getMenuFallbackContent() {
        return `
            <h2>Our Menu Items</h2>
            
            <h3>Appetizers</h3>
            <ul>
                <li><strong>Bruschetta</strong> - Grilled bread rubbed with garlic and topped with olive oil, salt, tomato, and sometimes basil.</li>
                <li><strong>Calamari</strong> - Crispy fried squid served with marinara sauce.</li>
                <li><strong>Spinach Artichoke Dip</strong> - Creamy blend of cheeses, spinach, and artichokes served warm with tortilla chips.</li>
            </ul>
            
            <h3>Main Courses</h3>
            <ul>
                <li><strong>Classic Burger</strong> - Angus beef patty with lettuce, tomato, onion, and special sauce on a brioche bun.</li>
                <li><strong>Grilled Salmon</strong> - Fresh Atlantic salmon with lemon butter sauce, served with seasonal vegetables.</li>
                <li><strong>Pasta Primavera</strong> - Linguini pasta with fresh seasonal vegetables in a light cream sauce.</li>
            </ul>
            
            <h3>Desserts</h3>
            <ul>
                <li><strong>Chocolate Cake</strong> - Rich chocolate layer cake with chocolate ganache.</li>
                <li><strong>Cheesecake</strong> - New York style cheesecake with berry compote.</li>
                <li><strong>Tiramisu</strong> - Traditional Italian dessert with coffee-soaked ladyfingers and mascarpone cream.</li>
            </ul>
        `;
    }

    // Fallback content for when fetch fails
    getFallbackContent(section) {
        const fallbacks = {
            home: `
                <div class="hero-section text-center">
                    <h1>Welcome to Our Website</h1>
                    <p class="lead">A simple SPA built with HTML, CSS and vanilla JavaScript</p>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h5 class="card-title">Feature 1</h5>
                                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h5 class="card-title">Feature 2</h5>
                                <p class="card-text">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h5 class="card-title">Feature 3</h5>
                                <p class="card-text">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            about: `
                <div class="page-section">
                    <h1>About Us</h1>
                    <hr>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tempus libero non felis ultricies, ut varius libero varius. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec eget lectus vitae felis commodo placerat.</p>
                    <p>Integer at fringilla est. Praesent porta varius ex, non imperdiet lorem venenatis nec. Suspendisse potenti. Nunc consectetur mi sit amet nulla pharetra, sed sollicitudin leo tempus. Duis congue libero ut ultricies efficitur.</p>
                    <div class="row mt-4">
                        <div class="col-md-6">
                            <h3>Our Mission</h3>
                            <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec eget lectus vitae felis commodo placerat. Integer at fringilla est. Praesent porta varius ex, non imperdiet lorem venenatis nec.</p>
                        </div>
                        <div class="col-md-6">
                            <h3>Our Vision</h3>
                            <p>Pellentesque tempus libero non felis ultricies, ut varius libero varius. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec eget lectus vitae felis commodo placerat.</p>
                        </div>
                    </div>
                </div>
            `,
            menu: this.getMenuFallbackContent(),
            contact: `
                <div class="page-section">
                    <h1>Contact Us</h1>
                    <hr>
                    <p>We'd love to hear from you! Please fill out the form below and we'll get back to you as soon as possible.</p>
                    
                    <form class="contact-form mt-4">
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" required>
                        </div>
                        <div class="mb-3">
                            <label for="subject" class="form-label">Subject</label>
                            <input type="text" class="form-control" id="subject">
                        </div>
                        <div class="mb-3">
                            <label for="message" class="form-label">Message</label>
                            <textarea class="form-control" id="message" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                    
                    <div class="mt-5">
                        <h3>Our Location</h3>
                        <p>123 Main Street<br>City, State 12345<br>Phone: (123) 456-7890<br>Email: info@example.com</p>
                    </div>
                </div>
            `
        };

        return fallbacks[section] || '<div class="alert alert-danger">Content not available</div>';
    }

    // Route handlers for each page
    async homePage() {
        this.renderContent(`
            <div id="loading-indicator">Loading home content...</div>
            <div id="home-content"></div>
        `);

        try {
            const homeContent = await this.fetchMarkdown('./markdown/home.md');
            document.getElementById('home-content').innerHTML = homeContent;
        } catch (error) {
            document.getElementById('home-content').innerHTML = this.getFallbackContent('home');
        }

        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
    }

    async aboutPage() {
        this.renderContent(`
            <div id="loading-indicator">Loading about content...</div>
            <div id="about-content"></div>
        `);

        try {
            const aboutContent = await this.fetchMarkdown('./markdown/about.md');
            document.getElementById('about-content').innerHTML = aboutContent;
        } catch (error) {
            document.getElementById('about-content').innerHTML = this.getFallbackContent('about');
        }

        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
    }

    async menuPage() {
        this.renderContent(`
            <div class="page-section">
                <h1>Menu</h1>
                <hr>
                <div id="loading-indicator">Loading menu content...</div>
                <div id="menu-content" class="menu-section"></div>
            </div>
        `);

        try {
            const menuContent = await this.fetchMarkdown('./markdown/menu.md');
            document.getElementById('menu-content').innerHTML = menuContent;
        } catch (error) {
            document.getElementById('menu-content').innerHTML = this.getFallbackContent('menu');
        }

        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
    }

    async contactPage() {
        this.renderContent(`
            <div id="loading-indicator">Loading contact content...</div>
            <div id="contact-content"></div>
        `);

        try {
            const contactContent = await this.fetchMarkdown('./markdown/contact.md');
            document.getElementById('contact-content').innerHTML = contactContent;

            // Add form submit handler for demonstration
            const form = document.querySelector('.contact-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    alert('Thank you for your message! This is a demo form and does not actually submit data.');
                });
            }
        } catch (error) {
            document.getElementById('contact-content').innerHTML = this.getFallbackContent('contact');

            // Add form submit handler for demonstration (fallback)
            const form = document.querySelector('.contact-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    alert('Thank you for your message! This is a demo form and does not actually submit data.');
                });
            }
        }

        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
    }

    notFoundPage() {
        this.renderContent(`
            <div class="text-center">
                <h1>404 - Page Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
                <a href="#/" class="btn btn-primary">Go to Home</a>
            </div>
        `);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
});
