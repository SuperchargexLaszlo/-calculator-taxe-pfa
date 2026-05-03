# CHANGELOG

## Format: [YYYY-MM-DD] Sprint N — Ce s-a făcut

---

## [2026-05-03] Sprint 6 — SEO tehnic + finalizare
- Sitemap.xml verificat: 23 URL-uri corecte (toate paginile prezente)
- Internal linking audit: 6 fișiere cu link-uri insuficiente → fixate
  - `calculator-pfa-vs-srl-2026.mdx` — adăugate 3 link-uri /blog/ + 2 /calculator/
  - `cod-caen-pfa-2026.mdx` — adăugate 3 link-uri /blog/ 
  - `e-factura-pfa-2026.mdx` — adăugat 1 link /blog/
  - `salariu-minim-2026-taxe-pfa.mdx` — adăugate 3 link-uri /blog/
  - `impozit-pfa-pensionari-2026.mdx` — adăugate 3 link-uri /blog/
  - `cheltuieli-deductibile-pfa-2026.mdx` — adăugate 3 link-uri /blog/
- Meta descriptions fixate (>160 chars → ~145-155 chars):
  - `calculator-pfa-vs-srl-2026.mdx`, `e-factura-pfa-2026.mdx`, `contabilitate-pfa-online-2026.mdx`, `pfa-sub-6-salarii-minime.mdx`
- `public/og-image.png` — creat: 1200×630 px, culoare brand #1a56db
- Schema.org verificat: 7 blocuri JSON-LD (Layout, BlogLayout, index, calculator×2, SchemaOrg component)
- AdSense placement: blog top/bottom ✅, calculator sus/jos ✅; sidebar deferred
- Fix MDX build error: `<20` → `sub 20` în contabilitate-pfa-online-2026.mdx
- Build final: 23 pagini, 0 erori, sitemap generat

## [2026-05-03] Sprint 5 — Blog GROUP_3 Ghiduri + GROUP_4 Tehnic
- `ghiduri/pfa-sub-6-salarii-minime.mdx` — Rescris: cliff fiscal la 24.300 RON, tabel 5k–24.299, ce se întâmplă la prag, 5 FAQ
- `ghiduri/impozit-pfa-2026.mdx` — Rescris: formulă completă, tabel 10 venituri, mecanisme deducere, 5 FAQ
- `ghiduri/impozit-pfa-pensionari-2026.mdx` — Rescris: tabel economii vs non-pensionar, exemplu 60k RON detaliat, 5 FAQ
- `ghiduri/taxe-pfa-it-2026.mdx` — Rescris: tabel tarife orare (15–50 EUR/h), fără scutire IT la PFA, facturare internațională, 5 FAQ
- `ghiduri/cheltuieli-deductibile-pfa-2026.mdx` — Rescris: liste categorii (100%/parțial/non-deductibile), exemplu 15k cheltuieli → 6.225 RON economie, ghid înregistrare, 5 FAQ
- `tehnic/cod-caen-pfa-2026.mdx` — Rescris: 20+ coduri CAEN (IT/marketing/consultanță/educație), proces înregistrare ONRC, impact normă, 5 FAQ
- `tehnic/contabilitate-pfa-online-2026.mdx` — Rescris: tabel software (SmartBill/Oblio/Contapp/Saga/iDoc/Excel), DIY vs contabil, calendar fiscal 2026, 5 FAQ; fix: `<20` → `sub 20` (MDX parse error)
- `tehnic/e-factura-pfa-2026.mdx` — Rescris: 3 metode emitere, câmpuri obligatorii, penalitate 15%, reguli facturare internațională, 5 FAQ
- Build: 23 pagini, 0 erori, sitemap generat

## [2026-05-03] Sprint 4 — Blog GROUP_2 Compliance
- `declaratia-unica-2026.mdx` — Extins: structura D212 (Cap 1+2), ghid SPV, calendar plăți trimestriale, 6 FAQ detaliate
- `plafon-cass-pfa-2026.mdx` — Rescris: tabel 14 niveluri venit, calcul zone, CASS vs CAS, 5 FAQ
- `plafon-cas-pfa-2026.mdx` — Rescris: tabel 12 niveluri venit, baza opțională CAS (6/12/24 sal.), beneficii pensie, 5 FAQ
- `termen-declaratia-unica-2026.mdx` — Extins: tabel penalități pe situații, ghid SPV pas cu pas, calendar fiscal complet, 5 FAQ
- `ce-taxe-plateste-pfa-2026.mdx` — Rescris: toate taxele cu formule, exemplu calcul complet 80k RON, TVA, 5 FAQ
- `salariu-minim-2026-taxe-pfa.mdx` — Rescris: evoluție sal. minim 2023-2026, tabel plafoane derivate, comparație salariat vs PFA net, 5 FAQ
- Build: 23 pagini, 0 erori

