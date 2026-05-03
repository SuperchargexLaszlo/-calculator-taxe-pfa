# SPRINTS.md — Calculator Taxe PFA România 2026

## Instrucțiuni pentru Claude Code
La FIECARE sesiune nouă:
1. Citește CLAUDE.md complet
2. Citește ultimele 5 rânduri din CHANGELOG.md
3. Identifică sprint-ul [CURRENT] de mai jos
4. Execută task-urile în ordine, bifează-le
5. Adaugă intrare în CHANGELOG.md la final

---

## SPRINT 1 — Fundație tehnică [DONE]
**Obiectiv:** Site funcțional pe localhost cu layout, stiluri și routing

### Tasks
- [x] Instalează dependențe: `npm install`
- [x] `src/content/config.ts` — Content Collections schema completă
- [x] `src/styles/global.css` — Design system: culori, tipografie, grid, utilități
- [x] `src/layouts/Layout.astro` — Base layout: meta tags, OG, canonical, AdSense script placeholder
- [x] `src/layouts/BlogLayout.astro` — Blog layout cu breadcrumb + schema Article
- [x] `src/components/Header.astro` — Nav: logo, meniu, CTA "Calculator"
- [x] `src/components/Footer.astro` — Footer cu linkuri, disclaimer fiscal
- [x] `src/components/AdSenseAd.astro` — Component reutilizabil
- [x] `src/components/SchemaOrg.astro` — JSON-LD generator component
- [x] `src/pages/index.astro` — Homepage: hero, calculator embed, articole recente
- [x] `public/robots.txt`
- [x] Verifică `npm run dev` funcționează (localhost:4322)
- [x] Update CHANGELOG.md

---

## SPRINT 2 — Calculator principal PFA [DONE]
**Obiectiv:** Calculator interactiv complet, funcțional, mobil-friendly

### Tasks
- [x] `src/components/CalculatorPFA.tsx` — React island: sistem real/normă, pensionar, cheltuieli deductibile, tabel comparativ
- [x] `src/components/ComparatorPFAvsSRL.tsx` — PFA vs SRL 1%/3% side-by-side cu banner câștigător
- [x] `src/pages/calculator/index.astro` — WebApplication + FAQPage schema, AdSense sus/jos
- [x] `src/pages/calculator/pfa-vs-srl.astro` — Pagina comparator cu schema și FAQ
- [x] AdSense placement: deasupra și sub calculator (ambele pagini)
- [x] Test calcule: formule corecte cu datele fiscale 2026
- [x] Fix routing: [...slug].astro pentru articole în subdirectoare
- [x] Build verificat: 21 pagini, 0 erori, sitemap generat
- [x] Update CHANGELOG.md

---

## SPRINT 3 — Blog: Grup Calculator (GROUP_1) [DONE]
**Obiectiv:** 5 articole pentru keywords tranzacționale, fiecare optimizat SEO

### Tasks
- [x] `calculator-taxe-pfa-2026.mdx` — Embed CalculatorPFA, 5 FAQ, CTA SRL
- [x] `calculator-pfa-sistem-real-2026.mdx` — Creat: pași calcul, tabel 10 venituri, CalculatorPFA embed
- [x] `calculator-venit-net-pfa-2026.mdx` — Creat: tabel 20k–300k cu venit net, estimare lunară
- [x] `calculator-pfa-vs-srl-2026.mdx` — Fix impozit dividende 10%→8%, ComparatorPFAvsSRL embed
- [x] `norma-venit-vs-sistem-real-2026.mdx` — Extins: tabel calcul normă, exemple concrete, 5 FAQ
- [x] `src/pages/blog/index.astro` — Lista articole grupate
- [x] `src/pages/blog/[...slug].astro` — Dynamic route MDX (inclusiv subdirectoare)
- [x] Internal links verificate: toate articolele → /calculator/
- [x] Build: 23 pagini, 0 erori, sitemap actualizat
- [x] Update CHANGELOG.md

---

