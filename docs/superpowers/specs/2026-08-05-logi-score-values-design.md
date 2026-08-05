# Logi Score Values Documentation

## Goal

Turn the existing Logi Score item-value constant into a discoverable documentation page that matches the established Events documentation layout and makes the full value list easy to browse and search.

## Page Structure

- Use `BotDocsLayout` with the standard documentation header, breadcrumbs, and contents sidebar.
- Publish the page at `/bot-documentation/logi-score-values`.
- Add the page to the Bot Documentation feature index and sidebar navigation.
- Include an overview explaining crate size and score value.
- Render one navigable section and table per item category.

## Data Model

Store items in categorized groups as the single source of truth. Each item retains its existing `crateSize`, `autocomplete`, and `value` fields. Derive and export the current flat `FOXHOLE_ITEMS` record from those groups so future consumers can continue to perform direct item-name lookups without duplicating values.

Fuel and other liquid items share one `Liquids` category. Base vehicles, tanks, armored fighting vehicles, and logistics vehicles share one `Vehicles` category. Construction equipment and containers share one `Construction Equipment` category. Field weapons, ships, planes, and plane parts remain separate references.

## Search And Tables

- Provide a labelled search field that filters item names case-insensitively across every category.
- Show the current result count and a clear empty state when no items match.
- Hide categories with no matching items while a search is active.
- Each table contains Item, Crate size, and Score value columns.
- Display crate size `0` as `Not crateable` so the value is understandable without implementation knowledge.
- Preserve decimal score values exactly as authored.

## Presentation And Accessibility

- Reuse `docs-section` and `docs-table` styles from the Events documentation.
- Add only scoped search, result-summary, table-wrapper, and numeric-column rules.
- Keep the search field associated with a visible label.
- Use semantic sections, headings, tables, column headers, and a live result summary.
- Reflow table columns to fit narrow screens without horizontal scrolling or page-level overflow.

## Validation

- Confirm the route is absent before implementation and present afterward.
- Run `npm run type-check`, `npm run build`, and `git diff --check`.
- At desktop and mobile widths, verify page hierarchy, category navigation, search filtering, empty state, table columns, and absence of page-level horizontal overflow.
