# Heading Color and Regiment Modal Refresh

## Goal

Restore deliberate color hierarchy to redesigned pages and bring regiment detail dialogs into the same restrained editorial system.

## Approved Direction

Use a mixed editorial hierarchy:

- Page titles and regiment names use `var(--gold)`.
- Section headings use `var(--khaki)`.
- Subheadings and compact metadata labels use a neutral green-gray derived from the existing muted palette.
- Body copy remains the existing soft off-white/muted color for sustained readability.

This hierarchy applies to shared editorial pages, wiki articles, bot documentation, Framework content, collection/index pages, and regiment dialogs. It must not make every heading gold or restore the previous gold-heavy card treatment.

## Heading Scope

Update existing shared selectors rather than adding page-specific JSX classes:

- `.editorial-title` uses gold.
- Major wiki and documentation page titles use gold.
- Wiki, documentation, Framework, directory, and modal section headings use khaki.
- Lower-level headings and detail labels use the neutral secondary heading color.
- Existing kicker, body, metadata, and link colors remain distinct from heading colors.

The Hub retains its current composition and only inherits shared typography changes where already intended.

## Regiment Dialog

Keep the existing native `dialog`, data, images, close behavior, tags, metadata, and Discord action. Restyle only its presentation:

- Use a flat editorial surface with a restrained background and subtle border.
- Remove heavy gradients and prominent card shadows.
- Use Jost throughout.
- Render the regiment title in gold and section headings in khaki.
- Separate content regions with subtle editorial rules rather than nested cards.
- Present definition-list metadata as compact rows with neutral labels and readable values.
- Keep the close control visible, keyboard accessible, and visually consistent with the editorial controls.
- Preserve responsive stacking and prevent overflow at 375px.

## Accessibility and Responsive Requirements

- Heading colors must retain readable contrast on the existing dark background.
- Focus indicators remain visible for the close button and interactive actions.
- The dialog remains labelled by its title and retains native modal focus management.
- At 375px, dialog content, metadata, tags, and actions fit without horizontal overflow.
- Reduced-motion behavior remains unchanged.

## Validation

- Run `npm run type-check` and `npm run build`.
- Check representative editorial, wiki, documentation, Framework, and collection headings at 1440px and 375px.
- Open regiment dialogs from Central and Associate Group pages at both widths.
- Verify title/section/subheading hierarchy, dialog close controls, native focus placement, and horizontal overflow.
