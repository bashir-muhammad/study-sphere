```markdown
# Design System Specification

## 1. Overview & Creative North Star: "The Digital Sanctuary"

This design system is built upon the concept of **The Digital Sanctuary**. In an era of fragmented attention, this system rejects the cluttered, high-frequency aesthetic of traditional "EdTech" in favor of an intentional, editorial experience. It is designed to lower the user's cortisol levels and induce a state of "flow."

We break the "template" look by utilizing **High-Intent Asymmetry**. Instead of rigid, centered grids, we use generous, purposeful whitespace (negative space) to guide the eye. Elements should feel like they are floating in a calm, structured environment—utilizing overlapping surfaces and a sophisticated typography scale that prioritizes breathing room over information density.

---

## 2. Color & Surface Architecture

The palette is anchored by the stability of Deep Teal and energized by the warmth of Soft Sunset Orange.

### Core Palette

- **Primary (`#0f5f5b` to `#317873`):** Used for "Focus Zones." It represents depth and concentration.
- **Tertiary/Accent (`#f4976c`):** Reserved strictly for "Momentum." Use this for progress indicators, primary CTAs, and achievement highlights.
- **Surface Neutrals:** A sophisticated range of off-whites (`#f8f9fa`) and cool grays.

### The "No-Line" Rule

**Explicit Instruction:** Do not use 1px solid borders to define sections. High-end design is felt through tonal shifts, not outlines.

- Separate content blocks by transitioning from `surface` to `surface-container-low`.
- Use the `spacing-8` or `spacing-12` tokens to create clear, rhythmic separation without the "grid-box" feel.

### Surface Hierarchy & Nesting

Treat the UI as a series of physical layers of fine paper.

- **Base Layer:** `surface` (The foundation).
- **Secondary Layer:** `surface-container-low` (For subtle grouping).
- **Elevated Layer:** `surface-container-lowest` (Used for cards to create a "lifted" effect against a darker background).

### The "Glass & Gradient" Rule

To add soul to the interface:

- **Floating Elements:** Use `surface-container-lowest` with an 80% opacity and a `20px` backdrop blur for navigation bars or floating action panels.
- **Depth Gradients:** Apply a subtle linear gradient from `primary` to `primary_container` on large interactive hero elements to provide a tactile, premium finish.

---

## 3. Typography: The Editorial Voice

We pair **Plus Jakarta Sans** (Headings) with **Manrope** (Body) to create a custom, high-end feel that avoids the generic "system font" look.

| Token           | Font Family       | Size     | Character                                  |
| :-------------- | :---------------- | :------- | :----------------------------------------- |
| **Display-LG**  | Plus Jakarta Sans | 3.5rem   | Authoritative, editorial hero moments.     |
| **Headline-MD** | Plus Jakarta Sans | 1.75rem  | Section headers; calm and confident.       |
| **Title-LG**    | Manrope           | 1.375rem | High readability for module titles.        |
| **Body-LG**     | Manrope           | 1.0rem   | The standard for long-form study material. |
| **Label-MD**    | Manrope           | 0.75rem  | Metadata and secondary utility text.       |

**Usage Note:** Maintain a line-height of 1.6 for body text to ensure the "Sanctuary" feel is maintained during long reading sessions.

---

## 4. Elevation & Depth: Tonal Layering

Shadows and borders are secondary to **Tonal Layering**.

- **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` card on a `surface-container-high` background. The contrast in value creates a natural, soft lift.
- **Ambient Shadows:** When a shadow is required (e.g., a floating modal), use a blur of `32px` with the color `on-surface` at 4% opacity. It should feel like a soft glow, not a dark drop-shadow.
- **The "Ghost Border" Fallback:** If accessibility requires a container boundary, use the `outline-variant` token at **15% opacity**. A 100% opaque border is strictly prohibited.

---

## 5. Components

### Buttons & Interaction

- **Primary Button:** Rounded `full`, `primary` background, `on-primary` text. Use a subtle inner-glow on hover.
- **Tertiary Action:** Use for "Start Learning" or "Complete." `tertiary_container` background with `on-tertiary-fixed-variant` text.
- **Ghost Actions:** No background, `primary` text, `plusJakartaSans` medium weight.

### Cards & Study Modules

- **Rule:** Forbid divider lines.
- **Structure:** Use `spacing-4` for internal padding and `rounded-xl` (1.5rem) for corners. Separation between content is achieved through typography hierarchy and `body-sm` labels.

### Input Fields

- **Style:** `surface-container-highest` background with a `rounded-md` corner.
- **Focus State:** Transition the background to `surface-container-lowest` and apply a "Ghost Border" of `primary` at 20% opacity.

### Navigation (The Floating Dock)

Instead of a fixed top bar, use a centered, floating navigation pill with a backdrop blur (`Glassmorphism`). Use `surface-container-lowest` at 85% opacity.

---

## 6. Do's and Don'ts

### Do

- **Do** use asymmetrical margins to create a sense of "premium space."
- **Do** use the `tertiary` (Sunset Orange) sparingly—only for things that represent progress or a "win."
- **Do** lean into `rounded-xl` for all main containers to maintain a friendly, approachable atmosphere.

### Don't

- **Don't** use 1px solid black or dark grey borders.
- **Don't** use "Inter," "Roboto," or "Arial." The typography must feel intentional and custom.
- **Don't** crowd the screen. If a section feels "full," increase the `spacing` token to the next tier.
- **Don't** use standard "Error Red" for everything. Use `error_container` with a low-chroma red to keep the user calm even when they make a mistake.
```
