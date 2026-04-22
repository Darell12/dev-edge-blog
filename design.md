# Design Language — DevEdge Blog

> Sistema de diseño para blog técnico personal. Inspirado en el portafolio `web-resume` con estética B&W minimalista. portable a cualquier proyecto.

---

## 1. Concept & Vision

**DevEdge Blog** es un espacio de publicación técnica donde comparto aprendizajes, soluciones y reflexiones como desarrollador. La experiencia debe transmitir **claridad intelectual** y **solidez técnica** — sin adornos innecesarios, cada elemento cumple una función.

La sensación es de un **cuaderno de ingeniería bien organizado**: limpio, preciso, con jerarquía visual clara que guía la lectura. El contraste blanco/negro comunica profesionalismo y confianza.

---

## 2. Design Language

### Color Palette (B&W Minimalist)

| Token | Light Mode | Dark Mode | Uso |
|-------|-----------|-----------|-----|
| `--color-bg` | `#ffffff` | `#0a0a0a` | Fondo principal |
| `--color-bg-alt` | `#fafafa` | `#141414` | Fondos de sección, cards |
| `--color-fg` | `#0a0a0a` | `#f5f5f5` | Texto principal, títulos |
| `--color-fg-muted` | `#525252` | `#a3a3a3` | Texto secundario, descripciones |
| `--color-fg-subtle` | `#a3a3a3` | `#525252` | Texto terciario, placeholders |
| `--color-border` | `#e5e5e5` | `#2a2a2a` | Bordes suaves |
| `--color-border-strong` | `#d4d4d4` | `#3a3a3a` | Bordes destacados |
| `--color-accent` | `#0a0a0a` | `#f5f5f5` | Links, elementos interactivos |

### Typography

| Role | Font | Fallback | Notes |
|------|------|----------|-------|
| Headings | `DM Serif Display` | `Georgia, serif` | Serif elegante, letra `-0.02em` |
| Body | `DM Sans` | `system-ui, sans-serif` | Legibilidad, line-height `1.6` |
| Code | `JetBrains Mono` | `monospace` | Para bloques de código inline |
| Meta/Tags | `JetBrains Mono` | `monospace` | Badges, fechas, categorías |

**Escala tipográfica:**

```
--text-xs:   0.75rem   (12px) — fechas, metadata
--text-sm:   0.875rem   (14px) — descripciones, tags
--text-base: 1rem       (16px) — cuerpo de texto
--text-lg:   1.125rem   (18px) — lead paragraphs
--text-xl:   1.5rem     (24px) — títulos de sección
--text-2xl:  2rem       (32px) — títulos de artículo
--text-3xl:  3rem       (48px) — headings en hero
--text-4xl:  4rem       (64px) — hero principal (mobile: 2.5rem)
```

### Spatial System

```
--space-xs:  0.25rem   (4px)
--space-sm:  0.5rem    (8px)
--space-md:  1rem      (16px)
--space-lg:  2rem      (32px)
--space-xl:  4rem      (64px)
--space-2xl: 8rem      (128px)
```

### Border Radius

```
--radius-sm: 2px   (tags, badges)
--radius-md: 4px   (botones, inputs)
--radius-lg: 8px   (cards, containers)
```

### Motion Philosophy

Transiciones suaves y profesionales. Nada flashy — el movimiento comunica estado, no-decoration.

| Token | Value | Uso |
|-------|-------|-----|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Transiciones de entrada |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Interacciones con rebote |
| `--duration-fast` | `150ms` | Hovers, toggles |
| `--duration-normal` | `300ms` | Cambios de estado |
| `--duration-slow` | `500ms` | Fade-ins, reveal |

**Regla accessibility:** `prefers-reduced-motion` desactiva todas las animaciones.

### Visual Assets

- **Iconos:** SVG inline, stroke-based, 2px de grosor, currentColor
- **Imágenes:** Escala de grises con filtro `grayscale(100%)` para mantener consistencia
- **Decorativos:** Líneas horizontales de 1px, espacios generosos

