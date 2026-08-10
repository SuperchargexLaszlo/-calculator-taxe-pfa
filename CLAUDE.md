# CLAUDE.md — Calculator Taxe PFA România 2026
> Citește acest fișier la ÎNCEPUTUL fiecărei sesiuni. Este sursa de adevăr.

## Proiect
**Scop:** Site Astro cu calculator interactiv taxe PFA/SRL + blog SEO pentru piața română  
**Nișă:** Taxe PFA — cel mai mare CPC AdSense în România  
**Framework:** Astro 5 + React islands + MDX  
**Limbă conținut:** Română  
**An referință:** 2026 (toate datele, calculele, URL-urile)

## Date fiscale 2026 (sursă adevăr)
```
SALARIU_MINIM = 4050 RON
PLAFON_6_SAL  = 24300 RON   (6 × 4050) — sub acest nivel: fără CAS
PLAFON_12_SAL = 48600 RON   (12 × 4050) — plafon CAS sistem real
PLAFON_24_SAL = 97200 RON   (24 × 4050) — plafon CASS
PLAFON_72_SAL = 291600 RON  (72 × 4050) — plafon CASS maxim

CAS_RATA      = 25%          (pensie)
CASS_RATA     = 10%          (sănătate)
IMPOZIT_RATA  = 10%          (impozit pe venit)

TVA_PLAFON    = 300000 RON   (prag înregistrare TVA)
```

## Structura proiect
```
/src
  /pages
    index.astro              — Homepage cu calculator embed
    /calculator
      index.astro            — Calculator principal PFA
      pfa-vs-srl.astro       — Comparator PFA vs SRL
    /blog
      index.astro            — Lista articole
      [slug].astro           — Template articol
  /content
    /blog                    — Fișiere .mdx pentru fiecare keyword
  /components
    CalculatorPFA.tsx        — React island: calculator principal
    ComparatorPFAvsSRL.tsx   — React island: comparator
    BlogCard.astro
    Header.astro
    Footer.astro
    AdSenseAd.astro
    SchemaOrg.astro
  /layouts
    Layout.astro             — Layout de bază
    BlogLayout.astro         — Layout articol
  /styles
    global.css
/public
  robots.txt
  og-image.png
ARCHITECTURE.md
CHANGELOG.md
CLAUDE.md                    ← ești aici
SPRINTS.md
```

## Grupuri de conținut (SEO clustering)
```
GROUP_1_CALCULATOR: /calculator/*
  — calculator-taxe-pfa-2026 (main)
  — calculator-pfa-sistem-real-2026
  — calculator-venit-net-pfa-2026
  — calculator-pfa-vs-srl-2026
  — norma-venit-vs-sistem-real-2026

GROUP_2_COMPLIANCE: /blog/compliance/*
  — declaratia-unica-2026
  — plafon-cass-pfa-2026
  — plafon-cas-pfa-2026
  — termen-depunere-declaratia-unica-2026
  — ce-taxe-plateste-un-pfa-2026
  — salariu-minim-2026-taxe-pfa

GROUP_3_LONGTAIL: /blog/ghiduri/*
  — cheltuieli-deductibile-pfa-2026
  — pfa-sub-6-salarii-minime-taxe
  — taxe-pfa-it-2026
  — impozit-pfa-pensionari-2026
  — impozit-pfa-2026

GROUP_4_TEHNIC: /blog/tehnic/*
  — e-factura-pfa-2026
  — cod-caen-pfa-2026
  — contabilitate-pfa-online-2026
```

## Reguli AdSense placement
1. Deasupra calculatorului: 1× responsive display
2. Sub rezultate calculator: 1× în linie (cel mai valoros)
3. Articol blog: între paragrafe (după al 3-lea paragraf)
4. Sidebar sticky (desktop): 1× 300×600

## Reguli SEO
- Fiecare articol: title tag, meta description, OG tags, schema.org (Article + FAQ)
- Internal linking: fiecare articol → calculator (main CTA)
- Breadcrumbs pe toate paginile
- Sitemap XML auto-generat
- robots.txt: Allow all
- Toate articolele au dată: 2026

## Sprint curent
Vezi SPRINTS.md — execută sprint-ul marcat [CURRENT]

## Cum reiei sesiunea
1. Citește CLAUDE.md (ești deja aici)
2. Citește CHANGELOG.md — ultimele 5 intrări
3. Verifică SPRINTS.md — care sprint e [CURRENT]
4. Continuă de unde s-a oprit
