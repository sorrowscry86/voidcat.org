# VoidCat RDC — Quick Reference Card
**Systems:** Living Documentation + Publishing Pipeline

---

## 📋 PROJECT_STATUS.md — Quick Access

**Location:** `PROJECT_STATUS.md` (root)

**Update Schedule:**
- **Weekly:** Metrics (MRR, users, technical health)
- **Monthly:** Product status, roadmap, financials
- **Quarterly:** Strategy, risks, market analysis

**Sections:**
1. Executive Summary
2. Current Metrics
3. Product Portfolio (Grant Automation, VRE, Forbidden Library)
4. Research & IP (DSN, Context OS)
5. Technical Infrastructure
6. 12-Month Roadmap
7. Fundraising & Finance
8. Strategic Priorities
9. Risk Management

**Use For:**
- Investor meetings
- Team alignment
- Strategic planning
- Progress tracking

---

## ✍️ Publishing a Blog Post

### Quick Start (2 Steps)

```bash
# 1. Create from template
cp blog/posts/_template.md blog/posts/my-article.md

# 2. Edit, commit, push
vim blog/posts/my-article.md
git add blog/posts/my-article.md
git commit -m "feat: publish article on X"
git push origin main

# Wait 2-3 minutes → Live at voidcat.org/blog/
```

### YAML Frontmatter (Required)

```yaml
---
title: "Your Article Title"
date: 2025-10-24
author: "Wykeve Freeman"
category: "Engineering"  # Options: Architecture, Security, Performance, Engineering, Research
tags: ["MCP", "Tutorial"]
excerpt: "1-2 sentence summary."
featured: false  # true for homepage display
status: "published"  # or "draft"
---
```

### Markdown Basics

```markdown
## Section Header

**Bold text** and *italic text*

`inline code`

```python
# Code block with syntax highlighting
def example():
    return "Use language identifier"
```

[Link text](https://example.com)

![Image alt text](/assets/image.png)

| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

---

## 🚀 Publishing Workflow

### Daily Publishing

```bash
vim blog/posts/article.md  # Write content
git add blog/posts/article.md
git commit -m "feat: add article on X"
git push origin main
# → Live in 2-3 minutes at voidcat.org/blog/
```

### Bulk Publishing

```bash
git add blog/posts/*.md
git commit -m "feat: publish Q4 articles (3 posts)"
git push origin main
# → All articles process automatically
```

### Editing Published

```bash
vim blog/posts/existing-article.md  # Make changes
git commit -am "fix: update metrics in article"
git push origin main
# → Updated article live in 2-3 minutes
```

---

## 📂 File Structure

```
voidcat.org/
├── PROJECT_STATUS.md           ← Living source of truth
├── PUBLISHING_GUIDE.md          ← Full documentation
├── IMPLEMENTATION_SUMMARY.md    ← What was built
├── SETUP_COMPLETE.md            ← Setup details
├── .github/
│   ├── workflows/
│   │   └── publish-blog.yml    ← Automation
│   └── scripts/
│       └── generate-blog-index.js
├── blog/
│   ├── index.html               ← Auto-generated
│   └── posts/
│       ├── _template.md         ← Use this
│       └── your-article.md
```

---

## ⚙️ Categories

| Category | Use For | Color |
|----------|---------|-------|
| **Architecture** | System design, MCP integration | Blue |
| **Security** | Auth, compliance, threats | Green |
| **Performance** | Optimization, benchmarks | Blue |
| **Engineering** | Dev practices, testing | Green |
| **Research** | Whitepapers, studies | Blue |

---

## 🔧 Troubleshooting

### Article Not Showing

**Check:**
1. `status: "published"` (not `draft`)
2. Date not in future
3. Filename ends `.md`
4. YAML syntax valid
5. GitHub Actions succeeded

**Debug:**
- View: https://github.com/sorrowscry86/voidcat.org/actions
- Check "Publish Blog Updates" workflow
- Review error logs

### Formatting Issues

**Common Fixes:**
- Code blocks: Use triple backticks + language
- Links: Use absolute paths (`/blog/` not `blog/`)
- YAML: Escape quotes in title if needed

---

## 📊 Metrics to Track

### PROJECT_STATUS.md (Weekly)

- MRR (Monthly Recurring Revenue)
- Paid users
- MAU (Monthly Active Users)
- Test coverage %
- FLAGS score
- Security audit status

### Blog Performance (Monthly)

- Articles published
- Page views (add analytics)
- Featured articles count
- Categories distribution

---

## 🎯 Content Calendar (Suggested)

**Weekly:**
- 2 blog posts (1 technical deep dive + 1 update/insight)

**Monthly:**
- 1 featured article (research, major announcement)
- Update PROJECT_STATUS.md

**Quarterly:**
- Strategic review and roadmap update
- Research publication

---

## 📞 Support

**Documentation:**
- **PUBLISHING_GUIDE.md** — Comprehensive publishing instructions
- **PROJECT_STATUS.md** — Current project reference
- **SETUP_COMPLETE.md** — Setup and troubleshooting

**Contact:**
- Email: sorrowscry86@voidcat.org
- GitHub: @sorrowscry86
- Issues: Create an issue on GitHub

---

## ✅ Pre-Publish Checklist

- [ ] YAML frontmatter complete
- [ ] `status: "published"` set
- [ ] Title clear and descriptive
- [ ] Excerpt summarizes value
- [ ] Category selected
- [ ] Tags included (3-7)
- [ ] Code examples tested
- [ ] No fabricated metrics
- [ ] Proofread for typos
- [ ] Links use absolute paths

---

## 🔐 Compliance

**NO SIMULATIONS LAW:**
- All metrics must be real measurements
- No fabricated data
- Estimates clearly labeled
- Full Git audit trail

**PROJECT_STATUS.md:**
- Weekly updates required
- Real data or labeled targets
- Version history in Git

**Blog Posts:**
- Production-ready code only
- Measured results only
- Clear attribution

---

## 🚦 Status Indicators

| Status | Meaning | Action |
|--------|---------|--------|
| ✅ | Complete | Production ready |
| 🚧 | In Progress | Active development |
| 🎯 | Planned | Roadmap item |
| ⏳ | Pending | Blocked/waiting |
| ❌ | Blocked | Requires intervention |

---

## 📦 Dependencies

**Install once:**
```bash
npm install
```

**Installs:**
- `gray-matter` — YAML parsing
- `marked` — Markdown → HTML

**Update quarterly:**
```bash
npm update
npm audit
```

---

## 🎨 Featured Article

**To feature on homepage:**

```yaml
---
featured: true
---
```

**Limits:**
- Max 6 featured articles
- Sorted by date (newest first)
- Only if at least 1 exists

---

**Print this card. Keep it handy. Reference as needed.**

---

*Last Updated: October 24, 2025*  
*VoidCat RDC — Built with precision.*
