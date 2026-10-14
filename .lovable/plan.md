# Queen’s Beauty Parlour multi-page update

## Scope
Preserve the current brand, visual styling, working enquiry flow, exact 13-service catalogue, confirmed WhatsApp destination, and stated business hours. Replace section-only navigation with the requested seven real pages: Home, Services, Makeup Looks, Gallery, About, Book Appointment, and Contact.

## Steps
1. Extract the existing shared header, footer, booking/contact elements, and presentation data into reusable browser-safe components while preserving current styles and functionality.
2. Add six typed TanStack routes with unique page metadata; build each from existing content and the requested business facts, and make navigation and calls to action use real page links.
3. Add a preselected-service booking link flow, retaining native required/phone validation and correctly encoded WhatsApp enquiry behavior.
4. Use distinct temporary inspiration imagery for service cards, makeup-look categories, and gallery entries; clearly label imagery as illustrative, never client work.
5. Add focused tests for route coverage and enquiry/catalogue invariants; run the suite and verify direct route loads, navigation, booking preselection, image loading, and responsive layouts.

## Technical details
Use TanStack file-based routes and `Link`; do not edit generated route files. Keep semantic tokens and current styles. No backend, storage, new dependencies, prices, availability claims, or invented business credentials.
