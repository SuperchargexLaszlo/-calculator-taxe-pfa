# ARCHITECTURE.md

## Stack
| Layer | Tech | Miért |
|---|---|---|
| Framework | Astro 5 (SSG) | Build static → gyors TTFB, jó crawl budget |
| Interactiv | React islands | Csak a calculator tölt be JS-t |
| Conținut | MDX | Markdown + componente React în articole |
| Stil | CSS custom (global.css) | Fără framework → gyors LCP |
| Sitemap | @astrojs/sitemap | Auto-generare |
| Deploy | Netlify / Vercel (static) | CDN edge |

## Flux date calculator (client-side only)
```
Input user → React state → calcul local (fără API) → rezultat instant
```
Niciun apel server pentru calculator. Viteza = SEO + UX = AdSense RPM mai mare.

## URL structure
```
/                          → Homepage (calculator embed + intro)
/calculator/               → Calculator complet PFA sistem real
/calculator/pfa-vs-srl/    → Comparator
/blog/                     → Index articole
/blog/compliance/          → Grup compliance
/blog/ghiduri/             → Ghiduri practice
/blog/tehnic/              → Articole tehnice
/sitemap-index.xml         → Auto-generat
/robots.txt
```

## Schema.org per tip pagină
- Homepage: WebSite + SearchAction
- Calculator: WebApplication + FAQPage
- Articol blog: Article + FAQPage + BreadcrumbList

## AdSense integrare
- `AdSenseAd.astro` component — primeste `slot` și `format` ca props
- Lazy load hirdetések (Intersection Observer)
- Auto ads DEZACTIVAT — manual placement pentru control

## Content Collections (Astro)
```ts
// src/content/config.ts
blog: defineCollection({
  schema: z.object({
    title: string,
    description: string,
    pubDate: date,
    group: enum['calculator','compliance','ghiduri','tehnic'],
    keywords: string[],
    relatedPosts: string[],   // slugs pentru internal linking
    featured: boolean,
  })
})
```

## Build & Dev
```bash
npm install
npm run dev      # localhost:4321
npm run build    # /dist static output
```
