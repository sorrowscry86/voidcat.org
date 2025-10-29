# VoidCat RDC Publishing Guide
**How to Publish Content to VoidCat.org**

---

## Overview

This guide explains how to publish blog posts, research articles, and updates to VoidCat.org using our automated publishing pipeline.

**Publishing is automated:** Write markdown → Commit to main → Site updates automatically.

---

## Publishing Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Content Creation                          │
│  Write markdown in blog/posts/ with YAML frontmatter        │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                  Git Commit & Push                           │
│  git add blog/posts/your-article.md                         │
│  git commit -m "feat: new article on X"                     │
│  git push origin main                                        │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│            GitHub Actions Workflow Trigger                   │
│  .github/workflows/publish-blog.yml detects changes         │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              Blog Index Generation                           │
│  Node.js script parses all markdown posts                   │
│  Generates blog/index.html + individual post pages          │
│  Sorts by date, categorizes, adds metadata                  │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              Auto-Commit & Deploy                            │
│  GitHub Actions commits updated HTML                         │
│  GitHub Pages deploys to voidcat.org/blog/                  │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                  Live on VoidCat.org                         │
│  Article visible at voidcat.org/blog/                       │
│  Individual page at voidcat.org/blog/posts/slug.html       │
└─────────────────────────────────────────────────────────────┘
```

---

## Quick Start: Publishing Your First Article

### Step 1: Create a Markdown File

```bash
# Navigate to posts directory
cd blog/posts/

# Create a new markdown file (use kebab-case for filename)
touch mcp-security-oauth-implementation.md
```

### Step 2: Add YAML Frontmatter

Every post **must** include YAML frontmatter at the top:

```markdown
---
title: "Implementing OAuth 2.1 for Model Context Protocol"
date: 2025-10-24
author: "Lord Wykeve Freeman"
category: "Security"
tags: ["MCP", "OAuth 2.1", "Security", "Authentication"]
excerpt: "A comprehensive guide to implementing OAuth 2.1 authentication for MCP servers, addressing vulnerabilities identified in June 2025 security research."
featured: true
status: "published"
---

# Your article content starts here...
```

### Step 3: Write Your Article

Use standard markdown syntax:

```markdown
## Introduction

Context and background...

### Key Concepts

- **OAuth 2.1:** Latest security standard
- **MCP:** Model Context Protocol

## Implementation

```python
# Code examples
def authenticate_mcp_server():
    return oauth_client.get_token()
```

## Results

Real metrics and outcomes.

## Conclusion

Key takeaways.
```

### Step 4: Publish (Commit & Push)

```bash
# Add your new post
git add blog/posts/mcp-security-oauth-implementation.md

# Commit with descriptive message
git commit -m "feat: add OAuth 2.1 MCP implementation guide"

