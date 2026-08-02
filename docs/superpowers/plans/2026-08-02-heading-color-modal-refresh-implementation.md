# Heading Color and Regiment Modal Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved mixed gold/khaki heading hierarchy across redesigned pages and restyle regiment dialogs as flat editorial surfaces.

**Architecture:** Keep page markup and data flow unchanged. Update the shared heading selectors in `layout.css`, `library.css`, `documentation.css`, and scoped Framework/directory selectors in `components.css`; then consolidate the existing regiment-modal CSS in `components.css` around the current native dialog markup.

**Tech Stack:** React 19, TypeScript 5.9, CSS, Vite, Playwright browser validation

---

## File Structure

- Modify `src/presentation/styles/layout.css`: shared editorial title and prose heading hierarchy.
- Modify `src/presentation/styles/library.css`: wiki page, article, section, and category heading hierarchy.
- Modify `src/presentation/styles/documentation.css`: documentation page, sidebar, section, and Javadoc heading hierarchy.
- Modify `src/presentation/styles/components.css`: Framework/directory heading colors and regiment dialog presentation.
- Verify `src/presentation/components/RegimentModal.tsx`: preserve the existing native dialog lifecycle and accessible labelling; no markup change is expected.

### Task 1: Apply the Mixed Editorial Heading Hierarchy

**Files:**
- Modify: `src/presentation/styles/layout.css`
- Modify: `src/presentation/styles/library.css`
- Modify: `src/presentation/styles/documentation.css`
- Modify: `src/presentation/styles/components.css`

- [ ] **Step 1: Record the failing browser assertions**

At `1440x1000`, inspect `/privacy`, `/info-library/what-is-1cl`, `/bot-documentation/event-feature`, `/framework`, and `/central-group`. Assert the current computed colors fail the approved hierarchy:

```js
const title = getComputedStyle(document.querySelector('h1')).color;
const section = getComputedStyle(document.querySelector('main h2, main h3')).color;
return { title, section };
```

Expected before implementation: one or more representative title/section selectors resolve to the normal text color rather than the gold/khaki tokens.

- [ ] **Step 2: Update shared editorial heading colors**

In `layout.css`, apply:

```css
.editorial-title {
  color: var(--gold);
}

.editorial-prose h2 {
  color: var(--khaki);
}

.editorial-prose h3 {
  color: #b7bdaf;
}
```

Retain current sizing, spacing, and font weights.

- [ ] **Step 3: Update wiki heading colors**

In `library.css`, set page/article titles to gold, section headings to khaki, and lower-level headings to the neutral secondary color:

```css
.wiki-hub-title,
.wiki-article-title {
  color: var(--gold);
}

.wiki-category-name,
.wiki-section-heading {
  color: var(--khaki);
}

.wiki-section-subheading {
  color: #b7bdaf;
}
```

Keep links and body emphasis unchanged.

- [ ] **Step 4: Update documentation heading colors**

In `documentation.css`, use:

```css
.docs-page-title {
  color: var(--gold);
}

.docs-sidebar-title,
.docs-section h2,
.docs-javadoc-summary-block h2 {
  color: var(--khaki);
}

.docs-section h3 {
  color: #b7bdaf;
}
```

Do not recolor code, tables, links, callouts, or controls.

- [ ] **Step 5: Update Framework and directory headings**

In `components.css`, change the scoped Framework content heading and regiment directory heading without changing Hub styling:

```css
.framework-editorial-page .content.card > h3,
.regiment-directory-header h3,
.regiment-directory > h3 {
  color: var(--khaki);
}
```

- [ ] **Step 6: Verify the heading assertions pass**

Repeat the Step 1 browser checks at `1440x1000` and `375x812`.

Expected: page titles resolve to the gold token, section headings resolve to khaki, lower-level headings resolve to the neutral secondary heading color, and no route has horizontal overflow.

### Task 2: Restyle Regiment Dialogs as Editorial Surfaces