---

## 3. Layout & Structure

### Grid System

- Max width: `1200px`
- Contenedor: `padding: 0 var(--space-lg)` (mobile: `var(--space-md)`)
- Columnas: Flexbox para layouts internos, CSS Grid para listas de artículos

### Estructura de Página

```
┌─────────────────────────────────────────────┐
│ HEADER (fixed, blur backdrop, border-bottom)│
│ Logo [Nav] [Theme Toggle] [Lang]             │
├─────────────────────────────────────────────┤
│ HERO (opcional en home)                     │
│ Título + descripción del blog                │
├─────────────────────────────────────────────┤
│ MAIN CONTENT                                │
│ ┌─────────────────────────────────────────┐ │
│ │ Article List / Article Content          │ │
│ │                                         │ │
│ │ List: Grid de cards                     │ │
│ │ Single: Header + contenido + sidebar    │ │
│ └─────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│ FOOTER (border-top, links sociales)         │
└─────────────────────────────────────────────┘
```

### Responsive Strategy

- **Desktop (>1024px):** Layout completo, sidebar visible
- **Tablet (768px-1024px):** Sidebar colapsa, grid 2 columnas
- **Mobile (<768px):** Single column, navegación hamburger

---

## 4. Features & Interactions

### Homepage — Lista de Artículos

- Grid de `ArticleCard` con 2-3 columnas según viewport
- Filtro por categoría (tags)
- Búsqueda por título (opcional, fase 2)
- Paginación o infinite scroll

### Página de Artículo

- Header: título (h1), metadata (fecha, autor, tiempo lectura), tags
- Contenido: markdown renderizado con estilos consistentes
- Sidebar: TOC (table of contents) sticky, artículos relacionados
- Footer: navegación a artículos prev/next

### Interacciones

| Elemento | Hover | Active | Focus |
|----------|-------|--------|-------|
| Links | Subrayado animado (width 0→100%) | opacity 0.7 | 2px outline offset 2px |
| Cards | `translateY(-4px)` + shadow | scale 0.98 | outline visible |
| Botones | Border color más oscuro | Background invert | outline visible |
| Tags | Background fill | — | outline |

### Estados

- **Loading:** Skeleton con pulse animation
- **Empty:** Ilustración minimal + mensaje descriptivo
- **Error:** Mensaje claro + acción de retry

---

## 5. Component Inventory

### Header

- Fixed top, `backdrop-filter: blur(8px)`, transición de background al scroll
- Logo: tipografía `DM Serif Display`, `font-weight: 700`
- Nav links: opacity 0.6 → 1 on hover, underline animado
- Theme toggle: icono sol/luna SVG inline
- Mobile: hamburger menu con overlay

**Estados:**
- Default: transparente/blur sutil
- Scrolled: background sólido + border-bottom + shadow
- Dark mode: colores adaptados

### ArticleCard

- Border `1px solid --color-border`
- Hover: elevación + shadow + border-color más fuerte
- Featured: border `2px solid --color-fg`

```
┌─────────────────────────────────┐
│ [Tag] [Tag]                     │
│                                 │
│ Título del Artículo             │  ← DM Serif Display, h3 size
│                                 │
│ Descripción breve del contenido │  ← DM Sans, muted color
│                                 │
│ Fecha · X min read              │  ← JetBrains Mono, xs size
└─────────────────────────────────┘
```

### ArticleContent

- Tipografía para prose: body `1.125rem`, line-height `1.8`
- Headings con anchor links (icono copiar)
- Code blocks: background `--color-bg-alt`, padding generoso, border-left accent
- Imágenes: full-width, border-radius
- Blockquotes: borde-left `4px solid --color-fg`, padding-left

### Footer

- Border-top `1px solid --color-border`
- Links sociales con iconos SVG
- Copyright con año dinámico

