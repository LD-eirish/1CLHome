# Editorial Subpages Redesign

## Goal

Redesign every non-hub page to use a restrained editorial visual system inspired by the Siege Camp privacy page while preserving the existing 1CL content, routes, interactions, accessibility behavior, and responsive support. Replace the Central Group regiment card grid with a numbered roster that feels authored and specific to the organization.

The Hub page retains its current composition. Jost becomes the site-wide typeface so shared navigation and transitions remain consistent.

## Visual Foundation

- Use Jost in weights 300, 400, 500, 600, and 700 as the open-source substitute for Siege Camp's custom Renner family.
- Use near-black and charcoal page backgrounds, off-white primary text, cool gray secondary text, and desaturated green-gray rules.
- Reserve existing gold for rare brand or state accents rather than routine headings, borders, or decoration.
- Remove heavy gradients, elevated page-section cards, prominent shadows, excessive borders, and decorative rounded corners from reading surfaces.
- Use uppercase kickers, medium-weight page titles, short horizontal divider rules, narrow reading measures, and generous vertical rhythm.
- Keep controls and focus indicators clearly distinguishable and compliant with accessible contrast requirements.

## Shared Page Structure

All non-hub pages continue using the existing Header, PageBreadcrumb, and Footer components. Shared CSS primitives provide a consistent editorial title block, content measure, section rhythm, dividers, links, and metadata treatment.

The redesign minimizes page-specific styling. Introduce one shared editorial page shell for repeated Header, breadcrumb, title, and content-shell markup while preserving page behavior.

## Page Categories

### Reading Pages

Privacy, Terms, and Framework use a centered editorial document shell. The main prose measure is capped at 720 pixels on desktop. Sections are unframed and separated by whitespace or subtle rules rather than cards.

### Wiki and Bot Documentation

Wiki articles and bot documentation retain their table of contents because it supports long-document navigation. On desktop, the contents appear as a quiet text rail beside the editorial reading column. On narrow viewports, the contents move above the article and remain keyboard accessible.

### Index and Collection Pages

Info Library, Newspaper, Associate Group, and other collection views retain the information architecture and interactions needed to browse multiple items. Repeated content uses flat rows or restrained tiles with square corners, subtle separators, and minimal decoration. Existing responsive behavior and links remain intact.

## Central Group Numbered Roster

Replace the Central Group regiment card grid with the approved numbered roster design.

Each regiment is presented as a full-width horizontal band containing:

- Its 1CL roster number or stable display order
- Regiment name and abbreviation
- Leader
- Peak activity time
- Specialization tags
- Inactive status when applicable

The regiment logo is not the primary visual element in the roster. Selecting an active roster band opens the existing RegimentModal with complete details and Discord access. The row uses semantic interactive markup, supports Enter and Space activation, exposes a descriptive accessible name, and has a visible focus state.

Inactive regiments remain visually distinct. Their row must not imply an available action when interaction is disabled. Existing modal behavior, close controls, and Discord link behavior remain unchanged.

On mobile, each roster band stacks metadata beneath the regiment name while retaining the number and full-width separator. It must not turn back into a floating card.

## Responsive Behavior

- Preserve existing desktop, tablet, and mobile breakpoints unless a local adjustment is required to prevent overflow.
- Keep prose readable without viewport-scaled font sizes.
- Collapse side rails above content on narrow screens.
- Ensure title blocks, breadcrumbs, roster metadata, tags, and controls wrap without overlap.
- Maintain stable dimensions for icons and controls.

## Accessibility

- Preserve semantic heading order and landmark structure.
- Use links for navigation and buttons only for actions such as opening a modal.
- Preserve visible keyboard focus and native keyboard activation.
- Maintain sufficient text, link, border, and state contrast.
- Keep breadcrumb and table-of-contents labels available to assistive technology.
- Avoid conveying active or inactive status through color alone.
- Respect reduced-motion preferences.

## Data and Error Handling

No data schema or route changes are required. Existing services remain responsible for loading framework, resolution, newspaper, and regiment data. Existing loading and error states remain functional and are restyled to match the editorial system.

The numbered roster derives numbering from the existing stable regiment order unless an explicit roster identifier is available in the data. No displayed number is persisted back to JSON.

## Validation

- Run the production build and TypeScript compilation.
- Check editor diagnostics for touched files.
- Verify representative pages from every page category at desktop and mobile widths.
- Verify the Central Group roster opens active regiment modals by mouse and keyboard.
- Verify inactive rows, modal closing, and Discord links.
- Check for horizontal overflow, text overlap, missing focus states, and contrast regressions.
- Capture screenshots of the Hub, Central Group, a wiki article, bot documentation, Framework, Privacy, and an index page to confirm visual consistency and that the Hub composition remains intact.

## Out of Scope

- Rewriting page copy or changing data schemas
- Changing route structure beyond removing the stale resolution route for the intentionally deleted ResolutionViewPage
- Replacing the Hub composition
- Replacing existing modal content or data-loading services
- Copying Siege Camp assets or proprietary Renner font files