**Files:**
- Modify: `src/presentation/styles/components.css`
- Verify: `src/presentation/components/RegimentModal.tsx`

- [ ] **Step 1: Record the failing modal style assertions**

Open the first active regiment on `/central-group` and `/associate-group`, then evaluate:

```js
const modal = document.querySelector('.regiment-modal');
const details = document.querySelector('.regiment-modal .modal-details');
const title = document.querySelector('#regiment-modal-title');
return {
  shadow: getComputedStyle(modal).boxShadow,
  detailsBackground: getComputedStyle(details).backgroundColor,
  titleColor: getComputedStyle(title).color,
  overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
};
```

Expected before implementation: the dialog has the legacy prominent shadow and the metadata is a boxed dark panel.

- [ ] **Step 2: Flatten the modal surface**

Consolidate the existing modal rules in `components.css` so the active regiment dialog uses:

```css
.modal-content.regiment-modal {
  width: min(100%, 680px);
  background: #141813;
  border: 1px solid var(--editorial-line-strong);
  border-radius: 0;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.38);
  font-family: 'Jost', Helvetica, Arial, sans-serif;
}

.regiment-modal .modal-header {
  padding: 2rem 2rem 1.5rem;
  border-bottom: 1px solid var(--editorial-line);
}

.regiment-modal .modal-body {
  padding: 1.5rem 2rem 2rem;
}
```

The shadow is retained only as restrained dialog separation, not card elevation.

- [ ] **Step 3: Apply modal heading and metadata hierarchy**

Use:

```css
.regiment-modal #regiment-modal-title {
  color: var(--gold);
  font-weight: 500;
}

.regiment-modal .modal-section h3 {
  color: var(--khaki);
  font-weight: 500;
}

.regiment-modal .modal-details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem 1.5rem;
  margin-bottom: 1.5rem;
  padding: 0;
  background: none;
  border-radius: 0;
}

.regiment-modal .modal-details dt {
  color: #b7bdaf;
  letter-spacing: 0.1em;
}

.regiment-modal .modal-details dd {
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--editorial-line);
}
```

Preserve tags, extra logos, and Discord behavior.

- [ ] **Step 4: Normalize the close control and mobile dialog**

Apply a subtle editorial close control and responsive metadata stack:

```css
.regiment-modal .modal-close {
  color: var(--muted);
  border: 1px solid transparent;
}

.regiment-modal .modal-close:hover,
.regiment-modal .modal-close:focus-visible {
  color: var(--gold);
  border-color: var(--editorial-line-strong);
}

@media (max-width: 640px) {
  .modal-content.regiment-modal {
    width: 100%;
    max-height: calc(100dvh - 1rem);
  }

  .regiment-modal .modal-details {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Verify modal behavior and presentation**

At `1440x1000` and `375x812`, open a Central regiment and an Associate regiment. Verify:

- Native modal focus lands inside the dialog.
- The title is gold, section headings are khaki, and labels are neutral.
- Metadata has no boxed background and stacks on mobile.
- Close button works and has a visible focus style.
- Dialog, tags, logos, and Discord action do not overflow.

### Task 3: Static and Regression Validation

**Files:**
- Verify all modified files.

- [ ] **Step 1: Run type checking**

Run: `npm run type-check`

Expected: exit code 0 with no TypeScript errors.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: exit code 0. The existing `asset.utils.ts` mixed static/dynamic import warning may remain.

- [ ] **Step 3: Check patch integrity**

Run: `git diff --check`

Expected: exit code 0 with no output.

- [ ] **Step 4: Run representative route checks**

At `1440x1000` and `375x812`, inspect `/central-group`, `/associate-group`, `/privacy`, `/framework`, `/info-library/what-is-1cl`, and `/bot-documentation/event-feature`.

Expected: approved heading hierarchy, editorial regiment dialogs on both group pages, one meaningful `h1` per route, and no horizontal overflow.