## SPRINT 4 — Blog: Grup Compliance (GROUP_2) [DONE]
**Obiectiv:** 6 articole informaționale cu keywords de volum mare

### Tasks
- [x] `declaratia-unica-2026.mdx` — Extins: structura D212, depunere pas cu pas, calendar plăți, 6 FAQ
- [x] `plafon-cass-pfa-2026.mdx` — Rescris complet: tabel 14 venituri, calcul CASS, diferența CAS vs CASS, 5 FAQ
- [x] `plafon-cas-pfa-2026.mdx` — Rescris complet: tabel 12 venituri, baza opțională CAS, beneficii pensie, 5 FAQ
- [x] `termen-declaratia-unica-2026.mdx` — Extins: penalități detaliate, ghid SPV pas cu pas, calendar fiscal, 5 FAQ
- [x] `ce-taxe-plateste-pfa-2026.mdx` — Rescris complet: toate taxele, exemplu calcul complet 80k RON, 5 FAQ
- [x] `salariu-minim-2026-taxe-pfa.mdx` — Rescris: evoluție sal. minim, tabel plafoane, comparație salariat vs PFA, 5 FAQ
- [x] Internal links: toate articolele → /calculator/
- [x] Build: 23 pagini, 0 erori
- [x] Update CHANGELOG.md

---

## SPRINT 5 — Blog: Ghiduri (GROUP_3) + Tehnic (GROUP_4) [DONE]
**Obiectiv:** 8 articole long-tail + tehnice

### Tasks
**GROUP_3 — Ghiduri:**
- [x] `src/content/blog/ghiduri/cheltuieli-deductibile-pfa-2026.mdx`
- [x] `src/content/blog/ghiduri/pfa-sub-6-salarii-minime.mdx`
- [x] `src/content/blog/ghiduri/taxe-pfa-it-2026.mdx`
- [x] `src/content/blog/ghiduri/impozit-pfa-pensionari-2026.mdx`
- [x] `src/content/blog/ghiduri/impozit-pfa-2026.mdx`

**GROUP_4 — Tehnic:**
- [x] `src/content/blog/tehnic/e-factura-pfa-2026.mdx`
- [x] `src/content/blog/tehnic/cod-caen-pfa-2026.mdx`
- [x] `src/content/blog/tehnic/contabilitate-pfa-online-2026.mdx` (fix MDX parse error: `<20` → `sub 20`)
- [x] Update CHANGELOG.md
- [x] Build: 23 pagini, 0 erori

---

## SPRINT 6 — SEO tehnic + finalizare [DONE]
**Obiectiv:** Sitemap, schema.org, internal linking audit, performance

### Tasks
- [x] Verifică sitemap.xml auto-generat (toate URL-urile prezente) — 23/23 URL-uri ✅
- [x] Audit internal linking: fiecare articol are ≥3 linkuri spre alte articole — 6 fișiere fixate
- [x] Verifică toate schema.org (JSON-LD valid) — 7 blocuri în 6 fișiere ✅
- [x] `public/og-image.png` — creat 1200×630 px
- [x] Verifică meta descriptions pe toate paginile (150-160 chars) — 4 fișiere scurtate
- [ ] Testează mobile (viewport 375px) — necesită browser manual
- [ ] Lighthouse check: target LCP < 2.5s, CLS < 0.1 — necesită browser manual
- [x] AdSense: blog top/bottom + calculator sus/jos verificate; sidebar deferred
- [x] `npm run build` fără erori — 23 pagini ✅
- [x] Update CHANGELOG.md

---

## Note pentru Claude Code
- Toate calculele fiscale: folosește datele din CLAUDE.md, nu le inventa
- Culori site: #1a56db (albastru), #fff (alb), #1f2937 (text dark)
- Nu folosi librării CSS externe — doar global.css
- Componentele React: client:load doar pentru calculator, restul server-side
- Fiecare fișier MDX: frontmatter complet (title, description, pubDate: 2026-xx-xx, group, keywords, relatedPosts)
