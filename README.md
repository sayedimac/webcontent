# MarkdownUp - A Simple Content Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Deploy to Azure Static Web Apps](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.StaticApp)

A lightweight Single Page Application (SPA) that renders content from Markdown files using GitHub-based content management.

## Key Features

- **Content-First Approach**: All content lives in Markdown files
- **Simple Configuration**: Menu structure in a single config file
- **No Coding Required**: Edit content without touching code
- **Modern Architecture**: Clean separation of content and presentation
- **Mobile-Friendly**: Responsive design works on all devices
- **Fast Deployment**: Ready for Azure Static Web Apps

## How It Works

1. **Edit your content** in Markdown files (`.md`)
2. **Configure your menu** in `config.js` 
3. **Deploy your site** to Azure Static Web Apps

## Quick Start Guide

### 1. Customize Menu Structure

Edit `js/config.js`:

```javascript
const pages = [
  ['home', 'Home'],         // [file-name, menu-text]
  ['about', 'About Us'],    // about.md → "About Us" in menu
  ['products', 'Products'], // Add new pages here
  ['contact', 'Contact']
];
```

### 2. Edit Content Files

Create/edit files in the `markdown/` folder:
- `home.md` → Home page content
- `about.md` → About page content
- Each file corresponds to a menu item

### 3. Deploy to Azure

1. Click the "Deploy to Azure" button at the top of this README
2. Connect to your GitHub repository
3. Azure will automatically deploy your site

## GitHub Workflow

Edit content directly on GitHub:
1. Navigate to `markdown/pagename.md`
2. Click the pencil icon to edit
3. Commit your changes
4. Site automatically deploys

## Local Development

```bash
# Serve locally with Python
python -m http.server

# Or with Node.js
npx serve
```

## Project Structure

- `js/app.js`: Core application logic
- `js/config.js`: Menu configuration
- `markdown/*.md`: Content files
- `css/styles.css`: Custom styling
- `index.html`: HTML shell

## Customization

### Styling

- Edit `css/styles.css` for custom styles
- Uses Bootstrap 5 for layout and components

### Background

- Replace `images/bg.jpg` with your own image
- Or modify CSS to use a different image

## License

This project is licensed under the MIT License.