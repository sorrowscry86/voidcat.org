#!/usr/bin/env node

/**
 * VoidCat RDC Blog Index Generator
 * 
 * Automatically generates blog/index.html from markdown posts in blog/posts/
 * Parses YAML frontmatter, sorts by date, categorizes, and renders HTML.
 * 
 * Usage: node .github/scripts/generate-blog-index.js
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

// Configuration
const POSTS_DIR = path.join(__dirname, '../../blog/posts');
const OUTPUT_FILE = path.join(__dirname, '../../blog/index.html');
const SITE_URL = 'https://voidcat.org';

// Categories
const CATEGORIES = {
  'Architecture': { color: 'var(--brand)', icon: '🏗️' },
  'Security': { color: 'var(--accent)', icon: '🔐' },
  'Performance': { color: 'var(--brand)', icon: '⚡' },
  'Engineering': { color: 'var(--accent)', icon: '⚙️' },
  'Research': { color: 'var(--brand)', icon: '🔬' }
};

/**
 * Read all markdown posts from blog/posts/
 */
function readPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.log('No posts directory found. Creating...');
    fs.mkdirSync(POSTS_DIR, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(POSTS_DIR).filter(f => 
    f.endsWith('.md') && !f.startsWith('_')
  );

  return files.map(file => {
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: markdown } = matter(content);

    // Only include published posts
    if (data.status !== 'published') {
      return null;
    }

    return {
      slug: file.replace('.md', ''),
      ...data,
      markdown,
      html: marked(markdown)
    };
  }).filter(Boolean);
}

/**
 * Sort posts by date (newest first)
 */
