# Bound by Kris

The source of [Kristina Pihl's personal site](https://kristinapihl.pages.dev/): a small single-page app with an about/CV page, a series of short accessibility lessons ("Accessibility Bites") and a list of her board games.

## Pages

| Route         | What it is                                                                                           |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| `/`           | Home                                                                                                 |
| `/about`      | About me and CV (content in `src/data/cv.ts`), with a link to the downloadable PDF                   |
| `/a11y-bites` | Accessibility lessons (`src/data/a11yBites.ts`) plus curated resources (`src/data/a11yResources.ts`) |
| `/boardgames` | Searchable board game collection, loaded at runtime from a published Google Sheet                    |
| `*`           | 404                                                                                                  |

Everything except Home is lazy-loaded per route, so the first visit only downloads what it needs.

## Tech stack

- React 19, TypeScript (strict), React Router 7
- Vite 7, with PostCSS (`postcss-mixins`, `postcss-nested`, `postcss-preset-env`, `autoprefixer`)
- CSS Modules with BEM naming
- Vitest, Testing Library and jsdom for tests
- ESLint (including `jsx-a11y`), Prettier, Husky and lint-staged
- Hosted on Cloudflare Pages (`kristinapihl.pages.dev`)

Requires Node `>=22.18`.

## Getting started

```sh
npm install
npm run dev
```

### Scripts

| Command             | What it does                                       |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Start the Vite dev server                          |
| `npm run build`     | Typecheck (`tsc -b`) and build to `dist/`          |
| `npm run preview`   | Serve the production build locally                 |
| `npm run typecheck` | Typecheck the app only                             |
| `npm run lint`      | Run ESLint (`npm run lint:fix` to autofix)         |
| `npm run format`    | Format everything with Prettier                    |
| `npm test`          | Run all tests once (`npm run test:watch` to watch) |
| `npm run test:git`  | Run only tests related to changed files            |
| `npm run resume`    | Regenerate the CV PDF in `public/` (see below)     |

A Husky pre-commit hook runs lint-staged, the typecheck and the tests for changed files. Fix failures rather than bypassing the hook.

## Project structure

```
src/
  components/   Shared UI, one folder each: index.tsx, index.module.css, index.test.tsx
  pages/        Route components, same folder layout
  hooks/        Reusable hooks (useThing.ts + useThing.test.ts)
  data/         Site content: CV, accessibility bites and resources, board game sheet URL
  utils/        Pure helpers (CSV parsing, search matching, grouping)
  styles/       global.css and breakpoints.ts
  test/         Vitest setup
scripts/
  build-resume.ts   Generates the CV PDF
public/             Fonts (Fraunces), favicon, robots.txt, sitemap.xml, CV PDF
```

## Content

- **Accessibility Bites** and **CV**: edit the typed data in `src/data/`. The rich-text blocks (headings, paragraphs, quotes, code, tables, lists) are rendered by `BiteContent` / `RichText`.
- **Board games**: the list lives in a Google Sheet published as CSV (columns `GAME`, `PLAYERS`, `LANGUAGE`, `LINK`, `TITLE LANG`). Editing the sheet updates the page without a redeploy. The CSV is parsed in `src/utils/parseCsv.ts` and mapped in `src/utils/toBoardgames.ts`; failed or stalled requests (10 s timeout) show an error state with a retry.
- **CV PDF**: after changing `src/data/cv.ts`, run `npm run resume` and commit the new `public/kristina-pihl-cv.pdf`. The script renders the CV with Playwright and `pdf-lib` into a one-page A4 and refuses to write if it no longer fits. Playwright needs a Chromium install (`npx playwright install chromium`).
- **SEO**: each page sets its title and canonical URL via `usePageTitle` and `useCanonicalUrl`. Update `public/sitemap.xml` when adding a route.

## Styling conventions

- Sizes are in `rem`, never `px`, so the site follows the visitor's default text size.
- Breakpoints are defined once in `src/styles/breakpoints.ts` and used through the mixins `mobile-only`, `not-mobile`, `tablet-only`, `mobile-and-tablet` and `desktop-only` in CSS, and `useBreakpoint()` in code.
- Hover styles go inside `@mixin hover { … }` so touch screens don't get stuck hover states. Keyboard focus styles stay outside it.
- Modifiers are nested with PostCSS (`&--active`); combine classes with `cx`.

## Accessibility

Accessibility is a first-class concern here, not an afterthought: semantic HTML and landmarks, a real `<h1>` per page, keyboard operability, and `prefers-reduced-motion` respected (the custom cursor glow, for example, is only enabled for fine pointers with no motion preference). `eslint-plugin-jsx-a11y` runs as part of linting.

The repo also includes a Claude Code skill, `/a11y-review [path]`, that reviews UI code against WCAG 2.2 AA (`.claude/skills/a11y-review/`).

More detail on code conventions lives in [`CLAUDE.md`](./CLAUDE.md).
