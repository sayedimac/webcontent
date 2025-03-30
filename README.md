# MarkdownUp SPA

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Deploy to Azure Static Web Apps](https://github.com/actions/workflow-badge-action/workflows/static-web-apps-deploy/badge.svg)](https://github.com/your-repo/actions)

A lightweight Single Page Application (SPA) framework that renders content from Markdown files, with GitHub-based content management and Azure Static Web Apps deployment.

## Features

- Modern class-based JavaScript architecture
- 100% Content-driven approach using Markdown files
- Some **Defaults**, but completely customisable
- No external dependencies
- Responsive design
- Instructions for **Automated deployment to Azure Static Web Apps** with a **Free Azure account**

## GitHub Setup

1. Fork this repository:
   ```
   1. Go to the repository page on GitHub.

   2. Click the "Fork" button in the top-right corner of the page.

   3. Choose your GitHub account as the destination for the fork.

   4. Once the repository is forked, clone it to your local machine if you need to, but you can do EVERYTHING from Github which makes things even more simple:
      ```bash
      git clone https://github.com/yourusername/webcontent.git
      ```
   ```

2. Link the repository to Azure Static Web Apps in the Azure Portal.

3. The application will be automatically deployed when changes are pushed to the main branch.

## Content Management

### Adding or Editing Pages via GitHub

1. Navigate to the `markdown/` directory in your GitHub repository.

2. To create a new page:
   - Click "Add file" → "Create new file"
   - Name it `pagename.md`
   - Add your Markdown content
   - Commit directly to the main branch or create a pull request

3. To edit an existing page:
   - Open the Markdown file in the GitHub editor
   - Make your changes
   - Commit directly to the main branch or create a pull request

4. Once changes are committed to the main branch, GitHub Actions will automatically deploy the updated site to Azure Static Web Apps.

5. Access your new page via hash routing:
   ```
   https://your-static-web-app-url/#pagename
   ```

## GitHub Actions Workflow

This repository includes a GitHub Actions workflow that:

1. Triggers on push to the main branch
2. Builds the application
3. Deploys it to Azure Static Web Apps

The workflow file is located at `.github/workflows/azure-static-web-apps.yml`.

## Local Development

For local development after cloning from GitHub:

1. Serve with any static web server:
   ```
   # Using Python
   python -m http.server
   
   # Or with Node.js
   npx serve
   ```

2. Make changes and test locally before pushing to GitHub.

## Architecture

- `app.js`: Core application logic with class-based structure
- `markdown/`: Directory containing content in Markdown format
- `index.html`: Main HTML entry point
- `.github/workflows/`: Contains GitHub Actions workflow files

## Contributing

1. Fork the repository on GitHub
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request on GitHub

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built for GitHub-based content management
- Deployed with Azure Static Web Apps
- Built with vanilla JavaScript for simplicity and performance