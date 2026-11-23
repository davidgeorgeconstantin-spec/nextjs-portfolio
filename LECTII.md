# Lecții: Proiectul 3, portofoliu + blog în Next.js

**5 seri.** Treci de la React „simplu” (Vite) la **Next.js**, framework-ul cerut în majoritatea joburilor React bine plătite.

```bash
npm install
npm run dev     # http://localhost:3000/nextjs-portfolio
```

---

## Lecția 1: App Router – rute din foldere

### Concepte
- În Next.js, **folderul = adresa**. `src/app/projects/page.tsx` devine `/projects/`.
- **`layout.tsx`** învelește toate paginile: header, footer, fonturi, metadata. Se scrie o singură dată.
- **`[slug]`** în numele folderului = rută dinamică (`/blog/orice-articol/`).
- **`<Link href>`** din `next/link` navighează fără reîncărcare. Cu `basePath`, Next adaugă singur `/nextjs-portfolio` în fața linkurilor.
- **`not-found.tsx`**: pagina 404.

### Unde e în cod
| Ce | Fișier |
|---|---|
| Layout-ul comun | `src/app/layout.tsx` |
| Pagina principală | `src/app/page.tsx` |
| Pagina de proiecte | `src/app/projects/page.tsx` |
| Ruta dinamică | `src/app/blog/[slug]/page.tsx` |
| Configurare export static + basePath | `next.config.ts` |

### Exercițiu 1
Adaugă o pagină **`/uses/`** („Ce folosesc”): editorul, browserul, extensiile tale. Adaug-o și în meniu.
**Indicii:** folder nou `src/app/uses/` cu `page.tsx`. Meniul e în `src/lib/site.ts` (`nav`).

---

## Lecția 2: Server Components și blogul din Markdown

### Concepte
- În Next.js, componentele sunt implicit **Server Components**: rulează la build (sau pe server), nu în browser. Pot citi fișiere cu `fs`.
- **`'use client'`** pus sus în fișier = componentă care rulează în browser (are nevoie de `useState`, evenimente, animații).
- Regula: cât mai mult pe server, doar ce e interactiv pe client.
- **Front matter**: datele de la începutul unui fișier `.md` (titlu, dată, tag-uri), citite cu `gray-matter`.
- **`generateStaticParams`**: îi spune lui Next ce articole există, ca să genereze câte un fișier HTML pentru fiecare.
- **`generateMetadata`**: titlu și descriere diferite pentru fiecare articol (SEO).

### Unde e în cod
| Ce | Fișier |
|---|---|
| Citirea articolelor | `src/lib/posts.ts` |
| Articolele | `src/content/posts/*.md` |
| Pagina articolului + `generateStaticParams` | `src/app/blog/[slug]/page.tsx` |
| Exemplu de componentă client | `src/components/ui/ThemeToggle.tsx` |

### Exercițiu 2
Scrie un articol nou în engleză simplă despre **SkyCast** și afișează pe pagina de blog **numărul total de articole**.
**Indicii:** copiază un fișier `.md` și schimbă front matter-ul. Pentru număr: în `src/app/blog/page.tsx` ai deja `posts`; folosește `posts.length`.

---

## Lecția 3: Tailwind CSS și dark mode

### Concepte
- **Tailwind**: clase mici direct în JSX (`px-5`, `rounded-3xl`, `text-slate-600`). Nu mai sari între fișiere CSS.
- **Responsive:** `sm:`, `md:`, `lg:` = de la acea lățime în sus (`sm:text-7xl`).
- **Dark mode:** `dark:bg-slate-950` se aplică doar când `<html>` are clasa `dark`.
- **Fără „flash”:** un mic script în `<head>` pune clasa `dark` **înainte** să apară pagina.
- **`@theme`** în CSS: culorile și fonturile tale proprii.

