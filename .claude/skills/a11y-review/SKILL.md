---
name: a11y-review
description: >
  Reviews this repo's UI code (React components and their CSS Modules) for WCAG 2.2 AA accessibility against a static
  reference of baseline and per-component checks, and reports what fails, what looks suspect and what a person still
  has to check by hand. Use when asked for an accessibility, a11y or WCAG review of a file, a folder or the current
  changes, or via /a11y-review [path]. Do not run on routine edits nobody asked to review.
---

# Accessibility review

Review the code in scope against `reference.md` (in this folder) and this repo's own accessibility rules in
`CLAUDE.md`, then report. This is a review, not a fix: change nothing unless the person asks, and offer the fixes at
the end instead.

## 1. Scope

- **A path given** (`/a11y-review src/pages/About`, or a file): review every `.tsx` and `.module.css` under it. Leave
  out tests and data files, except to look up what a component renders.
- **Nothing given**: review the uncommitted changes (`git diff HEAD` plus untracked files under `src/`), but read each
  changed file whole, because an accessibility problem is often in an unchanged line next to the change. If there are
  no changes, ask which page or component to review rather than auditing the whole repo.

Always read a component's `index.tsx` and `index.module.css` together: focus styles, hit target size, reduced motion
and hiding live in the CSS. Follow shared components the code uses (`ExternalLink`, `RichText`, `SocialLinks`, …) far
enough to know what they render.

## 2. What the code is

Work out which component types from `reference.md` the code actually builds: an icon-only button, a modal, a
disclosure, a form field, a data table, a status message, an image, and so on. A file can be several at once (the
a11y bites page is a list of disclosures, a contents nav and a link list). Only check sections for what is really
there.

When something is not in the reference, find its closest WAI-ARIA Authoring Practices Guide pattern (disclosure,
accordion, menu button, listbox, carousel, slider, …) and check it against that pattern's role, states, keyboard
interaction and screen-reader expectation, in the same shape and depth as the reference. Name the pattern in the
report and say it is generalized, not from the static reference. Prefer native HTML throughout: a `<button>`,
`<select>`, `<dialog>` or `<details>` already supplies the role, state and keyboard behaviour, so never ask for ARIA
on top of it.

## 3. Check

- **Baseline, every interactive element**, then the deltas for each component type found.
- **`[dev]` lines**: check against the code.
- **`[design]` lines**: check what the code shows: focus styles exist and aren't removed, hit target sizes in the CSS,
  a state that only changes colour. Contrast can't be confirmed from source, so a colour pair that looks low is
  **suspect**, never a confirmed fail.
- **`[qa]` lines**: these need the running page. Carry the ones that apply to this code into the "Check by hand" list.
  If a browser tool is available and the dev server is running, you may check some yourself (the accessibility tree,
  tabbing order, reduced motion, 200% zoom) and say which you did.

Also check this repo's conventions, which come from `CLAUDE.md` and from issues already met here:

- Routed page content sits in `<main>`; each page has one real `<h1>`; headings go in order without skipping levels.
- Landmarks: the site `<header>` (Navbar) and `<footer>` (Footer) stay outside `<main>`, the only banner and
  contentinfo. A `<header>`/`<footer>` inside the page is fine and is not a landmark. A `<section>` becomes a region
  only when it is named, so name one only when it deserves to be a landmark; plain subsections, especially inside
  another region, are a `<div>` with a heading (landmark tools outline every `<section>` and flag nested ones).
- Scrollable boxes that need focus (`tabIndex={0}`) get `role="group"` and a name, not `role="region"`.
- Decoration and visual fragments are `aria-hidden="true"`, with the text said once in an accessible name or
  visually hidden text (`screenreader-only` class).
- Links that open a new tab say so in their accessible name ("(opens in a new tab)"), as `ExternalLink` and
  `RichText` do.
- Every animation and transition has a `prefers-reduced-motion: reduce` override in its CSS module.
- Focus uses the shared ring (`--color-focus`, `--focus-width`); a component that changes it (as the menu does on navy)
  keeps at least 3:1 against its own background.
- The header bar is fixed: anything focusable or scrolled to must clear `--header-height` (the `scroll-padding-top` on
  `html` covers in-page links and tabbing; a sticky element must offset its `top` by it).
- Interactive state from code uses real elements and attributes (`aria-expanded` on the button that toggles,
  `hidden` on the closed panel), not class names alone.

## 4. Report

Open with one line naming what was reviewed and which component types were found. Then:

- **Fails** — clear breaks of a reference line or a repo rule. Each: `file:line`, what's wrong, the requirement it
  breaks, and the fix in a sentence.
- **Suspect** — likely problems the code can't settle (contrast, runtime state, focus after a route change). Each says
  what to verify.
- **Check by hand** — the `[qa]` and `[design]` checks that apply to this code and weren't done, as a short checklist.

Name a WCAG Success Criterion number only when sure of it (e.g. 2.4.7 Focus Visible, 2.5.8 Target Size (Minimum),
4.1.2 Name, Role, Value); otherwise name the requirement in plain words. Never invent a rule beyond the reference, the
APG pattern or the repo rules above, and never say the code "is accessible": a static review with no fails means only
that nothing in the code breaks these checks. If a section has nothing, say "None found" rather than leaving it out.

End by offering to fix the Fails, and do so only if asked.