### Tag/Badge

```
font-family: var(--font-mono)
font-size: var(--text-xs)
letter-spacing: 0.05em
text-transform: uppercase
border: 1px solid var(--color-border-strong)
border-radius: var(--radius-sm)
padding: var(--space-xs) var(--space-sm)
```

### Theme Toggle

- Botón 36×36px, border `1px solid --color-border`
- Iconos SVG (sol/ luna) con transición de display
- Hover: border-color cambia

---

## 6. Technical Approach

### Stack Recomendado

| Capa | Opción |
|------|--------|
| Framework | Astro (matches portfolio) |
| Content | MDX (markdown + components) |
| Styling | CSS custom properties + scoped styles |
| Icons | Inline SVG (no library dependency) |
| Search | Pagefind (static, fast) |

### Arquitectura de Archivos

```
/
├── src/
│   ├── components/     # Componentes reutilizables
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ArticleCard.astro
│   │   ├── ArticleContent.astro
│   │   ├── Tag.astro
│   │   ├── ThemeToggle.astro
│   │   └── TOC.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro   # Layout común (header, footer)
│   │   └── ArticleLayout.astro
│   ├── pages/
│   │   ├── index.astro        # Homepage (lista de artículos)
│   │   └── articles/
│   │       └── [...slug].astro # Detalle de artículo
│   ├── content/
│   │   └── articles/          # Archivos .mdx
│   └── styles/
│       └── global.css         # Variables CSS compartidas
├── public/
│   └── fonts/                 # Si se self-hosted fonts
└── design.md                  # Este archivo
```

### Content Model (Frontmatter)

```yaml
---
title: "Título del Artículo"
description: "Descripción breve para SEO y cards"
pubDate: 2024-01-15
updatedDate: 2024-01-20
author: "Darell E."
tags: ["TypeScript", "Architecture", "Clean Code"]
featured: false
draft: false
---
```

### SEO Checklist

- [ ] Meta title + description por página
- [ ] Open Graph image (og-image.svg)
- [ ] Canonical URLs
- [ ] Sitemap.xml
- [ ] robots.txt
- [ ] Structured data (Article schema)
- [ ] i18n support (en/es como portfolio)

### Performance Targets

- Lighthouse: 95+ en todo
- Core Web Vitals: LCP <2.5s, CLS <0.1
- Bundle: <50KB JS (idealmente 0KB con Astro)

### Dark Mode Implementation

```css
/* Toggle via data-theme attribute en <html> */
[data-theme="dark"] {
  --color-bg: #0a0a0a;
  --color-bg-alt: #141414;
  --color-fg: #f5f5f5;
  /* ... resto de tokens */
}
```

```js
// Script en Header
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
```

---

## 7. Design Tokens (Referencia Rápida)

```css
:root {
  /* Fonts */
  --font-heading: 'DM Serif Display', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Colors - Light */
  --color-bg: #ffffff;
  --color-bg-alt: #fafafa;
  --color-fg: #0a0a0a;
  --color-fg-muted: #525252;
  --color-fg-subtle: #a3a3a3;
  --color-border: #e5e5e5;
  --color-border-strong: #d4d4d4;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
  --space-2xl: 8rem;

  /* Animation */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;

  /* Layout */
  --max-width: 1200px;
  --header-height: 80px;
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;
}
```

---

## 8. Próximos Pasos (Fase 1)

1. **Scaffold Astro project** con estructura definida
2. **Copiar global.css** del portfolio y adaptar tokens
3. **Implementar Header** con theme toggle (copiar lógica del portfolio)
4. **Crear ArticleCard** y grid de homepage
5. **Setup content collection** para artículos MDX
6. **Implementar ArticleLayout** con estilos de prose

---

*Design system creado para DevEdge Blog. Mantiene compatibilidad visual con web-resume portfolio. Actualizado: Abril 2026.*