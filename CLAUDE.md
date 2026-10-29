# Project: React + TypeScript (Vite/Next.js)

## Commands

- **Install:** `npm install`
- **Dev:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Test:** `npm test`
- **Typecheck:** `npm run typecheck`
- **Test (watch):** `npm run test:watch`
- **Lint (autofix):** `npm run lint:fix`

## Tech Stack & Rules

- **React:** Use Functional Components with Hooks. No Class components. Use arrow functions.
- **TypeScript:** Strict mode enabled. **Never use `any`**. Use `type` for props. Inline a props type directly in the function signature when it has only 1-2 fields; name a separate `type` only for larger prop sets.
- **Styling:** CSS Modules with BEM naming. Modifiers use `block--modifier` syntax and are nested inside the block class using PostCSS nesting (e.g. `&--active` inside `.link`).
- **Sizing:** Always use `rem` units for sizing (`font-size`, `width`, `height`, `margin`, `padding`, `gap`, etc.) — never `px`. The root `html` element sets `font-size: 16px` in `src/styles/global.css`, so `1rem = 16px` (e.g. `1rem` = 16px, `1.5rem` = 24px).
- **State:** Context API
- **Data Fetching:** Fetch

## Coding Standards (Critical Reviewer Style)

- **Imports:** Group by (1) React/External, (2) Internal Components, (3) Hooks/Utils, (4) Styles/Assets.
- **Type assertions:** Do not use `as` (ESLint enforced; `as const` and test files excepted). Narrow with a type guard instead, especially for API responses.
- **Barrels:** No `export *` re-exports (ESLint enforced). Export only what is needed.
- **Type imports:** Use `import type` for type-only imports (ESLint enforced).
- **Hooks:** Reusable hooks live flat in `src/hooks/` as `useThing.ts` with a `useThing.test.ts` beside them.
- **Tests:** Vitest + Testing Library; use `userEvent`, not `fireEvent`. Put `index.test.tsx` next to the component. Aim for one happy path plus 2-3 edge cases. Query by role/accessible name.
- **Pre-commit:** Husky runs lint-staged, typecheck and tests on changed files. Fix failures rather than bypassing with `--no-verify`.
- **Safety:** Always check for `null`/`undefined` when dealing with API responses.
- **Performance:** Use `useMemo` and `useCallback` only when expensive computations are involved—don't over-optimize early.
- **Naming:** Components in `PascalCase`, hooks start with `use`, utils in `camelCase`.
- **Exports:** Prefer named exports over default exports for better IDE refactoring.
- **Accessibility:** Must be considered and implemented, not an afterthought — semantic HTML, accessible names (`aria-label`/`aria-hidden` where visual markup fragments text), keyboard operability, and respect for `prefers-reduced-motion` on animations. Routed page content lives inside a `<main>` landmark (see `App.tsx`); each page's primary heading uses a real `<h1>`, not a styled `<div>`.
- **Semantic HTML:** Prefer a semantic tag over a generic `<div>`/`<span>` whenever one matches the content's role — `<nav>` for navigation (already used in `Navbar`), `<main>` for the routed page content, `<header>`/`<footer>` for page or section framing, `<section>`/`<article>` for self-contained chunks of content (e.g. a book entry, a blog post), `<ul>`/`<li>` for lists of items (e.g. nav links, book listings), `<button>` for anything clickable that performs an action, `<a>`/`NavLink` for anything that navigates, and heading tags (`<h1>`-`<h6>`) in document order for titles. Reach for `<div>`/`<span>` only for styling hooks that have no semantic role of their own (e.g. a layout wrapper, a decorative divider).
- **File Structure:** Each component and page lives in its own subfolder with `index.tsx` and `index.module.css`.