# Push to main branch
git push origin main
```

### Step 5: Verify Publication

Wait 2-3 minutes for GitHub Actions to complete, then visit:

- **Blog Index:** https://voidcat.org/blog/
- **Your Article:** https://voidcat.org/blog/posts/mcp-security-oauth-implementation.html

---

## YAML Frontmatter Reference

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | String | Article title (shown in listings and page header) | `"OAuth 2.1 for MCP"` |
| `date` | Date | Publication date (YYYY-MM-DD) | `2025-10-24` |
| `author` | String | Author name | `"Lord Wykeve Freeman"` |
| `category` | String | Primary category (see options below) | `"Security"` |
| `excerpt` | String | 1-2 sentence summary for listings | `"A guide to..."` |
| `status` | String | Publication status: `draft` or `published` | `"published"` |

### Optional Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `tags` | Array | Topic tags (used for filtering/SEO) | `["MCP", "Security"]` |
| `featured` | Boolean | Show on homepage? | `true` or `false` |

### Category Options

Choose **one** category:

- `Architecture` — System design, MCP integration, infrastructure
- `Security` — Authentication, authorization, threat modeling, compliance
- `Performance` — Optimization, benchmarking, latency, scaling
- `Engineering` — Development practices, testing, CI/CD, tooling
- `Research` — Whitepapers, studies, experimental findings

---

## Markdown Formatting Guide

### Headers

```markdown
# H1 — Article Title (use once at top)
## H2 — Major Sections
### H3 — Subsections
#### H4 — Detail Points (rarely needed)
```

### Text Formatting

```markdown
**Bold text** for emphasis
*Italic text* for subtle emphasis
`inline code` for technical terms
[Link text](https://example.com) for external references
```

### Code Blocks

````markdown
```python
# Python code with syntax highlighting
def example():
    return "Use language identifier after ```"
```

```javascript
// JavaScript example
const example = () => "Supported languages: python, js, bash, etc.";
```
````

### Lists

```markdown
**Unordered:**
- Item 1
- Item 2
  - Nested item

**Ordered:**
1. First step
2. Second step
3. Third step
```

### Tables

```markdown
| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Latency | 450ms | 180ms | 60% reduction |
| Accuracy | 72% | 89% | +17 percentage points |
```

### Blockquotes

```markdown
> Important callout or quote.
> Use for emphasis or external quotes.
```

### Diagrams (ASCII Art)

```markdown
```
┌─────────────────┐
│   Component A   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Component B   │
└─────────────────┘
```
```

---

## Drafts vs. Published

### Draft Status

Articles with `status: "draft"` are **NOT** published:

```yaml
---
status: "draft"
---
```

- ✅ **Saved** in repository
- ❌ **Not visible** on website
- ✅ **Can be reviewed** by team

**Use drafts for:**
- Work-in-progress articles
- Scheduled content (change to `published` when ready)
- Internal documentation not ready for public

### Published Status

Articles with `status: "published"` are **live**:

```yaml
---
status: "published"
---
```

- ✅ **Visible** on voidcat.org/blog/
- ✅ **Indexed** by search engines
- ✅ **Included** in RSS/sitemap (future enhancement)

---

## Featured Articles

Set `featured: true` to display on homepage:

```yaml
---
featured: true
---
```

**Limits:**
- Up to **6 featured articles** shown on homepage
- Sorted by date (newest first)
- Featured section only appears if at least 1 featured article exists

**When to feature:**
- Major research publications
- Product launch announcements
- High-impact technical deep dives
- Industry commentary or thought leadership

---

## Best Practices

### Writing Guidelines

1. **Clear Title:** Descriptive, actionable, specific
   - ✅ "Implementing OAuth 2.1 for MCP Servers"
   - ❌ "Security Stuff"

2. **Strong Excerpt:** Summarize value in 1-2 sentences
   - Include what readers will learn
   - Mention key results or insights

3. **Technical Depth:** VoidCat audience is technical
   - Include code examples
   - Show real metrics
   - Link to references

4. **Real Results Only:** NO SIMULATIONS LAW applies
   - Measured benchmarks only
   - No fabricated metrics
   - Label estimates clearly

5. **Structure:**
   - Introduction (context)
   - Background (prerequisites)
   - Implementation (how-to)
   - Results (measured outcomes)
   - Conclusion (takeaways)

### SEO Optimization

- Use descriptive filenames: `oauth-mcp-implementation.md` ✅ not `article1.md` ❌
- Include relevant tags (3-7 tags per article)
- Write descriptive excerpts (under 160 characters ideal)
- Use headers (H2, H3) for structure
- Link to related articles/products

### Code Examples

- Always include language identifier for syntax highlighting
- Use production-ready code (not pseudocode)
- Add comments explaining complex sections
- Test code before publishing

---

## Publishing Workflow

### Daily Publishing (Typical)

```bash
# 1. Create article
vim blog/posts/new-article.md

# 2. Set status to published
# (in YAML frontmatter: status: "published")

# 3. Commit and push
git add blog/posts/new-article.md
git commit -m "feat: add article on X"
git push origin main

# 4. Wait 2-3 minutes for GitHub Actions

# 5. Verify at https://voidcat.org/blog/
```

### Bulk Publishing (Multiple Articles)

```bash
# Add all new articles
git add blog/posts/*.md

# Commit with summary
git commit -m "feat: publish Q4 research articles (3 posts)"

# Push once
git push origin main

# GitHub Actions processes all changes automatically
```

### Editing Published Articles

```bash
# 1. Edit the markdown file
vim blog/posts/existing-article.md

# 2. Commit with clear message
git commit -am "fix: correct OAuth flow diagram in MCP article"

# 3. Push to republish
git push origin main

# Updated article appears within 2-3 minutes
```

---

## Advanced Features

### Custom Styling (CSS Classes)

Add custom styling to specific sections:

```markdown
<div style="background: var(--panel); padding: 20px; border-left: 3px solid var(--brand);">

**Callout:** This is a highlighted section.

</div>
```

**Available CSS Variables:**
- `var(--brand)` — Primary brand color
- `var(--accent)` — Secondary accent color
- `var(--panel)` — Panel background
- `var(--muted)` — Muted text color

### Embedding Media

**Images:**
```markdown
![Alt text](/assets/diagrams/oauth-flow.png)
```

**Videos (YouTube):**
```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
```

### Cross-Linking

Link to other pages on the site:

```markdown
Learn more about [our products](/products/).

See our [OAuth 2.1 implementation](/blog/posts/oauth-implementation.html).
```

---

## Troubleshooting

### Article Not Appearing

**Check:**
1. Status is `"published"` (not `"draft"`)
2. Date is not in the future
3. Filename ends in `.md` (not `.txt` or other)
4. YAML frontmatter is valid (no syntax errors)
5. GitHub Actions workflow completed successfully

**Debug:**
```bash
# View GitHub Actions logs
# Go to: https://github.com/sorrowscry86/voidcat.org/actions

# Check workflow status
# Look for "Publish Blog Updates" workflow
```

### Formatting Issues

**Common Problems:**

1. **Code blocks not rendering:**
   - Ensure triple backticks with language identifier
   - ````markdown → should be ``` only

2. **YAML parse errors:**
   - Check for unescaped quotes in title/excerpt
   - Use `"Title with: colon"` if title contains special chars

3. **Broken links:**
   - Use absolute paths: `/blog/` not `blog/`
   - Check for typos in URLs

### GitHub Actions Failing

**View logs:**
1. Go to: https://github.com/sorrowscry86/voidcat.org/actions
2. Click latest "Publish Blog Updates" workflow
3. Expand "Generate blog index" step
4. Review error messages

**Common Fixes:**
- Install missing npm packages: `npm install gray-matter marked`
- Verify Node.js version in workflow (20+)
- Check file permissions

---

## Content Calendar (Recommended)

### Weekly Cadence

- **Monday:** Research roundup or industry analysis
- **Wednesday:** Technical deep dive (architecture, security, performance)
- **Friday:** Engineering practices or product updates

### Monthly Goals

- **4-8 blog posts** per month
- **1 featured article** (research or major announcement)
- **2 technical deep dives** (code examples, benchmarks)
- **1 thought leadership** piece (market, strategy, vision)

### Quarterly Milestones

- **Q1:** Security leadership (OAuth 2.1, MCP hardening)
- **Q2:** Product launches (VRE 1.0, plugin ecosystem)
- **Q3:** Research publications (Context OS, Tool-RAG)
- **Q4:** Year in review, roadmap preview

---

## Template Usage

Use `blog/posts/_template.md` as starting point:

```bash
# Copy template
cp blog/posts/_template.md blog/posts/your-article.md

# Edit with your content
vim blog/posts/your-article.md

# Publish
git add blog/posts/your-article.md
git commit -m "feat: add article on Y"
git push origin main
```

---

## Contact & Support

**Questions about publishing?**
- **Email:** sorrowscry86@voidcat.org
- **GitHub Issues:** [Create an issue](https://github.com/sorrowscry86/voidcat.org/issues)
- **Documentation:** This guide + inline code comments

**Content Review:**
- **Beatrice (Strategic Oversight):** Final approval for major announcements
- **Lord Wykeve Freeman:** Technical content, research, engineering

---

## Checklist: Pre-Publish Review

Before pushing to main, verify:

- [ ] YAML frontmatter complete and valid
- [ ] `status: "published"` set (not `draft`)
- [ ] Title is clear and descriptive
- [ ] Excerpt summarizes article value
- [ ] Category selected from approved list
- [ ] Tags included (3-7 relevant tags)
- [ ] Code examples tested and functional
- [ ] No fabricated metrics (NO SIMULATIONS LAW)
- [ ] Internal links use absolute paths (`/products/`)
- [ ] External links open in new tab (if desired)
- [ ] Proofread for typos and clarity
- [ ] Featured status set appropriately

---

**This publishing system is production-ready and actively used. All generated HTML is real, validated, and deployed to GitHub Pages automatically.**

**Questions? sorrowscry86@voidcat.org**
