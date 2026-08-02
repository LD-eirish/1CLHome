# Editorial Subpages Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every non-hub page a Siege Camp-inspired editorial presentation using Jost, and replace the Central Group regiment card grid with a numbered roster.

**Architecture:** Establish shared design tokens and one `EditorialPageLayout` for prose-heavy pages, then adapt the existing wiki and documentation shells through their dedicated stylesheets. Add a focused `RegimentRosterItem` component for the Central Group rather than changing `RegimentCard`, preserving existing modal and collection-page behavior.

**Tech Stack:** React 19, TypeScript 5.9, React Router 7, Vite 7, CSS, existing JSON-backed data services.

**Validation note:** This repository has no automated test runner. Every task therefore uses `npm run type-check`, `npm run build`, editor diagnostics, and focused browser checks as executable gates. Do not create commits unless the user explicitly requests them.

---

### Task 1: Establish Jost And Editorial Tokens

**Files:**
- Modify: `src/presentation/styles/base.css`
- Modify: `src/presentation/styles/layout.css`
- Verify: `src/presentation/pages/HubPage.tsx`

- [ ] **Step 1: Record the pre-change typography check**

Run the development server with `npm run dev -- --host 127.0.0.1`, open `/privacy`, and inspect `document.body` and the first heading. Expected before implementation: body resolves to Segoe UI/system font and headings resolve to Rajdhani.

- [ ] **Step 2: Replace the font import and define editorial tokens**

Update the beginning of `base.css` to load Jost and add these variables without removing existing compatibility tokens:

```css
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap');

:root{
  --bg-1:#090b09;
  --bg-2:#111411;
  --card:#111411;
  --text:#e6e7e2;
  --muted:#999d96;
  --editorial-line:#353a34;
  --editorial-line-strong:#596057;
  --editorial-measure:720px;
  --editorial-wide:1180px;
  /* Preserve the existing olive, khaki, gold, danger, and scrollbar tokens. */
}
```

Set all body and heading typography to Jost:

```css
html,body{
  font-family:'Jost',Helvetica,Arial,sans-serif;
  background:linear-gradient(180deg,var(--bg-1) 0%,var(--bg-2) 100%);
  color:var(--text);
  font-weight:300;
  line-height:1.7;
}

h1,h2,h3,h4,h5,h6{
  font-family:'Jost',Helvetica,Arial,sans-serif;
  font-weight:500;
  line-height:1.2;
  letter-spacing:0;
}
```

- [ ] **Step 3: Add shared editorial primitives**

Add the following focused classes to `layout.css`:

```css
.editorial-page{
  width:100%;
  padding:3.5rem 1.5rem 6rem;
}

.editorial-page-shell{
  width:min(100%,var(--editorial-wide));
  margin:0 auto;
}

.editorial-title-block{
  width:min(100%,var(--editorial-measure));
  margin-bottom:3.25rem;
}

.editorial-kicker{
  margin:0 0 0.75rem;
  color:var(--muted);
  font-size:0.72rem;
  font-weight:500;
  letter-spacing:0.16em;
  text-transform:uppercase;
}

.editorial-title{
  margin:0;
  color:var(--text);
  font-size:clamp(2rem,4vw,3.4rem);
  font-weight:500;
}

.editorial-lead{
  margin:1.25rem 0 0;
  color:var(--muted);
  font-size:1.08rem;
  font-weight:300;
  line-height:1.7;
}

.editorial-divider{
  width:7.5rem;
  height:2px;
  margin:2rem 0 0;
  border:0;
  background:var(--editorial-line-strong);
}

.editorial-content-measure{
  width:min(100%,var(--editorial-measure));
}
```

- [ ] **Step 4: Validate typography and Hub stability**

Run:

```powershell
npm run type-check
npm run build
```

Expected: both commands exit with code 0. In the browser, verify `/privacy` resolves body and headings to Jost. Verify `/hub` keeps its existing background, masthead composition, Discord link, and responsive layout; only typography changes.

---

### Task 2: Create The Shared Reading Page Layout

**Files:**
- Create: `src/presentation/components/EditorialPageLayout.tsx`
- Modify: `src/presentation/pages/PrivacyPolicyPage.tsx`
- Modify: `src/presentation/pages/TermsOfServicePage.tsx`
- Modify: `src/presentation/pages/FrameworkPage.tsx`
- Modify: `src/presentation/styles/layout.css`
- Modify: `src/presentation/styles/components.css`

- [ ] **Step 1: Capture current reading-page structure**