function sortPosts(posts) {
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Format date for display
 */
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

/**
 * Generate post card HTML
 */
function generatePostCard(post) {
  const category = CATEGORIES[post.category] || CATEGORIES['Engineering'];
  
  return `
          <article class="blog-card">
            <div class="blog-card-meta">${formatDate(post.date)} • ${post.category}</div>
            <h3><a href="/blog/posts/${post.slug}.html" style="color: inherit;">${post.title}</a></h3>
            <p>${post.excerpt}</p>
            ${post.tags ? `<div class="blog-card-tags">${post.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}</div>` : ''}
            <a href="/blog/posts/${post.slug}.html">Read full article →</a>
          </article>`;
}

/**
 * Generate category section HTML
 */
function generateCategorySection(category, posts) {
  const { color, icon } = CATEGORIES[category] || { color: 'var(--brand)', icon: '📄' };
  const count = posts.filter(p => p.category === category).length;

  return `
          <div style="background: var(--panel); padding: 20px; border-radius: 8px; border-left: 3px solid ${color};">
            <h3 style="margin-top: 0;">${icon} ${category}</h3>
            <p style="margin: 0; color: var(--muted); font-size: 14px;">${count} article${count !== 1 ? 's' : ''}</p>
            <a href="/blog/?category=${category.toLowerCase()}" style="font-size: 14px;">View all →</a>
          </div>`;
}

/**
 * Generate complete blog index HTML
 */
function generateBlogIndex(posts) {
  const featuredPosts = posts.filter(p => p.featured).slice(0, 6);
  const latestPosts = posts.slice(0, 12);

  // Group posts by year-month for archive
  const archive = {};
  posts.forEach(post => {
    const date = new Date(post.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const label = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    
    if (!archive[key]) {
      archive[key] = { label, count: 0 };
    }
    archive[key].count++;
  });

  const archiveHTML = Object.entries(archive)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 12)
    .map(([key, { label, count }]) => 
      `<li style="padding: 8px 0; border-bottom: 1px solid #1b2230;"><a href="/blog/?archive=${key}">${label} (${count} post${count !== 1 ? 's' : ''})</a></li>`
    ).join('\n            ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Blog — VoidCat RDC</title>
  <meta name="description" content="Technical insights, research updates, and engineering breakthroughs from VoidCat RDC." />
  <link rel="icon" type="image/png" href="/assets/logo.png" />
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a class="brand" href="/">
        <img src="/assets/logo.png" alt="VoidCat RDC logo" />
        <span>VoidCat RDC</span>
      </a>
      <nav class="nav" aria-label="Primary">
        <a href="/products/">Products</a>
        <a href="/solutions/">Solutions</a>
        <a href="/research/">Research</a>
        <a href="/roadmap/">Roadmap</a>
        <a href="/company/">Company</a>
        <a href="/investors/">Investors</a>
        <a href="/projects/">Projects</a>
        <a href="/contact/">Contact</a>
      </nav>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
    </div>
  </header>

  <main>
    <section class="section">
      <div class="container">
        <h1>Blog & Technical Updates</h1>
        <p style="color: var(--muted); font-size: 18px;">Deep dives into agentic AI, MCP governance, edge computing, and our research foundations.</p>
      </div>
    </section>

    ${featuredPosts.length > 0 ? `
    <section class="section">
      <div class="container">
        <h2>Featured Posts</h2>
        <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
${featuredPosts.map(generatePostCard).join('\n')}
        </div>
      </div>
    </section>
    ` : ''}

    <section class="section">
      <div class="container">
        <h2>Latest Articles</h2>
        <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
${latestPosts.map(generatePostCard).join('\n')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>By Category</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
${Object.keys(CATEGORIES).map(cat => generateCategorySection(cat, posts)).join('\n')}
        </div>
      </div>
    </section>

    ${Object.keys(archive).length > 0 ? `
    <section class="section">
      <div class="container">
        <h2>Archive</h2>
        <p style="color: var(--muted);">Browse all posts by month.</p>
        <div style="background: var(--panel); padding: 24px; border-radius: 8px;">
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${archiveHTML}
          </ul>
        </div>
      </div>
    </section>
    ` : ''}

    <section id="contact" class="section">
      <div class="container">
        <h2>Questions?</h2>
        <p>Join the discussion on <a href="https://github.com/sorrowscry86">GitHub</a> or reach out at <a href="mailto:sorrowscry86@voidcat.org">sorrowscry86@voidcat.org</a></p>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>© <span id="year"></span> VoidCat RDC, LLC. All rights reserved. Built on MCP, secured by OAuth 2.1, deployed at the edge.</p>
      <p style="margin-top: 8px; font-size: 14px;"><a href="/legal/terms.html">Terms of Use</a> • <a href="/legal/privacy.html">Privacy Policy</a></p>
    </div>
  </footer>

  <script>
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.querySelector('.nav');
    
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
      });

      nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.site-header')) {
          nav.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Category and archive filtering
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const archive = urlParams.get('archive');

    if (category || archive) {
      // Filter posts based on URL params
      const posts = document.querySelectorAll('.blog-card');
      posts.forEach(post => {
        const postCategory = post.querySelector('.blog-card-meta').textContent.split('•')[1].trim().toLowerCase();
        const postDate = post.querySelector('.blog-card-meta').textContent.split('•')[0].trim();
        
        if (category && postCategory !== category) {
          post.parentElement.style.display = 'none';
        }
        if (archive && !postDate.includes(archive)) {
          post.parentElement.style.display = 'none';
        }
      });
    }
  </script>
</body>
</html>
`;
}

/**
 * Generate individual post page HTML
 */
function generatePostPage(post) {
  const category = CATEGORIES[post.category] || CATEGORIES['Engineering'];
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${post.title} — VoidCat RDC</title>
  <meta name="description" content="${post.excerpt}" />
  <meta name="keywords" content="${post.tags ? post.tags.join(', ') : ''}" />
  <meta property="og:title" content="${post.title}" />
  <meta property="og:description" content="${post.excerpt}" />
  <meta property="og:type" content="article" />
  <meta property="article:published_time" content="${post.date}" />
  <meta property="article:author" content="${post.author}" />
  <link rel="icon" type="image/png" href="/assets/logo.png" />
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a class="brand" href="/">
        <img src="/assets/logo.png" alt="VoidCat RDC logo" />
        <span>VoidCat RDC</span>
      </a>
      <nav class="nav" aria-label="Primary">
        <a href="/products/">Products</a>
        <a href="/solutions/">Solutions</a>
        <a href="/research/">Research</a>
        <a href="/roadmap/">Roadmap</a>
        <a href="/company/">Company</a>
        <a href="/investors/">Investors</a>
        <a href="/projects/">Projects</a>
        <a href="/contact/">Contact</a>
      </nav>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
    </div>
  </header>

  <main>
    <article class="section">
      <div class="container" style="max-width: 800px;">
        <div style="margin-bottom: 16px;">
          <a href="/blog/" style="color: var(--muted); text-decoration: none;">← Back to Blog</a>
        </div>
        
        <header style="margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid var(--panel);">
          <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 16px; color: var(--muted); font-size: 14px;">
            <span style="background: ${category.color}; color: white; padding: 4px 12px; border-radius: 4px; font-weight: 600;">${post.category}</span>
            <time datetime="${post.date}">${formatDate(post.date)}</time>
            <span>•</span>
            <span>${post.author}</span>
          </div>
          
          <h1 style="margin: 0; font-size: 2.5rem; line-height: 1.2;">${post.title}</h1>
          
          ${post.tags ? `
          <div style="margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
            ${post.tags.map(tag => `<span style="background: var(--panel); padding: 4px 12px; border-radius: 4px; font-size: 13px; color: var(--muted);">${tag}</span>`).join('')}
          </div>
          ` : ''}
        </header>

        <div class="prose">
          ${post.html}
        </div>

        <footer style="margin-top: 64px; padding-top: 32px; border-top: 2px solid var(--panel);">
          <p style="color: var(--muted); margin-bottom: 24px;">
            <strong>About the Author:</strong> ${post.author} is the founder of VoidCat RDC, building MCP-native agentic AI systems. 
            Connect on <a href="https://github.com/sorrowscry86">GitHub</a> or via <a href="mailto:sorrowscry86@voidcat.org">email</a>.
          </p>
          
          <div style="text-align: center; margin-top: 32px;">
            <a href="/blog/" style="display: inline-block; padding: 12px 24px; background: var(--brand); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">← Back to All Articles</a>
          </div>
        </footer>
      </div>
    </article>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>© <span id="year"></span> VoidCat RDC, LLC. All rights reserved. Built on MCP, secured by OAuth 2.1, deployed at the edge.</p>
      <p style="margin-top: 8px; font-size: 14px;"><a href="/legal/terms.html">Terms of Use</a> • <a href="/legal/privacy.html">Privacy Policy</a></p>
    </div>
  </footer>

  <script>
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.querySelector('.nav');
    
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
      });

      nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          nav.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.site-header')) {
          nav.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  </script>
</body>
</html>
`;
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 VoidCat RDC Blog Generator');
  console.log('================================\n');

  // Read posts
  const posts = readPosts();
  console.log(`📄 Found ${posts.length} published posts\n`);

  if (posts.length === 0) {
    console.log('⚠️  No published posts found. Generating empty blog index.');
  }

  // Sort posts
  const sortedPosts = sortPosts(posts);

  // Generate blog index
  const indexHTML = generateBlogIndex(sortedPosts);
  fs.writeFileSync(OUTPUT_FILE, indexHTML);
  console.log(`✅ Generated: ${OUTPUT_FILE}`);

  // Generate individual post pages
  sortedPosts.forEach(post => {
    const postHTML = generatePostPage(post);
    const postPath = path.join(__dirname, '../../blog/posts', `${post.slug}.html`);
    fs.writeFileSync(postPath, postHTML);
    console.log(`✅ Generated: blog/posts/${post.slug}.html`);
  });

  console.log('\n================================');
  console.log('✨ Blog generation complete!');
  console.log(`📊 Total: ${sortedPosts.length} posts published`);
  console.log(`🌐 Live at: ${SITE_URL}/blog/`);
}

// Run
main();