### Unde e în cod
| Ce | Fișier |
|---|---|
| Configurare Tailwind v4, dark mode, `@theme` | `src/app/globals.css` |
| Scriptul anti-flash | `src/app/layout.tsx` (`themeScript`) |
| Butonul de temă | `src/components/ui/ThemeToggle.tsx` |

### Exercițiu 3
Adaugă o a treia opțiune la butonul de temă: **„system”** (urmează setarea sistemului).
**Indicii:** în loc de `boolean`, folosește tipul `'light' | 'dark' | 'system'`. La „system”, șterge cheia din `localStorage` și folosește `matchMedia('(prefers-color-scheme: dark)')`.

---

## Lecția 4: animații cu GSAP

### Concepte
- **GSAP** e biblioteca de animații folosită de agenții și site-uri premiate.
- **Timeline:** animații legate una după alta (`tl.from(...).from(...)`). `'-=0.4'` = începe cu 0,4 secunde mai devreme.
- **SplitText:** împarte un titlu în litere, ca să le animezi pe rând.
- **ScrollTrigger:** pornește animația la scroll. Cu `scrub: true`, animația urmează exact scroll-ul.
- **`useGSAP`** (din `@gsap/react`): ca `useEffect`, dar curăță automat animațiile. `scope` limitează selectorii la componentă.
- **`gsap.matchMedia()`**: rulează animațiile doar dacă utilizatorul nu a cerut „mai puțină mișcare”.

### Unde e în cod
| Ce | Fișier |
|---|---|
| Înregistrarea pluginurilor | `src/lib/gsap.ts` |
| Titlul animat + blob-uri | `src/components/sections/Hero.tsx` |
| Linia care se umple la scroll | `src/components/sections/RoadmapTimeline.tsx` |

### Exercițiu 4
Fă ca titlurile secțiunilor (`SectionHeading`) să apară **cuvânt cu cuvânt** la scroll, cu GSAP.
**Indicii:** fă o componentă client nouă `AnimatedHeading` cu `useRef`, `useGSAP`, `SplitText.create(ref.current, { type: 'words' })` și `scrollTrigger: { trigger: ref.current, start: 'top 85%' }`.

---

## Lecția 5: animații cu Motion (avansat) și publicare

### Concepte
- **Valori de mișcare** (`useMotionValue`): se schimbă fără să redeseneze componenta. Perfecte pentru mouse.
- **`useTransform`**: transformă o valoare (poziția mouse-ului 0–1) în alta (rotație −6° … 6°).
- **`useSpring`**: face mișcarea elastică, naturală.
- **`useScroll`**: progresul scroll-ului (0–1), folosit pentru bara de citire.
- **Export static:** `npm run build` creează folderul `out/` cu HTML simplu, pe care GitHub Pages îl poate servi.

### Unde e în cod
| Ce | Fișier |
|---|---|
| Card 3D cu spotlight | `src/components/ui/ProjectCard.tsx` |
| Buton magnetic | `src/components/ui/MagneticButton.tsx` |
| Header care se ascunde la scroll | `src/components/layout/SiteHeader.tsx` |
| Bara de citire | `src/components/motion/ReadingProgress.tsx` |
| Workflow de publicare | `.github/workflows/deploy.yml` |

### Exercițiu 5
Adaugă un buton **„Back to top”** care apare (cu animație) după ce ai dat scroll 600px și urcă lin sus la click.
**Indicii:** componentă client, `useScroll` + `useMotionValueEvent` pentru a afla poziția, `AnimatePresence` pentru apariție/dispariție, `window.scrollTo({ top: 0, behavior: 'smooth' })`.

---

## Verifică-te
1. Ce diferență e între Server Component și Client Component?
2. La ce folosește `generateStaticParams`?
3. Ce face `basePath` și de ce avem nevoie de el pe GitHub Pages?
4. Cum eviți „flash-ul” temei greșite?
5. Ce face `scrub: true` în ScrollTrigger?
