---
description: Repository Information Overview
alwaysApply: true
---

# VoidCat RDC Website Information

## Summary
A simple, fast, and responsive company website for VoidCat RDC, designed for GitHub Pages deployment. The site showcases the company's AI products, solutions, and strategic advantages in the MCP-native agentic systems market.

## Structure
- **assets/**: Contains logo and favicon files
- **company/**: Company overview pages
- **contact/**: Contact information pages
- **investors/**: Investor-related information
- **legal/**: Terms of service and privacy policy
- **products/**: Product showcase pages (Grant Automation, Reasoning Core, Forbidden Library)
- **projects/**: Project information pages
- **research/**: Research information pages
- **roadmap/**: Company roadmap information
- **solutions/**: Solution pages for different customer segments (developers, enterprise, startups)

## Language & Runtime
**Language**: HTML, CSS
**Type**: Static website
**Deployment**: GitHub Pages

## Main Files
**HTML Structure**:
- `index.html`: Main landing page with company overview, products, and strategic advantages
- `404.html`: Custom error page
- Section index files: `products/index.html`, `solutions/index.html`, etc.
- Product pages: `products/grant-automation.html`, `products/reasoning-core.html`, etc.

**Styling**:
- `styles.css`: Global CSS styling with CSS variables for theming
- Design approach: Responsive layout with mobile-first design principles
- Color scheme: Dark theme with brand colors (blue, teal accents)

## Assets & Resources
**Images**:
- `assets/logo.png`: Company logo in PNG format
- `assets/logo.svg`: Vector version of company logo
- `assets/favicon.svg`: Site favicon

**Special Files**:
- `.nojekyll`: Disables Jekyll processing for GitHub Pages
- `README.md`: Repository documentation with setup and customization instructions

## Deployment
**GitHub Pages Configuration**:
- Branch: main
- Publishing directory: / (root)
- Custom domain: Can be configured via CNAME file

## Local Development
**Preview Method**:
```bash
# Open index.html in browser or use any static server
# No build step required
```

## Customization
**Branding**:
- Replace logos in `/assets` directory
- Edit color variables in `styles.css` (--bg, --panel, --text, --brand, --accent)
- Update copy in HTML files

**Structure**:
- Modular HTML files organized by section
- Consistent header/footer across all pages
- Responsive grid layout for cards and content sections