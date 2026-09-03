---
name: WheelMates RC Service Board
description: A source-checked co-op field guide styled as a two-lane RC marshal board.
colors:
  marshal-cobalt: "hsl(201 78% 44%)"
  signal-orange: "hsl(27 88% 57%)"
  workbench-cream: "hsl(40 48% 90%)"
  paper-bright: "hsl(43 60% 96%)"
  utility-navy: "hsl(208 60% 15%)"
  track-black: "hsl(207 68% 9%)"
  action-ink: "hsl(208 60% 12%)"
  muted-ink: "hsl(208 25% 34%)"
  rule-line: "hsl(35 26% 71%)"
  white: "hsl(0 0% 100%)"
  night-cobalt: "hsl(200 86% 58%)"
  night-orange: "hsl(28 93% 62%)"
  night-paper: "hsl(207 57% 8%)"
  night-paper-bright: "hsl(207 45% 12%)"
  night-ink: "hsl(39 44% 92%)"
  night-muted: "hsl(205 16% 69%)"
  night-rule: "hsl(207 27% 27%)"
  night-utility: "hsl(207 68% 6%)"
typography:
  display:
    fontFamily: "Bebas Neue Local, sans-serif"
    fontSize: "clamp(4.25rem, 6.2vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bebas Neue Local, sans-serif"
    fontSize: "clamp(3.6rem, 5vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Segoe UI Variable, Segoe UI, sans-serif"
    fontSize: "23px"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Segoe UI Variable, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Segoe UI Variable, Segoe UI, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.025em"
rounded:
  none: "0"
  marker: "50%"
spacing:
  tight: "10px"
  control-inline: "20px"
  component: "24px"
  mobile-section: "52px"
  desktop-section: "74px"
components:
  button-primary:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.action-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  button-outline:
    backgroundColor: "hsl(207 68% 9% / 0.3)"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  icon-control:
    textColor: "{colors.utility-navy}"
    rounded: "{rounded.none}"
    height: "44px"
    width: "44px"
---

# Design System: WheelMates RC Service Board

## Overview

**Creative North Star: “The Two-Lane RC Marshal Board”**

WheelMates should feel like a practical RC service board laid over cream workbench paper: cobalt and signal orange divide lanes, dark navy fields hold decisive facts, and mechanical rules organize information. Official gameplay imagery supplies the atmosphere; the interface supplies source-aware clarity. The result is playful but disciplined, built for players checking co-op, Friend’s Pass, platform, release, and later guide answers.

**Key Characteristics:**

- Official two-car imagery at decisive scale, with both cars kept legible.
- Flat, rule-based hierarchy using rails, borders, tonal fields, and image boundaries.
- Condensed display type paired with an ordinary, highly readable interface face.
- Square controls and containers; circles only for compact numbered or semantic markers.
- One direct page heading, without a decorative kicker or eyebrow.

## Colors

Marshal cobalt carries structure, links, icons, and lane markings. Signal orange is the high-priority action and safety accent. Workbench cream and bright paper keep reading areas warm; utility navy and track black create the service-board fields. Dark mode preserves the same color roles with the `night-*` tokens rather than inventing a second identity.

**The Two-Lane Rule.** Cobalt establishes the information lane; orange marks action, timing, or a decisive boundary. Do not use both accents as general decoration.

**The Functional Gradient Rule.** Decorative gradients are not part of the system. A directional hero veil may protect text contrast, and the paper surface may use a faint repeating rule; neither should read as a glossy color effect.

## Typography

**Display Font:** Bebas Neue Local with a sans-serif fallback.

**Body and UI Font:** Segoe UI Variable, then Segoe UI and sans-serif.

The tall, mechanical display face gives headings and short facts the force of track signage. The plain UI face handles prose, labels, controls, and localized strings without competing with the imagery.

- **Display:** Uppercase, regular weight, tightly led; reserved for the H1 and page-defining statements.
- **Headline:** Uppercase and condensed for section titles, release statements, and short fact values.
- **Title:** Bold UI face for article names and information that needs conventional reading rhythm.
- **Body:** Default 16px/1.55; long explanatory copy may open to 18–20px and should stay near 58–72 characters per line.
- **Label:** Bold, compact, usually uppercase; use for controls, fact labels, navigation, and verification states.

**The One Heading Rule.** Lead each page with one direct H1. Labels can identify factual groups, but never add a decorative pre-heading above the page title.

## Layout

The desktop shell is `min(92%, 1320px)`. It becomes `min(100% - 48px, 1100px)` at 1180px, `min(100% - 32px, 760px)` at 860px, and `min(100% - 24px, 520px)` at 560px. Full-bleed hero and story sections may escape the shell; reading and data modules return to it.

