---
name: "1ο Νηπιαγωγείο Κρυονερίου"
description: "A tactile school noticeboard shaped by Kryoneri's forest and paper-cut craft."
colors:
  forest-ink: "#073f34"
  association-green: "#0b5d4b"
  forest-deep: "#032b24"
  cool-paper: "#f7f9f8"
  paper-deep: "#e7f0eb"
  sky-blue: "#36a8d8"
  notice-yellow: "#f5bd2f"
  warm-coral: "#f06455"
  soft-sage: "#b9d9c8"
typography:
  display:
    fontFamily: "Pilcrow Rounded, Trebuchet MS, sans-serif"
    fontSize: "clamp(4.4rem, 10vw, 10.5rem)"
    fontWeight: 700
    lineHeight: 0.86
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Pilcrow Rounded, Trebuchet MS, sans-serif"
    fontSize: "clamp(2.5rem, 1.3rem + 4vw, 5.25rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Pilcrow Rounded, Trebuchet MS, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem)"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Pilcrow Rounded, Trebuchet MS, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Pilcrow Rounded, Trebuchet MS, sans-serif"
    fontSize: "clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem)"
    fontWeight: 700
    lineHeight: 1.35
rounded:
  flat: "0"
spacing:
  gutter: "clamp(18px, 3vw, 42px)"
  control-y: "16px"
  control-x: "28px"
  panel: "clamp(42px, 5vw, 76px)"
  section: "clamp(110px, 14vw, 190px)"
components:
  button-primary:
    backgroundColor: "{colors.association-green}"
    textColor: "{colors.cool-paper}"
    typography: "{typography.label}"
    rounded: "{rounded.flat}"
    padding: "{spacing.control-y} {spacing.control-x}"
  button-primary-hover:
    backgroundColor: "{colors.forest-deep}"
    textColor: "{colors.cool-paper}"
  button-light:
    backgroundColor: "{colors.cool-paper}"
    textColor: "{colors.forest-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.flat}"
    padding: "{spacing.control-y} {spacing.control-x}"
  field:
    backgroundColor: "{colors.cool-paper}"
    textColor: "{colors.forest-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.flat}"
    padding: "13px 14px"
  folder-tab:
    backgroundColor: "{colors.warm-coral}"
    textColor: "{colors.forest-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.flat}"
  announcement-row:
    backgroundColor: "{colors.notice-yellow}"
    textColor: "{colors.forest-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.flat}"
    padding: "22px 0"
  leaf-frame:
    backgroundColor: "{colors.association-green}"
    rounded: "{rounded.flat}"
    size: "1 / 1"
---

# Design System: 1ο Νηπιαγωγείο Κρυονερίου

## Overview

**Creative North Star: "The Forest Noticeboard"**

The system feels like a school noticeboard assembled by hand at the edge of Kryoneri's forest: useful first, warm without sentimentality, and tactile without pretending to be physical paper. Cool paper grounds deep green ink while blue, yellow, coral, and sage behave like a small set of construction-paper sheets.

Its signature is a pointed leaf geometry repeated with discipline across the wordmark, image masks, navigation tabs, controls, and small picture windows. The stacked-folder composition is a particularly expressive use of the system, while the underlying rules—flat color, clipped silhouettes, oversized rounded type, and honest content labeling—remain reusable on quieter pages.

**Key Characteristics:**
- Paper-flat color fields with crisp cut edges rather than conventional rounded cards.
- One pointed leaf motif, scaled from icon to image frame.
- Oversized Pilcrow Rounded headlines paired with calm, readable body copy.
- Bright construction-paper accents anchored by forest green and cool paper.
- Explicit labels distinguish verified facts, sample announcements, and unconfirmed association content.

## Colors

The palette combines forest ink and cool paper with four deliberately simple paper-cut accents; saturated colors mark sections and choices, not decoration scattered at random.

### Primary
- **Association Green:** The institutional anchor for primary actions, large school panels, the wordmark leaf, and active environmental color.
- **Forest Deep:** The strongest contrast color for hover states, form actions, footer grounding, and dark-on-bright text.

### Secondary
- **Sky Blue:** A clear, child-friendly section and folder accent.
- **Notice Yellow:** The announcement surface, selection color, and universal focus indicator.

### Tertiary
- **Warm Coral:** The contact surface, the news tab, and the text-entry caret.
- **Soft Sage:** A quiet fourth folder that bridges paper and forest tones.

### Neutral
- **Forest Ink:** Default reading color and line work on light or yellow surfaces.
- **Cool Paper:** Page canvas, reversed text, field fill, and light action surface.
- **Paper Deep:** Low-contrast explanatory notes and scrollbar track.

### Named Rules

**The Construction-Paper Rule.** Use each accent as one decisive sheet or tab; do not blend the palette into gradients.

**The Yellow Focus Rule.** Keyboard focus is always a four-pixel Notice Yellow outline with a four-pixel offset, including on already-yellow sections where a dark supporting edge may be added for contrast.

## Typography

**Display Font:** Pilcrow Rounded (with Trebuchet MS and sans-serif fallbacks)  
**Body Font:** Pilcrow Rounded (with Trebuchet MS and sans-serif fallbacks)

**Character:** One rounded family keeps the voice direct and familiar. Personality comes from scale, close display leading, and confident weight changes rather than from mixing novelty typefaces.

