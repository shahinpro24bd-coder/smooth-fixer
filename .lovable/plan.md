# Improve service detail pages and standardize designation

## What will change
- Redesign all six new service detail pages with a more polished medical presentation while preserving the existing logo, navigation, footer, colours, and CMS editing flow.
- Improve the page header, doctor/service introduction, treatment highlights, care-process section, appointment call-to-action, and video area with clearer hierarchy and better mobile spacing.
- Keep every editable text and image connected to the existing `2.html` editor, including YouTube add/remove controls.
- Replace every visible doctor designation/qualification block across the website with this exact text:

  **অধ্যাপক ডাঃ এম এ বি সিদ্দিক কোলোরেক্টাল, ব্রেস্ট, এন্ডোল্যাপারোস্কপিক ও ক্যান্সার সার্জন এমবিবিএস (ঢাকা) বিসিএস (স্বাস্থ্য) এফসিপিএস (সার্জারী) এম এস (জেনারেল সার্জারী) বঙ্গবন্ধু শেখ মুজিব মেডিকেল বিশ্ববিদ্যালয়**

## Design direction
- Professional specialist-clinic look using the website’s existing gold, green, light, and dark semantic colours.
- Strong Bengali typography, clean information bands, restrained cards, consistent icons, and a prominent appointment action.
- Responsive layouts for phone and desktop without changing the rest of the site’s visual identity.

## Technical details
- Update the service-page generator first, then regenerate all six public pages and all six `2.html` editor copies so future regeneration preserves the design.
- Move new visual rules into reusable semantic CSS classes instead of inline colour and shadow values.
- Update duplicated doctor text in source HTML and generator-owned navigation/footer content without changing phone, address, or service links.
- Add unique page descriptions and social metadata for each generated service page.
- Verify all pages load without errors, mobile navigation still opens smoothly, editor-only controls remain limited to `2.html`, and designation text is consistent everywhere.
