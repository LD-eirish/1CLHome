# Logi Score Values Documentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a searchable, categorized Logi Score values reference page using the established bot documentation layout.

**Architecture:** Reshape the existing item constant into categorized groups and derive the flat `FOXHOLE_ITEMS` export from those groups. Render the groups through one React page with deferred client-side filtering, then register the page in routing and the documentation index.

**Tech Stack:** React 19, TypeScript 5.9, React Router 7, CSS, Vite

---

## File Structure

- Modify `src/presentation/pages/docs/LogiScoreValuesPage.tsx`: own categorized values, derive the flat export, and render the searchable documentation page.
- Modify `src/application/App.tsx`: register `/bot-documentation/logi-score-values`.
- Modify `src/presentation/pages/BotDocumentationPage.tsx`: link the page from the docs index and sidebar.
- Modify `src/presentation/styles/documentation.css`: add scoped search and responsive table-wrapper styles.

### Task 1: Establish The Missing-Page Behavior Check

- [ ] **Step 1: Verify the route is currently absent**

Navigate to `/bot-documentation/logi-score-values` in the running app.

Expected before implementation: the catch-all route redirects to `/hub`, so no `Logi Score Values` heading or search input is present.

### Task 2: Build The Categorized Searchable Page

**Files:**
- Modify: `src/presentation/pages/docs/LogiScoreValuesPage.tsx`
- Modify: `src/presentation/styles/documentation.css`

- [ ] **Step 1: Define the typed category model**

Define `FoxholeItem`, `FoxholeItemCategory`, and `FOXHOLE_ITEM_CATEGORIES`. Move each existing item into the category named by its current source comment. Derive the compatibility export with:

```ts
export const FOXHOLE_ITEMS: Readonly<Record<string, FoxholeItem>> = Object.fromEntries(
  FOXHOLE_ITEM_CATEGORIES.flatMap((category) => Object.entries(category.items)),
);
```

- [ ] **Step 2: Render the docs layout and filtering behavior**

Use `useState` and `useDeferredValue` for the query. Normalize with `trim().toLocaleLowerCase()`, filter item names, omit empty groups, and render `BotDocsLayout` with overview, search, result summary, grouped sections, semantic tables, and an empty state.

- [ ] **Step 3: Add scoped responsive styles**

Add `.docs-filter`, `.docs-filter-label`, `.docs-filter-input`, `.docs-filter-summary`, `.docs-table-scroll`, and numeric-cell rules. The wrapper uses `overflow-x: auto`; the input uses the existing editorial border/background tokens and a visible `:focus-visible` state.

- [ ] **Step 4: Run the focused compiler check**

Run: `npm run type-check`

Expected: exit code 0 with no TypeScript diagnostics.

### Task 3: Register And Expose The Documentation Page

**Files:**
- Modify: `src/application/App.tsx`
- Modify: `src/presentation/pages/BotDocumentationPage.tsx`

- [ ] **Step 1: Register the route**

Import `LogiScoreValuesPage` and add:

```tsx
<Route path="/bot-documentation/logi-score-values" element={<LogiScoreValuesPage />} />
```

- [ ] **Step 2: Add the docs index entry**

Add a documented feature row with the same route and a summary describing crate sizes and scoring values. Add the route to the `BotDocsLayout` navigation items.

- [ ] **Step 3: Verify the route behavior turns green**

Navigate to `/bot-documentation/logi-score-values`.

Expected: the page remains on that route, renders one `h1` named `Logi Score Values`, and exposes the labelled search input.

### Task 4: Validate Search, Tables, And Responsive Layout

- [ ] **Step 1: Verify desktop behavior**

At `1440x1000`, verify category links target existing section IDs, all three table headers are present, searching `torpedo` shows only matching rows/categories, clearing restores all rows, and an impossible query shows the empty state.

- [ ] **Step 2: Verify mobile behavior**

At `375x812`, repeat the search check and verify `document.documentElement.scrollWidth === document.documentElement.clientWidth` while tables remain accessible through their scroll wrappers.

- [ ] **Step 3: Run final static validation**

Run:

```powershell
npm run type-check
npm run build
git diff --check
```

Expected: all commands exit with code 0. The existing Vite mixed-import warning for `asset.utils.ts` may remain because it is unrelated to this page.
