---
title: Content Publishing Workflow - Blogs & Podcasts
type: workflow
permalink: publishing/content-publishing-workflow-blogs-podcasts
tags:
- content
- publishing
- blogs
- podcasts
---

# Content Publishing Workflow
**Date:** October 31, 2025  
**Purpose:** Streamlined guide for pushing blogs and podcast episodes

---

## System Architecture

### Blog System
- **Location:** `blog/posts/` directory
- **Format:** Markdown with YAML frontmatter
- **Processing:** Automated via `npm run generate`
- **Output:** HTML files in `blog/` and `blog/posts/`
- **Template:** `blog/posts/_template.md`

### Podcast System  
- **Location:** `assets/podcasts/manifest.json`
- **Format:** JSON array of episode objects
- **Audio Files:** Store in `assets/podcasts/` directory
- **UI:** Reads manifest.json and renders player + playlist
- **Current State:** Empty (0 episodes)

---

## BLOG WORKFLOW - Add & Publish

### Step 1: Create Blog Post Markdown
Create a new file in `blog/posts/` named `SLUG.md`:

```markdown
---
title: "Your Post Title Here"
date: "2025-10-31"
author: "Wykeve Freeman"
category: "Engineering"  # Architecture, Security, Performance, Engineering, Research
status: "published"       # CRITICAL: Must be "published" to appear
excerpt: "Short summary for listing"
featured: false          # Set true for featured section
tags: ["mcp", "agentic-ai", "edge-computing"]
---

# Your Post Title

Your markdown content here...

## Subheading

More content...
```

### Step 2: Run Blog Generator
```powershell
cd C:\Users\Wykeve\OneDrive\Documents\GitHub\voidcat.org
npm run generate
```

**Result:** 
- ✅ `blog/index.html` regenerated with updated listings
- ✅ `blog/posts/SLUG.html` created from markdown
- ✅ Post appears on blog listing page

### Step 3: Commit & Push
```powershell
git add blog/
git commit -m "docs: Add blog post - Your Post Title"
git push origin main
```

### Important Notes
- **Only "published" posts appear** - check `status: "published"` in frontmatter
- **Date format:** YYYY-MM-DD (e.g., "2025-10-31")
- **Category must be exact:** Architecture, Security, Performance, Engineering, or Research
- **Run generator after every new post** before committing

---

## PODCAST WORKFLOW - Add & Publish

### Step 1: Prepare Audio File
- **Format:** MP3 recommended
- **Location:** `assets/podcasts/` directory
- **Naming:** `episode-SLUG.mp3` (e.g., `episode-ep001-mcp-fundamentals.mp3`)
- **File size:** Reasonable for web delivery (<50MB typical)

### Step 2: Add Entry to Manifest
Edit `assets/podcasts/manifest.json`:

```json
{
  "episodes": [
    {
      "title": "Episode 1: MCP Fundamentals",
      "description": "Deep dive into Model Context Protocol architecture and security patterns.",
      "date": "2025-10-31",
      "src": "/assets/podcasts/episode-001-mcp-fundamentals.mp3",
      "duration": "24:15",
      "author": "Wykeve Freeman",
      "tags": ["mcp", "protocol", "architecture"]
    }
  ]
}
```

### Step 3: Commit & Push
```powershell
git add assets/podcasts/
git commit -m "content: Add podcast episode - Episode 1: MCP Fundamentals"
git push origin main
```

**Result:**
- ✅ Episode appears in podcast player
- ✅ Playlist updated automatically
- ✅ Audio playable on /podcasts/ page

### Manifest Schema
```javascript
{
  "episodes": [
    {
      "title": "string - Episode title",
      "description": "string - Episode description", 
      "date": "YYYY-MM-DD - Publication date",
      "src": "string - URL path to MP3 file",
      "duration": "string - MM:SS format",
      "author": "string - Creator name",
      "tags": ["array", "of", "topics"]
    }
  ]
}
```

---

## Quick Command Reference

### Generate blog from markdown:
```powershell
npm run generate
```

### Add new blog post:
1. Create `blog/posts/my-post.md` with frontmatter
2. Set `status: "published"`
3. Run `npm run generate`
4. Commit all changes

### Add new podcast episode:
1. Upload MP3 to `assets/podcasts/episode-SLUG.mp3`
2. Add entry to `assets/podcasts/manifest.json`
3. Commit changes

---

## Deployment

### When you push to main:
1. GitHub Pages automatically deploys
2. Changes live within 2-3 minutes
3. Blog pages and podcasts update automatically

### Verify deployment:
- Blog: `https://voidcat.org/blog/`
- Podcasts: `https://voidcat.org/podcasts/`