Open `/privacy`, `/terms`, and `/framework`. Expected before implementation: Privacy and Terms render inside `.card`; Framework uses `.hero.card`; prose width follows the generic 1080px container rather than a 720px measure.

- [ ] **Step 2: Create `EditorialPageLayout`**

Create the component with this public interface and markup:

```tsx
import type { ReactNode } from 'react';
import { Header } from './Header';
import { PageBreadcrumb } from './PageBreadcrumb';

interface EditorialPageLayoutProps {
  readonly subtitle: string;
  readonly kicker: string;
  readonly title: string;
  readonly lead?: string;
  readonly meta?: ReactNode;
  readonly breadcrumbs: ReadonlyArray<{ label: string; to?: string }>;
  readonly children: ReactNode;
  readonly className?: string;
}

export function EditorialPageLayout({
  subtitle,
  kicker,
  title,
  lead,
  meta,
  breadcrumbs,
  children,
  className = '',
}: Readonly<EditorialPageLayoutProps>) {
  return (
    <>
      <Header subtitle={subtitle} />
      <PageBreadcrumb items={[...breadcrumbs]} />
      <main className={`editorial-page ${className}`.trim()}>
        <div className="editorial-page-shell">
          <header className="editorial-title-block">
            <p className="editorial-kicker">{kicker}</p>
            <h1 className="editorial-title">{title}</h1>
            {lead && <p className="editorial-lead">{lead}</p>}
            {meta && <div className="editorial-meta">{meta}</div>}
            <hr className="editorial-divider" />
          </header>
          <article className="editorial-content-measure editorial-prose">
            {children}
          </article>
        </div>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Add prose rules**

Add to `layout.css`:

```css
.editorial-meta{
  margin-top:1rem;
  color:var(--muted);
  font-size:0.85rem;
}

.editorial-prose h2,
.editorial-prose h3{
  margin:2.75rem 0 1rem;
  color:var(--text);
}

.editorial-prose p,
.editorial-prose li{
  color:#c5c7c1;
}

.editorial-prose ul,
.editorial-prose ol{
  margin:0 0 1.5rem;
  padding-left:1.4rem;
}

.editorial-prose a{
  color:var(--text);
  text-decoration-color:var(--editorial-line-strong);
  text-underline-offset:0.2em;
}

.editorial-prose a:hover{
  color:#fff;
  text-decoration-color:currentColor;
}
```

- [ ] **Step 4: Migrate Privacy and Terms**

Replace each page's direct `Header`, `PageBreadcrumb`, `.container`, and `.card` shell with `EditorialPageLayout`. Keep all existing policy content unchanged. Use:

```tsx
<EditorialPageLayout
  subtitle="Privacy Policy"
  kicker="Official document"
  title="1CL Bot Privacy Policy"
  meta={<><strong>Effective date:</strong> May 28, 2026</>}
  breadcrumbs={[{ label: 'Hub', to: '/hub' }, { label: 'Privacy Policy' }]}
>
  {/* Existing policy sections, without the duplicate page title/effective-date elements. */}
</EditorialPageLayout>
```

Apply the equivalent Terms title, date, and breadcrumbs in `TermsOfServicePage.tsx`.

- [ ] **Step 5: Migrate Framework**

Wrap loading, error, and rendered content in `EditorialPageLayout`. Preserve `TableOfContents`, `dangerouslySetInnerHTML`, framework export behavior, and all data calls. Framework uses:

```tsx
<EditorialPageLayout
  subtitle="Official command & operations framework"
  kicker="Governance"
  title="Official Framework"
  lead="Command structure, operational guidelines, and organization of the 1st Combined Legion."
  breadcrumbs={[{ label: 'Hub', to: '/hub' }, { label: 'Framework' }]}
  className="framework-editorial-page"
>
  {loading && <div className="loading">Loading framework...</div>}
  {error && <p className="error">{error}</p>}
  {!loading && !error && <div id="framework-content" dangerouslySetInnerHTML={{ __html: content }} />}
