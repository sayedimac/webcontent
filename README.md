# MarkdownUp - A Simple Content Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Deploy to Azure Static Web Apps](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.StaticApp)

A lightweight Single Page Application (SPA) framework that renders content from Markdown files, with GitHub-based content management and Azure Static Web Apps deployment.

## Features

- 100% Content-driven approach using Markdown files
- Simple configuration-based menu system
- No coding required to add or change pages
- Modern class-based JavaScript architecture
- No external dependencies
- Responsive design
- Azure Static Web Apps deployment ready

## How It Works

MarkdownUp uses a simple architecture:

1. **config.js** - Contains the menu structure and page definitions
2. **markdown files** - Contain all content for each page
3. **app.js** - Handles the mechanics (loading content, navigation, etc.)

The separation of concerns means you only need to edit content files to change your site.

## Content Management

### Customizing the Menu and Pages

The menu and available pages are configured in a single file: `js/config.js`

```javascript
// Pages array with [pageId, displayName] pairs
const pages = [
  ['home', 'Home'],
  ['about', 'About Us'],
  ['menu', 'Menu'],
  ['contact', 'Contact Us']
];
```

To customize your menu:

1. **Add a new page**: Add a new entry to the array: `['pagename', 'Display Name']`
2. **Remove a page**: Delete the corresponding entry from the array
3. **Rename a menu item**: Change the second value in any pair
4. **Reorder menu items**: Reorder the entries in the array

The first value in each pair is:
- The filename for the markdown file (without .md extension)
- The URL hash that will be used to access the page (e.g., `#/pagename`)

The second value is the display text in the navigation menu.

### Adding or Editing Page Content

All page content lives in Markdown files in the `markdown/` directory:

1. **Create a new page**:
   - Create a file in the `markdown/` directory with the same name as the first value in your config.js entry
   - Example: For `['products', 'Our Products']`, create `markdown/products.md`
   - Add your content using Markdown syntax

2. **Edit an existing page**:
   - Open the corresponding Markdown file in the `markdown/` directory
   - Make your changes using Markdown syntax
   - Save the file

3. **System Messages**:
   - Error messages and system notifications are in `markdown/system.md`
   - You can customize these without touching any code

### Example: Adding a "Products" Page

1. **Update `js/config.js`**:
   ```javascript
   const pages = [
     ['home', 'Home'],
     ['about', 'About Us'],
     ['products', 'Our Products'],  // New page
     ['menu', 'Menu'],
     ['contact', 'Contact Us']
   ];
   ```

2. **Create `markdown/products.md`**:
   ```markdown
   # Our Amazing Products

   Discover our range of high-quality products.

   ## Featured Product

   Our newest release is perfect for your needs.

   ## Product Categories

   * Category One
   * Category Two
   * Category Three
   ```

3. That's it! The new page will appear in the navigation menu and is accessible via `#/products` in the URL.

## GitHub-Based Workflow

### One-Click Editing

The best part about this system is that you can edit everything directly on GitHub:

1. Navigate to your repository on GitHub
2. Browse to the file you want to edit:
   - `js/config.js` for menu changes
   - `markdown/pagename.md` for content changes
3. Click the pencil icon to edit
4. Make your changes
5. Commit directly to the main branch

When you commit changes to the main branch, your site will automatically redeploy if you're using Azure Static Web Apps or a similar service.

## Deployment

### Azure Static Web Apps

This project is designed to work seamlessly with Azure Static Web Apps:

1. Click the "Deploy to Azure" button at the top of this README
2. Follow the Azure portal instructions
3. Connect to your GitHub repository
4. Azure will automatically set up a GitHub Actions workflow for continuous deployment

Every time you push changes to your main branch, your site will automatically redeploy.

## Local Development

For local development:

1. Clone your repository:
   ```bash
   git clone https://github.com/yourusername/yourrepo.git
   cd yourrepo
   ```

2. Serve with any static web server:
   ```bash
   # Using Python
   python -m http.server
   
   # Or with Node.js
   npx serve
   ```

3. Open http://localhost:8000 (or the relevant port) in your browser

## Technical Architecture

- `app.js`: Core application logic - loads content based on configuration
- `config.js`: Menu and page configuration
- `markdown/`: Directory containing content files
- `system.md`: System messages and errors
- `index.html`: HTML shell for the application

## Contributing

1. Fork the repository on GitHub
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request on GitHub

## License

This project is licensed under the MIT License - see the LICENSE file for details.