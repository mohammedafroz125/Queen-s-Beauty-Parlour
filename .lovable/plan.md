# Update Queen’s Beauty Parlour services and hours

## Scope
Keep the existing homepage design and enquiry flow. Update only the shared service catalogue, the existing service cards and booking selector, and the Contact hours display.

## Steps
1. Define the exact five-category catalogue once in `src/lib/beauty.ts`; derive the booking choices from it.
2. Render existing service cards from those categories and let each listed service select itself for the enquiry form.
3. Show 5:00 PM–11:00 PM in the current Contact section without adding days or promising availability.
4. Add focused catalogue and business-hours coverage, run the existing tests, and verify the WhatsApp link and form interactions in the preview.

## Technical details
- Preserve the wa.me destination, URL encoding, validation, new-tab link, and unconfirmed-enquiry wording.
- Keep all service names in the browser-safe shared data module and avoid new dependencies or backend work.