</EditorialPageLayout>
```

Place `TableOfContents` where it remains associated with `framework-content`. Remove the old `.hero.card` markup and page-level card wrappers, but do not alter renderer output or service behavior in this task.

- [ ] **Step 6: Validate all reading states**

Run `npm run type-check` and `npm run build`. Expected: exit code 0. Browser-check loading, success, and error styling; verify a 720px maximum prose measure, one page-level `h1`, and functional Framework contents navigation.

---

### Task 3: Restyle Wiki And Documentation Shells

**Files:**
- Modify: `src/presentation/styles/library.css`
- Modify: `src/presentation/styles/documentation.css`
- Verify: `src/presentation/components/WikiArticleLayout.tsx`
- Verify: `src/presentation/components/BotDocsLayout.tsx`

- [ ] **Step 1: Capture the existing shell behavior**

Open one wiki article and one bot documentation feature at desktop and mobile widths. Expected before implementation: two-column desktop layouts already collapse at 960px, but use stronger panels, gold decoration, Rajdhani overrides, and card-like surfaces.

- [ ] **Step 2: Flatten the wiki shell**

Keep the existing markup and replace the principal shell treatment in `library.css` with these values, merging them into the existing selectors rather than duplicating selectors:

```css
.wiki-page{
  width:100%;
  padding:3.5rem 1.5rem 6rem;
}

.wiki-page-shell{
  display:grid;
  grid-template-columns:220px minmax(0,var(--editorial-measure));
  gap:clamp(2.5rem,6vw,6rem);
  width:min(100%,var(--editorial-wide));
  margin:0 auto;
  background:none;
  border:0;
  box-shadow:none;
}

.wiki-sidebar{
  border-right:1px solid var(--editorial-line);
  padding-right:1.5rem;
}

.wiki-content{
  min-width:0;
}

.wiki-article-title{
  color:var(--text);
  font-family:'Jost',Helvetica,Arial,sans-serif;
  font-weight:500;
  letter-spacing:0;
}
```

Reduce hover movement to color/underline changes only. Keep numbered TOC semantics and existing IDs.

- [ ] **Step 3: Flatten the documentation shell**

Merge these values into the existing documentation selectors:

```css
.docs-page{
  width:100%;
  padding:3.5rem 1.5rem 6rem;
}

.docs-page-shell{
  display:grid;
  grid-template-columns:260px minmax(0,var(--editorial-measure));
  gap:clamp(2.5rem,6vw,6rem);
  width:min(100%,var(--editorial-wide));
  margin:0 auto;
  background:none;
  border:0;
  box-shadow:none;
}

.docs-sidebar{
  border-right:1px solid var(--editorial-line);
  padding-right:1.5rem;
}

.docs-page-title{
  color:var(--text);
  font-family:'Jost',Helvetica,Arial,sans-serif;
  font-weight:500;
  letter-spacing:0;
}
```

Remove remaining Rajdhani declarations and decorative gold gradients from `library.css` and `documentation.css`. Preserve code blocks, callouts, tables, and feature-specific controls.

- [ ] **Step 4: Preserve mobile navigation and focus behavior**

At the existing 960px breakpoint, set both page shells to one column, remove the sidebar right border, and add a bottom separator. Ensure TOC links retain the existing visible focus outline.

- [ ] **Step 5: Validate wiki and docs pages**

Run `npm run type-check` and `npm run build`. At 1440px and 375px widths, verify no horizontal overflow, the TOC precedes article content on mobile, anchor links scroll to their headings, and interactive documentation controls still work.

---

### Task 4: Replace Central Group Cards With A Numbered Roster

**Files:**
- Create: `src/presentation/components/RegimentRosterItem.tsx`
- Modify: `src/presentation/pages/CentralGroupPage.tsx`
- Modify: `src/presentation/styles/components.css`
- Verify unchanged: `src/presentation/components/RegimentModal.tsx`
- Verify unchanged: `src/presentation/components/RegimentCard.tsx`

- [ ] **Step 1: Capture the current card-grid behavior**

Open `/central-group`. Verify active cards open `RegimentModal`, inactive cards do not provide Discord access, and the modal closes with its close control and Escape. Record that `.regiment-grid` uses repeated cards before implementation.

- [ ] **Step 2: Create the focused roster item component**

Create `RegimentRosterItem.tsx`:

```tsx
import { memo } from 'react';
import type { Regiment } from '../../data/types/regiment.types';
import { formatActivityTime } from '../../infrastructure/utils/path.utils';

interface RegimentRosterItemProps {
  readonly regiment: Regiment;
  readonly index: number;
  readonly onSelect: (regiment: Regiment) => void;
}

