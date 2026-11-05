# Accessibility reference — WCAG 2.2, target Level AA

Each line is tagged for who it is for: `[design]`, `[dev]` or `[qa]`. In a code review, `[dev]` lines are checked
against the code; `[design]` and `[qa]` lines are checked as far as the code shows them and otherwise listed for a
person to verify (see `SKILL.md`).

The per-component deltas are a worked example of the depth and format expected, not an exhaustive list: for anything
not listed, generalize from its closest WAI-ARIA Authoring Practices Guide (APG) pattern in the same shape.

## Baseline — every interactive element, regardless of component type

- [design] Visible focus state, never removed; hover-only feedback is not enough.
- [design] Hit target >=24x24 CSS px (44x44 preferred for touch).
- [design] State (error, selected, disabled) never conveyed by color alone.
- [design] Error message copy and helper text are specified in the design — what triggers them, the exact wording, and
  where they sit relative to the field — not left for dev to invent.
- [design] Text contrast >=4.5:1, UI components/icons >=3:1.
- [design] Contrast and focus-indicator color hold at the required ratio in both light and dark theme, when the
  component supports both — not verified in light mode only.
- [dev] Real semantic element or correct ARIA role — not a styled `<div>`. Prefer the native element (button, select,
  dialog, details) over an ARIA role; reach for ARIA only when native HTML cannot express the control.
- [dev] Accessible name present: visible text, `aria-label`, or `aria-labelledby`.
- [dev] Keyboard-operable per native semantics (Tab/Enter/Space/Escape as applicable).
- [dev] No keyboard trap: Tab and Shift+Tab always move on to the next/previous element; anything that captures focus (a
  custom widget, an embed) gives it back.
- [dev] Selected, focus and error state are never expressed by background-color or box-shadow alone — pair with a border
  or outline that survives forced-colors mode (Windows High Contrast Mode strips custom backgrounds).
- [dev] `aria-expanded` / `aria-selected` / `aria-checked` reflect real component state.
- [dev] Loading/busy state sets `aria-busy="true"` and/or an `aria-live` region announces it — never a silent,
  visual-only spinner.
- [dev] Animation or transition respects `prefers-reduced-motion: reduce` — shortened or removed, never forced.
- [dev] A focused element is never fully hidden behind a sticky header, footer, or overlapping panel (scroll-margin or
  equivalent).
- [dev] No positive `tabIndex`.
- [qa] Tab through with keyboard only — confirm visible focus, logical order, and that focus never gets stuck past the
  component.
- [qa] Run a screen reader — confirm name + role + state are announced, including a loading state.
- [qa] Measure contrast ratios with a tool (browser DevTools, axe, WebAIM) against the ratios design specified — do not
  eyeball it.
- [qa] If the product ships a dark theme, repeat the contrast and state checks in it.
- [qa] Enable forced-colors / Windows High Contrast Mode and confirm every state and focus indicator is still visible.
- [qa] Enable prefers-reduced-motion and confirm animation is reduced or removed.
- [qa] Test at 200% zoom / text resize.

## Per-component deltas — only what is extra beyond baseline

### Icon-only button

- [dev] `aria-label` names the action; icon itself `aria-hidden="true"`.

### Modal / dialog

- [dev] `role="dialog"` + `aria-modal="true"` + `aria-labelledby` pointing at the title (a native `<dialog>` opened with
  `showModal()` supplies the role and modality itself).
- [dev] Focus moves in on open, traps while open, returns to trigger on close.
- [dev] Escape closes it.

### Dropdown / select / combobox

- [dev] Trigger: `aria-haspopup="listbox"` + `aria-expanded`.
- [dev] Options: `role="option"` + `aria-selected` on the selected one(s).
- [dev] Down opens + moves to first item; Up/Down move through options; Enter selects; Escape closes and returns focus
  to the trigger.

### Tabs

- [dev] Container `role="tablist"`; each tab `role="tab"` + `aria-selected`.
- [dev] Panel `role="tabpanel"` linked to its tab via `aria-controls`/`aria-labelledby`.
- [dev] Arrow keys move focus between tabs.

### Form field

- [dev] Label associated via `htmlFor` or wrapping `<label>` — not placeholder-only.
- [dev] Error state sets `aria-invalid="true"` + `aria-describedby` pointing at the error message's id.
- [design] Information already entered earlier in the same flow (e.g. billing address) is reused or offered for reuse,
  not re-collected from scratch — unless re-entry is a deliberate security re-confirmation.

### Login / sign-in form

- [dev] Password fields accept paste and browser/password-manager autofill (`autocomplete="current-password"` /
  `"new-password"`) — never blocked.
- [design] A passwordless alternative (passkey, SSO, or an emailed/texted login link) is offered alongside any cognitive
  test — a remembered password, a puzzle, a security question — that gates sign-in.

### Data table

- [dev] `<th>` with `scope="col"`/`"row"`.
- [dev] `<caption>` when the table's purpose is not obvious from surrounding text.
- [dev] Complex multi-level headers use `headers`/`id` linking.

### Toast / inline status

- [dev] `role="status"` (polite) for routine confirmations.
- [dev] `role="alert"` (assertive) only for errors needing immediate attention — never on frequently-updating content.

### Drag-and-drop reorder

- [dev] A non-drag alternative exists (move up/down buttons or keyboard reorder).

### Tooltip

- [dev] Accessible via `aria-describedby`; dismissible with Escape; never traps focus.

### Image

- [dev] Informative image has a real `alt` attribute describing its content or purpose — never the filename, never left
  empty.
- [dev] Purely decorative image uses `alt=""` (or `role="presentation"`) so a screen reader skips it.
- [dev] An image that is itself a control (wrapped in a link or a button) has alt text describing the destination or
  action — "Go to homepage", not "Company logo" — never both at once.
- [design] A complex image (chart, infographic) has its data or meaning available as text nearby — a caption, a table,
  or a linked long description — not only inside the image.

### Video / audio

- [dev] Prerecorded video with audio has synchronized captions, covering dialogue and important non-speech sound.
- [dev] Audio-only content (a podcast, a voice note) has a text transcript alongside it.
- [design] Prerecorded video's visual-only information (an action, a setting change not covered by the dialogue) is
  described — an audio-description track, or folded into the transcript/caption track — not left to sight alone.
- [dev] Player controls (play/pause, volume, seek, captions toggle) are real buttons or sliders, each with an accessible
  name, and fully keyboard-operable.
- [dev] Nothing autoplays with sound; if it must, a control to pause, stop, or mute it is available immediately, not
  buried in a menu.
