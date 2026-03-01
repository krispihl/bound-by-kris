# Project: React + TypeScript (Vite/Next.js)

## Commands

- **Install:** `npm install`
- **Dev:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Test:** `npm test`
- **Typecheck:** `npx tsc --noEmit`

## Tech Stack & Rules

- **React:** Use Functional Components with Hooks. No Class components. Use arrow functions.
- **TypeScript:** Strict mode enabled. **Never use `any`**. Use `interface` for props.
- **Styling:** CSS Modules with BEM naming. Modifiers use `block--modifier` syntax and are nested inside the block class using PostCSS nesting (e.g. `&--active` inside `.link`).
- **State:** Context API
- **Data Fetching:** Fetch

## Coding Standards (Critical Reviewer Style)

- **Imports:** Group by (1) React/External, (2) Internal Components, (3) Hooks/Utils, (4) Styles/Assets.
- **Safety:** Always check for `null`/`undefined` when dealing with API responses.
- **Performance:** Use `useMemo` and `useCallback` only when expensive computations are involved—don't over-optimize early.
- **Naming:** Components in `PascalCase`, hooks start with `use`, utils in `camelCase`.
- **Exports:** Prefer named exports over default exports for better IDE refactoring.
- **File Structure:** Each component and page lives in its own subfolder with `index.tsx` and `index.module.css`.