function RegimentRosterItemComponent({ regiment, index, onSelect }: Readonly<RegimentRosterItemProps>) {
  const isInactive = Boolean(regiment.inactive);
  const tags = regiment.tags?.filter((tag) => tag.trim() !== '') ?? [];

  return (
    <button
      type="button"
      className={`regiment-roster-item${isInactive ? ' regiment-roster-item--inactive' : ''}`}
      onClick={() => onSelect(regiment)}
      disabled={isInactive}
      aria-label={isInactive ? `${regiment.name}, inactive` : `View details for ${regiment.name}`}
    >
      <span className="regiment-roster-number" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="regiment-roster-copy">
        <span className="regiment-roster-heading">
          <span className="regiment-roster-name">{regiment.name}</span>
          <span className="regiment-roster-abbreviation">{regiment.abbreviation}</span>
          {isInactive && <span className="regiment-roster-status">Inactive</span>}
        </span>
        <span className="regiment-roster-meta">
          <span>Led by {regiment.leader ?? 'TBD'}</span>
          {regiment.activityTime && <span>Peak {formatActivityTime(regiment.activityTime, false)}</span>}
        </span>
        {tags.length > 0 && (
          <span className="regiment-roster-tags">
            {tags.map((tag) => <span key={tag}>{tag}</span>)}
          </span>
        )}
      </span>
    </button>
  );
}

export const RegimentRosterItem = memo(RegimentRosterItemComponent);
```

- [ ] **Step 3: Replace the Central Group card map**

In `CentralGroupPage.tsx`, replace the `RegimentCard` import with `RegimentRosterItem`, change the list wrapper to `className="regiment-roster"`, and render:

```tsx
{!loading && !error && regiments.map((regiment, index) => (
  <RegimentRosterItem
    key={regiment.abbreviation}
    regiment={regiment}
    index={index}
    onSelect={setSelectedRegiment}
  />
))}
```

Replace the surrounding card section with an unframed `section` carrying `className="regiment-directory"` and a visible heading/count. Keep `RegimentModal` usage unchanged.

- [ ] **Step 4: Add the numbered roster CSS**

Add to `components.css`:

```css
.regiment-directory{
  margin-top:4rem;
}

.regiment-roster{
  border-top:1px solid var(--editorial-line);
}

.regiment-roster-item{
  all:unset;
  box-sizing:border-box;
  display:grid;
  grid-template-columns:3rem minmax(0,1fr);
  gap:1rem;
  width:100%;
  padding:1.5rem 0;
  border-bottom:1px solid var(--editorial-line);
  color:var(--text);
  cursor:pointer;
}

.regiment-roster-item:hover{
  background:rgba(255,255,255,0.018);
}

.regiment-roster-item:focus-visible{
  outline:2px solid var(--editorial-line-strong);
  outline-offset:4px;
}

.regiment-roster-number{
  color:#777d75;
  font-size:0.78rem;
  letter-spacing:0.12em;
}

.regiment-roster-copy,
.regiment-roster-heading,
.regiment-roster-meta,
.regiment-roster-tags{
  display:flex;
}

.regiment-roster-copy{
  min-width:0;
  flex-direction:column;
  gap:0.55rem;
}

.regiment-roster-heading{
  align-items:baseline;
  gap:0.75rem;
  flex-wrap:wrap;
}

.regiment-roster-name{
  font-size:1.15rem;
  font-weight:500;
}

.regiment-roster-abbreviation,
.regiment-roster-meta{
  color:var(--muted);
  font-size:0.82rem;
}

.regiment-roster-meta,
.regiment-roster-tags{
  gap:1rem;
  flex-wrap:wrap;
}

.regiment-roster-tags span{
  color:#b5b8b1;
  font-size:0.72rem;
  border-bottom:1px solid var(--editorial-line-strong);
}

.regiment-roster-status{
  color:var(--muted);
  font-size:0.72rem;
  font-weight:500;
  letter-spacing:0.12em;
  text-transform:uppercase;
}

.regiment-roster-item--inactive{
  cursor:not-allowed;
  opacity:0.52;
}
```

- [ ] **Step 5: Add the mobile roster treatment**

At `max-width:640px`, preserve the band rather than creating cards:

```css
.regiment-roster-item{
  grid-template-columns:2rem minmax(0,1fr);
  gap:0.75rem;
  padding:1.25rem 0;
}