### Hierarchy
- **Display:** Heavy, tightly set, and very large; reserved for the opening statement and allowed to wrap into a compact block.
- **Headline:** Heavy with close leading; used for major section introductions and kept to roughly ten characters per line when the language allows.
- **Title:** Bold and compact; used for school facts, announcement titles, and short statements.
- **Body:** Regular weight with open leading; use restrained measures of approximately 29–40 characters for prominent prose and up to 52 characters for announcement summaries.
- **Label:** Bold and compact; used for dates, form labels, disclosure tags, and navigation tabs without forced uppercase.

### Named Rules

**The One-Family Rule.** Keep every typographic role in Pilcrow Rounded; hierarchy is created through scale, weight, measure, and leading.

**The Tight-Headline Rule.** Display and section headlines use close leading and negative tracking, but body copy never inherits those settings.

## Layout

The page uses a fluid gutter and a wide 1480px maximum canvas. Large sections alternate between full-bleed color fields and centered two-column compositions; the asymmetry is intentional, with copy and imagery receiving unequal fractions instead of defaulting to equal cards. Section spacing is generous enough for each paper composition to read as a new sheet.

At 900px, two-column sections collapse, the navigation becomes a stacked dark menu, and the announcement preview moves above its index while remaining available as context. At 560px, copy measures shorten, folder and leaf artwork recenters, contact fields become single-column, and metadata flows below announcement copy. Touch targets retain their padding and the visual hierarchy remains oversized rather than shrinking into desktop-in-miniature.

**The Wide-Sheet Rule.** Use the shared maximum canvas and fluid gutter for alignment, then break out only when a section is intentionally a full color sheet.

## Elevation & Depth

The system is flat by default and uses no box shadows. Depth comes from physical-looking overlap, sticky positioning, clipped edges, and the order of colored sheets. Hover lift is small and literal; it never introduces a floating glass-card aesthetic.

**The Cut-Paper Depth Rule.** Create depth with overlap, cropping, scale, and color adjacency; do not add soft ambient shadows to ordinary surfaces.

## Shapes

Corners stay square. Character comes from polygon clipping: the signature leaf is a pointed diamond-like silhouette, buttons and action tabs are skewed paper strips, folders use trapezoid tabs, and selected large panels may receive a small torn-notch edge. Image masks are generous and organic only through the same pointed leaf vocabulary.

**The One-Motif Rule.** Reuse the pointed leaf silhouette at different scales; do not introduce unrelated blobs, pills, circles, or decorative squiggles.

**The Crisp-Cut Rule.** Clipped shapes have hard edges and flat fills. Border radii remain zero.

## Components

### Buttons
- **Shape:** A square-cornered paper strip clipped into a shallow skew; controls remain fully legible rectangles despite the cut edge.
- **Primary:** Association Green with Cool Paper text, bold label weight, and generous horizontal padding.
- **Hover / Focus:** Lift by four pixels and deepen to Forest Deep over 200ms; preserve the global Yellow focus outline.
- **Light:** Cool Paper on dark green, using the same geometry and spacing.

### Cards / Containers
- **Corner Style:** Square; important imagery is clipped to the leaf silhouette rather than placed inside rounded cards.
- **Background:** Large flat sheets use Association Green, Notice Yellow, or Warm Coral; explanatory notes use Paper Deep.
- **Shadow Strategy:** None; use overlap and color contrast as described in Elevation & Depth.
- **Internal Padding:** Fluid panel padding for major containers, with a compact 24px inset for explanatory notes.

### Inputs / Fields
- **Style:** Cool Paper fill, two-pixel Forest Deep border, square corners, and comfortable 13px by 14px padding.
- **Focus:** The global Yellow outline sits outside the dark field border; the caret uses Warm Coral.
- **Status:** Keep feedback directly beneath the action and state exactly what external behavior will occur.

### Navigation

Desktop navigation is a light horizontal row with medium-weight links; hover adds a simple underline. The contact action is a green clipped tab. Below 900px, navigation becomes a dark stacked sheet and the contact action flips to Notice Yellow for immediate recognition.

### Folder Stack

Folder tabs are large overlapping color sheets with staggered labels. The component may introduce a section or provide anchor navigation, but every visible tab must be actionable and its label must remain readable when the stack compresses on mobile.

### Announcement Row and Preview

Each announcement is a full-width, border-bottom row with a leaf thumbnail, title, summary, and date or honesty label. Hover, focus, and selection translate the row ten pixels while fading its siblings; the paired leaf preview crossfades and subtly scales during the image swap. The pressed state is exposed through `aria-pressed`, and sample content is visibly labeled rather than styled as genuine news.

## Do's and Don'ts

### Do:
- **Do** treat the page as assembled sheets: use large color fields, overlaps, and clipped edges to build hierarchy.
- **Do** preserve high contrast and the visible Notice Yellow focus treatment on every interactive element.
- **Do** keep announcement rows, folder tabs, and mobile navigation operable by keyboard and touch.
- **Do** label sample announcements and unverified association information in plain language at the point where it appears.
- **Do** use original paper-cut imagery with truthful alt text that distinguishes illustration from documentary photography.

### Don't:
- **Don't** replace the cut-paper system with rounded white cards, glass panels, gradients, or generic soft shadows.
- **Don't** scatter all accent colors inside one small component; give each sheet or state one clear color role.
- **Don't** add a second decorative motif or novelty typeface beside the pointed leaf and Pilcrow Rounded.
- **Don't** present board members, events, association contact details, or institutional claims as verified until the content is confirmed.
- **Don't** hide the live announcement preview or its selected state on small screens; reflow it above the index instead.