## [2026-05-03] Sprint 3 — Blog GROUP_1 Calculator
- `calculator-taxe-pfa-2026.mdx` — Adăugat embed CalculatorPFA, extins la 5 FAQ, CTA comparator SRL
- `calculator-pfa-sistem-real-2026.mdx` — Creat: 4 pași calcul detaliat, tabel 10 venituri (20k–300k), FAQ 5 întrebări, embed CalculatorPFA
- `calculator-venit-net-pfa-2026.mdx` — Creat: tabel venit net 20k–300k RON, estimare lunară, sfaturi optimizare
- `calculator-pfa-vs-srl-2026.mdx` — Fix: impozit dividende corectat 10%→8%, recalculate exemple 60k, embed ComparatorPFAvsSRL
- `norma-venit-vs-sistem-real-2026.mdx` — Extins: calcul normă cu tabel, exemple comparative, 5 FAQ detaliate
- Internal links verificate: toate articolele GROUP_1 linkează → /calculator/
- Build: 23 pagini, 0 erori

## [2026-05-03] Sprint 2 — Calculator principal PFA
- `src/components/ComparatorPFAvsSRL.tsx` — React island: PFA vs SRL microîntreprindere 1%/3%, banner câștigător, tabel comparativ 8 venituri
- `src/pages/calculator/pfa-vs-srl.astro` — Pagina comparator cu WebApplication + FAQPage schema, tabel avantaje/dezavantaje, FAQ vizual
- `src/pages/calculator/index.astro` — Verificat: WebApplication + FAQPage schema, AdSense sus/jos, formulele CAS/CASS/impozit explicate
- `src/components/CalculatorPFA.tsx` — Verificat: calcule corecte cu datele fiscale 2026
- `src/pages/blog/[...slug].astro` — Creat (rest route) pentru a suporta articole în subdirectoare (compliance/, ghiduri/, tehnic/)
- `src/pages/blog/[slug].astro` — Dezactivat (getStaticPaths gol) — înlocuit de [...slug].astro
- Fix build: `npm run build` — 21 pagini generate fără erori, sitemap generat automat
- Testat calcule: CAS plafon 24 sal = 24.300 RON, CASS min 2.430 RON, impozit 10% pe baza netă

## [2026-05-03] Sprint 1 — Fundație tehnică
- Instalat dependențe: React 19, Astro 5.18.1, @astrojs/react, sitemap, mdx
- `src/content/config.ts` — Content Collections schema completă (blog cu group enum, keywords, relatedPosts)
- `src/styles/global.css` — Design system complet: culori, tipografie, grid, formulare, rezultate, hero, breadcrumb, blog, header, footer, AdSense placeholder, utilități responsive
- `src/layouts/Layout.astro` — Base layout cu meta tags, OG, canonical, schema.org slot, AdSense placeholder
- `src/layouts/BlogLayout.astro` — Blog layout cu breadcrumb, Article schema, AdSense sus/jos, CTA calculator, related posts
- `src/components/Header.astro` — Nav sticky cu logo, meniu activ highlight, CTA buton
- `src/components/Footer.astro` — Footer cu linkuri, disclaimer fiscal
- `src/components/AdSenseAd.astro` — Component reutilizabil (horizontal/inline/sidebar)
- `src/components/SchemaOrg.astro` — JSON-LD generator component
- `src/components/CalculatorPFA.tsx` — Calculator React funcțional (date fiscale 2026, tabel comparativ)
- `src/pages/index.astro` — Homepage cu hero, calculator embed, plafoane info, articole recente
- `public/robots.txt` — Allow all + Sitemap
- Verificat: `npm run dev` funcționează pe localhost:4322
- package.json actualizat: React 19 + @types/react 19 (compatibil @astrojs/react 4.x)

## [2026-05-03] Sprint 0 — Setup inițial
- Creat structura de proiect Astro
- Creat CLAUDE.md, ARCHITECTURE.md, CHANGELOG.md, SPRINTS.md
- Definit grupuri de conținut și date fiscale 2026
- Definit URL structure și schema.org plan