.regiment-roster-meta{
  flex-direction:column;
  gap:0.2rem;
}
```

- [ ] **Step 6: Validate roster behavior**

Run `npm run type-check` and `npm run build`. Verify active roster rows open the correct modal by pointer, Enter, and Space. Verify disabled rows cannot open a modal, include visible “Inactive” text, and do not expose Discord access. Verify modal Escape/close and Discord links still work. Check 1440px, 768px, and 375px widths for wrapping and overflow.

---

### Task 5: Flatten Collection And Index Pages

**Files:**
- Modify: `src/presentation/styles/components.css`
- Modify: `src/presentation/styles/library.css`
- Modify: `src/presentation/pages/InfoLibraryPage.tsx`
- Modify: `src/presentation/pages/NewspaperPage.tsx`
- Modify: `src/presentation/pages/AssociateGroupPage.tsx`

- [ ] **Step 1: Capture representative collection pages**

Open `/info-library`, `/newspaper`, and `/associate-group`. Expected before implementation: repeated elevated cards, visible gradients/shadows, and hover movement are present.

- [ ] **Step 2: Apply one restrained collection pattern**

Merge the following treatment into the existing collection selectors rather than adding a parallel card system:

```css
.wiki-category-block,
.wiki-article-card,
.newspaper-clipping,
.associate-regiment-list .regiment-card{
  background:none;
  border:0;
  border-bottom:1px solid var(--editorial-line);
  border-radius:0;
  box-shadow:none;
}

.wiki-article-card:hover,
.newspaper-clipping:hover,
.associate-regiment-list .regiment-card:hover{
  transform:none;
  box-shadow:none;
  border-color:var(--editorial-line-strong);
}
```

Add `collection-page` to the main content element on all three pages and add `associate-regiment-list` beside `regiment-grid` in `AssociateGroupPage.tsx`. Keep images, metadata, links, pagination, filters, and article-opening behavior. Do not flatten `RegimentModal`, actual buttons, callouts, code blocks, or controls that need a bounded surface.

- [ ] **Step 3: Normalize collection title blocks**

Replace `.hero.card`/`.page-intro` decoration on these pages with the shared kicker/title/lead hierarchy. Reuse `.editorial-kicker`, `.editorial-title`, and `.editorial-lead` inside a page intro wrapper capped at `var(--editorial-measure)`. Remove decorative logo columns where they only duplicate the header brand; retain content-relevant newspaper imagery.

- [ ] **Step 4: Validate collection interactions**

Run `npm run type-check` and `npm run build`. Verify Info Library links navigate correctly, newspaper controls still work, Associate Group Discord links remain keyboard accessible, and hover/focus states do not move layout.

---

### Task 6: Accessibility, Responsive, And Visual Regression Pass

**Files:**
- Verify: `src/presentation/styles/accessibility.css`
- Verify: `src/presentation/styles/layout.css`
- Verify: `src/presentation/styles/components.css`
- Verify: `src/presentation/styles/documentation.css`
- Verify: `src/presentation/styles/library.css`

- [ ] **Step 1: Run static validation**

Run:

```powershell
npm run type-check
npm run build
```

Expected: both exit with code 0. Check editor diagnostics for every touched TSX and CSS file; expected: no new errors.

- [ ] **Step 2: Start the final browser validation server**

Run `npm run dev -- --host 127.0.0.1`. Use the printed local URL for all checks.

- [ ] **Step 3: Validate representative desktop pages**

At 1440x1000, inspect and capture screenshots for:

- `/hub`
- `/central-group`
- `/info-library/what-is-1cl`
- `/bot-documentation/event-feature`
- `/framework`
- `/privacy`
- `/info-library`

Expected: Hub composition is unchanged; every other page uses Jost and the approved Option A hierarchy; prose is capped at 720px; side rails are quiet and unframed; Central Group uses numbered bands; collection views do not look like floating card grids.

- [ ] **Step 4: Validate mobile pages**

At 375x812, repeat the representative routes. Expected: no horizontal overflow or text overlap, title text fits, TOCs precede content, roster metadata stacks within full-width bands, and navigation remains usable.

- [ ] **Step 5: Validate keyboard and semantic behavior**

Tab through the header, breadcrumbs, TOCs, roster, modal, collection links, and footer. Expected: logical focus order, visible focus, links for navigation, buttons for modal actions, Enter/Space activation, Escape closes the modal, and inactive status is communicated by text as well as appearance.

- [ ] **Step 6: Validate motion and contrast**

Enable reduced motion and verify decorative transitions/animations are removed or reduced. Inspect primary text, secondary text, links, focus outlines, divider lines, and inactive states against their backgrounds. If a check fails, return to the task that owns that selector, repair it there, rerun that task's focused validation, and then restart this final pass.

- [ ] **Step 7: Stop the development server and report evidence**

Stop the server after validation. Report the exact build/type-check results, representative browser routes checked, viewport sizes, and any residual warning that does not affect this redesign.
