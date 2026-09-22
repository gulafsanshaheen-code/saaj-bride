# SAJ Bridal Beauty — Customer Mobile Experience

## Goal
Build the complete customer-side SAJ experience as a polished, mobile-first bridal beauty marketplace, using the uploaded packaging as visual direction only.

## What I’ll build
- A cinematic SAJ opening and three-step onboarding flow.
- A home experience centered on swipeable bridal portfolios, with search and service discovery.
- Explore, saved artists, bookings, booking tracking, and profile views through floating bottom navigation.
- Immersive portfolio and service detail views with galleries, artist information, reviews, pricing, and save/share actions.
- A compact booking journey covering service, date, live-style availability, details, review, and confirmation.
- Realistic mock content for artists, services, portfolios, availability, reviews, and bookings.
- Local persistence for onboarding, saved artists, and booking state.

## Visual direction
- Deep berry, burgundy, dusty rose, blush, warm ivory, and champagne neutrals taken from the supplied reference.
- Editorial serif headlines paired with clean modern interface type.
- Large bridal photography, selective ivory glass surfaces, thin dividers, restrained shadows, and calm motion.
- Designed around a 390 × 844 phone while remaining comfortable across the requested mobile sizes and desktop preview.

## Technical approach
- Keep the complete demo within the home route as a cohesive app-like experience, using internal view state for fast transitions.
- Create reusable portfolio, artist, service, booking, calendar, navigation, and sheet controls.
- Use generated bridal imagery stored as project assets; the uploaded packaging remains reference-only.
- Add route-specific metadata and update shared font loading and semantic design tokens.
- Validate the key discover → portfolio → service → date/time → confirmation journey in a real mobile browser.
