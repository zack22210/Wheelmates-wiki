---
version: 2
slug: "src-app-locale-page-tsx"
primary_target: "src/app/[locale]/page.tsx"
related_targets: ["src/app/[locale]/HomePageClient.tsx","src/app/[locale]/[...slug]/page.tsx"]
---

Scope: WheelMates homepage, guide index, and future guide detail surfaces. Visitor mode: Read.

Audience and job: English-first WheelMates players who want source-checked answers about two-player co-op, Friend’s Pass, Windows PC support, release details, and—after Phase B—focused gameplay guides. Enabled locales are English, German, French, and Spanish.

Current state: Phase A is complete. The researched homepage is live locally, but there are no guide articles yet; the guide index must remain an explicit zero-article state until reviewed keywords produce real MDX pages.

Primary action: establish what WheelMates is, confirm its co-op proposition, and open the official Steam page or official gameplay videos. Later, the same surface should lead into verified guide categories without changing the shell.

Chosen direction: “The Two-Lane RC Marshal Board,” grounded direction 4 from concept seed `75790ef1`. Official cobalt and signal orange divide cream workbench paper and dark navy utility fields. Square controls, mechanical rails, flat rule-based modules, Bebas Neue display type, a plain UI/body face, and official gameplay images replace generic wiki cards, gradients, rounded shells, and ornamental chrome.

Shipped homepage sequence:

1. Bright-paper header with official logo, locale selector, theme control, and content navigation only when real groups exist.
2. Direct H1 hero—no kicker—with the official two-car scene, concise answer-led copy, Steam action, and gameplay action.
3. Navy four-fact status rail for release, platform, player count, and Friend’s Pass.
4. Cream facts board for developer/publisher, co-op modes, achievements, and storage.
5. Full-width story image/copy split describing the house, cooperation, and car upgrades.
6. Navy release rail with official Steam and launch-video destinations.
7. Ruled guide index, currently showing an honest zero-article state.
8. Navy legal/source-aware footer; existing advertisement positions remain reserved by the framework.

Responsive behavior: desktop uses a 720px full-bleed hero with left copy and the two-car scene as the background. At 860px, navigation and horizontal content splits collapse. At 560px, the hero becomes a contained full 16:9 image above a navy title/action panel, preserving both cars; status and guide entries stack, facts remain two-up, and actions retain at least 44px touch areas. Reduced-motion mode removes hero parallax.

Content and localization: homepage and shared UI copy come from locale JSON. All enabled locales require translated UI, metadata, lists, and article bodies; English fallback is not a completion state. Future locale variants share the same English ASCII slug, and navigation/sitemap entries appear only for real synchronized MDX content.

Constraints: one H1 per page; no decorative page-heading eyebrow; square controls; CSS-variable color roles; Lucide icons; visible keyboard focus; responsive article reflow; unique simultaneously visible homepage imagery; no fake cards, empty navigation, invented claims, or unverified destinations. Finish-review verdict: PASS. Reference screenshots: `.impeccable/compare/wheelmates-review-desktop.png` and `.impeccable/compare/wheelmates-review-mobile.png`.
