---
title: Visual Architecture & Layout Reference
type: note
permalink: voidcat-website-enhancement/visual-architecture-layout-reference
---

# VoidCat Website Enhancements - Visual Architecture

## Page Layout Before & After

### HOMEPAGE STRUCTURE

**BEFORE:**
```
┌─ Header (Small Logo 40x40) ────────────────────────────────┐
├─ Hero (Text-only) ──────────────────────────────────────────┤
│  • H1: "Built on the AI Industry Standard"
│  • Paragraph
│  • CTA Button
├─ Narrative Section ─────────────────────────────────────────┤
├─ Products Section ───────────────────────────────────────────┤
│  • 3-column grid
├─ Advantages Section ──────────────────────────────────────────┤
│  • 3-column grid
├─ Market Context Section ──────────────────────────────────────┤
└─ Footer ─────────────────────────────────────────────────────┘
```

**AFTER:**
```
┌─ Header (Small Logo + Hamburger on mobile) ───────────────────┐
├─ Hero (TWO-COLUMN: Large Logo | Text) ────────────────────────┤
│  • Left: Large cosmic cat logo (280px max)
│  • Right: Headline, value prop, CTA
├─ Narrative Section ───────────────────────────────────────────┤
├─ Products Section ────────────────────────────────────────────┤
├─ Advantages Section ──────────────────────────────────────────┤
├─ Market Context Section ──────────────────────────────────────┤
├─ Engineering Principles ──────────────────────────────────────┤
├─ BLOG SECTION (NEW) ──────────────────────────────────────────┤
│  • "Latest from VoidCat" heading
│  • 3 featured blog cards with dates
│  • "View All Posts →" link to /blog/
├─ RESEARCH SECTION (NEW) ──────────────────────────────────────┤
│  • "Research & Publications" heading
│  • 3 research highlights with metadata
│  • "Explore Full Research →" link to /research/
├─ Contact Section ─────────────────────────────────────────────┤
└─ Footer ─────────────────────────────────────────────────────┘
```

## Hero Section Details

### Desktop Hero Layout (1024px+)
```
┌──────────────────────────────────────────────────────────┐
│  [Logo Area]              [Text Area]                    │
│  ┌────────────────┐      ┌──────────────────────────┐  │
│  │                │      │ Built on the AI Industry │  │
│  │   280x280      │      │ Standard.                │  │
│  │   Cosmic       │      │ Secured Before the       │  │
│  │   VoidCat      │  gap │ Competition.             │  │
│  │   Logo         │      │                          │  │
│  │   (SVG)        │      │ MCP-native agentic      │  │
│  │                │      │ systems designed...      │  │
│  │                │      │                          │  │
│  │                │      │ [See Why We're Different]│  │
│  └────────────────┘      └──────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

### Mobile Hero Layout (<480px)
```
┌─────────────────────┐
│  ┌───────────────┐  │
│  │               │  │
│  │    160x160    │  │
│  │    VoidCat    │  │
│  │    Logo       │  │
│  │               │  │
│  └───────────────┘  │
│                     │
│ Built on the AI     │
│ Industry Standard.  │
│ Secured Before...   │
│                     │
│ MCP-native agentic  │
│ systems designed... │
│                     │
│ [See Why Different] │
└─────────────────────┘
```

## Navigation: Mobile vs Desktop

### Desktop Navigation (≥480px)
```
┌─────────────────────────────────────────────────────────┐
│ [Logo] Products Solutions Research Roadmap ... Contact  │
└─────────────────────────────────────────────────────────┘
```

### Mobile Navigation (< 480px)
```
┌──────────────────────────────────────┐
│ [Logo]                          [☰]  │  ← Header
├──────────────────────────────────────┤
│ Products                             │  ← Menu opens
│ Solutions                            │     below header
│ Research                             │     on toggle
│ Roadmap                              │
│ Company                              │
│ Investors                            │
│ Projects                             │
│ Contact                              │
├──────────────────────────────────────┤
│                                      │
│  [Rest of page content]              │
│                                      │
└──────────────────────────────────────┘
```

## New Sections: Blog

### Blog Card (Desktop)
```
┌──────────────────────────────────────┐
│ October 18, 2025                     │
│                                      │
│ MCP Security Baselines: OAuth 2.1 &  │
│ RFC 8707                             │
│                                      │
│ How we implemented industry-leading  │
│ security standards for Model Context │
│ Protocol integration, addressing     │
│ vulnerabilities identified...        │
│                                      │
│ Read more →                          │
└──────────────────────────────────────┘
```

### Blog Section Homepage
```
Latest from VoidCat
Technical insights, research updates...

┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ Blog Card 1 │  │ Blog Card 2 │  │ Blog Card 3 │
├─────────────┤  ├─────────────┤  ├─────────────┤
│Oct 18       │  │Oct 12       │  │Oct 5        │
│MCP Security │  │Context OS   │  │Edge         │
│Baselines    │  │Tool Gov...  │  │Reasoning    │
│             │  │             │  │             │
│Description  │  │Description  │  │Description  │
│             │  │             │  │             │
│Read more→   │  │Read more→   │  │Read more→   │
└─────────────┘  └─────────────┘  └─────────────┘

[View All Posts →] (button/link to /blog/)
```

## New Sections: Research

### Research Card (Desktop)
```
┌──────────────────────────────────────┐
│ 📄 WHITEPAPER                        │
│                                      │
│ Context OS: A Thesis on Intelligent  │
│ Tool Governance                      │
│                                      │
│ Our foundational research posits     │
│ that agent performance stems from    │
│ intelligent context and tool         │
│ governance...                        │
│                                      │
│ 40 pages • October 2025              │
│                                      │
│ Download PDF →                       │
└──────────────────────────────────────┘
```

### Research Section Homepage
```
Research & Publications
Foundational research on agentic AI...

┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│Research 1   │  │Research 2   │  │Research 3   │
├─────────────┤  ├─────────────┤  ├─────────────┤
│📄 WHITEPAPER│  │📊 PAPER     │  │🔐 SECURITY  │
│Context OS   │  │Tool-RAG     │  │MCP Security │
│...          │  │Hybrids...   │  │Vulns...     │
│             │  │             │  │             │
│40p • Oct    │  │28p • Sep    │  │22p • Aug    │
│             │  │             │  │             │
│Download→    │  │Download→    │  │Download→    │
└─────────────┘  └─────────────┘  └─────────────┘

[Explore Full Research →] (button/link to /research/)
```

## Responsive Breakpoints

### Tablet (768px and below)
- Hero: Stacks to single column
- Grids: 2 columns
- Logo: 200px max
- Font: 32px H1, 14px nav

### Mobile (480px and below)
- Logo area: 160px max
- Hero: Full single column, centered
- Nav: Hamburger menu
- Font: 24px H1, 14px body
- All grids: 1 column
- Spacing: Reduced padding (16px containers)

### Small Mobile (320px and below)
- H1: 20px
- Body: 14px
- Logo: Smaller yet
- Extreme spacing optimization

## Mobile Navigation State Machine

```
Initial State: Menu Closed
    ↓
User clicks [☰] button
    ↓
Toggle .active class on .nav
Set aria-expanded="true"
Menu appears below header
    ↓
Options:
├→ User clicks menu link → Close menu, navigate
├→ User clicks outside menu → Close menu
└→ User clicks [☰] again → Close menu

Styling:
- Position: fixed (below header)
- Top: 56px (header height)
- Full width
- Semi-transparent background
- Vertical menu items (48px+ tap target)
```

## Color & Styling Reference

### Colors
- Brand Blue: #6aa2ff (links, highlights)
- Accent Green: #80eec0 (research cards, accent elements)
- Background: #0b0d12 (page bg)
- Panel: #121620 (card backgrounds)
- Text: #e6e9ef (primary text)
- Muted: #a8b0bd (secondary text, metadata)

### Hover Effects
- Cards: translateY(-2px) + box-shadow
- Links: text-decoration underline + translateY(-1px)
- Buttons: Enhanced shadow + translateY(-2px)

### Typography
- Font Stack: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif
- Base: 16px/1.6 line-height
- Responsive scaling: 14px (mobile) → 40px (H1 desktop)

---

**Visual Reference Complete**