Desktop uses long horizontal bands: a 720px hero, four-up status and facts, a 1.08/0.92 image-copy story split, a three-column release band, and a three-column guide archive. At 1180px the archive becomes two columns. At 860px navigation, story, release, list, and article layouts stack while status and facts become two columns. At 560px the status and archive become single-column; the facts stay two-up to retain dashboard density.

The desktop hero is a decisive full-bleed two-car background with copy anchored left. On mobile, it becomes an explicit stack: the entire contained 16:9 two-car image sits above a navy title/action panel so neither car is cropped away. Mobile actions may share the row and expand evenly. Short viewports above 860px reduce the hero to 485px when height is at most 800px.

Use 10–24px for local rhythm, roughly 52–74px for standard section breathing room, and up to 100–120px around the guide archive. Preserve `min-width: 0` in split-grid copy, narrow feature headings to about 11 characters, and let translated strings wrap rather than compress controls below their target size.

## Elevation & Depth

Content is flat by default. Depth comes from official imagery, cream/navy tonal changes, 1px rules, heavy 3–7px dividers, and the paired cobalt/orange hero rail. Cards, facts, and navigation rows do not float. The cookie-consent bar is the sole ambient overlay and may use its existing deep shadow because it must remain visibly detached from page content.

Pointer parallax on the desktop hero is subtle: the image starts at a 1.035 scale and shifts no more than 18px horizontally or 12px vertically. Disable the transform under reduced-motion preferences and on the contained mobile hero.

**The Flat Workbench Rule.** Do not use shadows to turn ordinary content into floating cards; establish order with rules, spacing, and fields.

## Shapes

Controls, panels, images, status cells, and content frames use square corners. Borders resemble measured rails and workbench divisions rather than soft containers. Full circles are reserved for compact numbered guide markers or similarly small semantic indicators; they are not a general button or card shape.

## Components

### Header and navigation

The bright-paper header is 70px tall on desktop and 68px on compact layouts. The official logo lockup leads; published content groups follow, with the language selector and 44px theme control at the end. Below 860px, desktop navigation hides and a 44px square menu control opens the dark utility menu. Never render empty content groups; the locale switcher remains available for English, German, French, and Spanish.

### Hero

Use the official 1920×1080 two-car scene, a left-to-right contrast veil on desktop, and no eyebrow above the H1. The desktop copy area matches the 720px hero and keeps the H1 under 680px and description under 570px. The primary orange Steam action and outlined gameplay action are 48px tall. Mobile uses the contained image-over-panel composition described in Layout.

### Status and facts

The status strip is a navy four-cell rail with a 7px orange top edge, cobalt icons, 10px labels, and condensed fact values. The facts band uses a cobalt section stamp beside four ruled values on bright paper. Both are factual summaries, not cards; every value must be source-checked.

### Story and release

Story is a full-width image-copy split, never a boxed teaser. Its image is unique within the visible homepage. Release is a navy utility band with an orange top rail, a date marker, a short display statement, supporting copy, and only verified destinations.

### Guide index

The archive is a ruled editorial grid with a direct heading, count, and concise description. Published entries may invert to navy on hover or keyboard focus. Before Phase B, show the bordered zero-article state as plain information; it must not resemble a clickable guide.

### Shared controls

Primary actions are orange with dark text; outline actions use a translucent dark field and white border/text; dark actions invert to navy. Hover states change fields decisively, and keyboard focus uses a 3px orange outline with a 3px offset. Canonical actions are 48px tall; all interactive targets must provide at least a 44px touch area.

## Do's and Don'ts

### Do:

- **Do** use official WheelMates art and keep simultaneously visible homepage images distinct.
- **Do** protect both cars in every hero crop, especially the contained mobile 16:9 scene.
- **Do** preserve the English-first responsive framework and complete UI/content translation for enabled locales.
- **Do** keep one H1, visible focus, 44px touch targets, readable measures, and reduced-motion behavior.
- **Do** keep the empty guide index honest until reviewed keywords produce real MDX pages.

### Don't:

- **Don't** introduce generic rounded card grids, pill controls, glass panels, decorative gradients, or routine shadows.
- **Don't** add a decorative kicker above the page heading or compete with the H1 through oversized labels.
- **Don't** crop either hero car out on mobile or replace the decisive desktop image with a timid inset.
- **Don't** create empty navigation, fabricated guide links, or visual states that imply unpublished content exists.
- **Don't** move, remove, or restyle the framework’s reserved advertisement positions without an explicit ad-density review.
