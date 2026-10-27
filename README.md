# Study Sphere

> A fast, accessible flashcard app where every core study mode is free.

Study Sphere helps people learn and retain knowledge through customizable flashcards, effective review sessions, and measurable learning progress.

[Live demo](#) · [Storybook](#) · [User flows and architecture](docs/flow.md) · [Data model](docs/data-model.md)

<!-- Replace the # links above with real URLs after the first deploy. Add 1-2 screenshots here. -->

## Why this project

**Product goal:** a useful learning platform with flashcard creation, study sessions, quizzes, and progress tracking, with no paywall on the core study modes.

**Career goal:** demonstrate professional development skills: architecture, TypeScript modeling, accessibility, automated testing, database design, error handling, code reviews, documentation, and deployment.

## Status

- [x] Tooling: Next.js, TypeScript, CSS Modules, Storybook, ESLint, Stylelint, Prettier
- [x] Vitest and Testing Library set up
- [ ] Phase 1: core UI components in Storybook (with mock data)
- [ ] Phase 2: database, authentication, create/edit sets
- [ ] Phase 3: study modes (Flashcards, Learn, Test) with unit-tested logic
- [ ] Phase 4: search, folders, tags, CSV import/export, Sanity for editorial content
- [ ] Phase 5: accessibility audit, performance pass, e2e tests, deployment

## Tech stack

| Concern           | Choice                                                       |
| ----------------- | ------------------------------------------------------------ |
| Framework         | Next.js (App Router), React, TypeScript                      |
| Styling           | Plain CSS with CSS Modules and CSS variables (design tokens) |
| Components        | Storybook with the a11y addon                                |
| Testing           | Vitest, Testing Library, Playwright (a few e2e flows)        |
| Database          | PostgreSQL with Prisma or Drizzle (to be decided)            |
| Auth              | Auth.js                                                      |
| Validation        | Zod                                                          |
| Editorial content | Sanity (phase 4, landing page and blog only)                 |
| Hosting           | Vercel and managed Postgres                                  |

User-generated data (sets, cards, progress) lives in Postgres. The CMS is only for editorial content.

## Scope

### MVP (must have)

- Sign up, sign in, and sign out (email and one OAuth provider)
- Create, edit, and delete study sets with cards (term and definition)
- Save a set as a draft, then publish it
- **Authorization:** private and draft sets are visible only to their owner
- Public set pages and basic search
- Study modes: Flashcards (flip), Learn (spaced repetition), Test (generated questions)
- Shuffle cards and restart a session
- Per-card progress tracking
- CSV import and export
- Accessibility baseline (WCAG 2.2 AA target)
- Unit tests for the core study logic

### Should have (phase 2)

- Match game
- Folders and tags
- Images on cards (with required alt text)
- Unlisted links: share a set by link without listing it in search
- Dark mode
- Starred cards
- Study streaks

### Could have (later)

- AI card generation
- Classes and sharing with specific users
- Text-to-speech
- Offline PWA
- Real-time collaboration

### Won't do (for now)

- Payments
- Native mobile apps
- Live multiplayer games

## Core user stories

**Studying**

- As a student, I can flip through cards using only the keyboard.
- As a student, I can study only the cards I am about to forget.
- As a student, I can take a test generated from my set and see which cards I got wrong.
- As a visitor, I can search public sets and study them without paying or signing in.
- As a screen-reader user, I know which card I am on, whether it is flipped, and what my score is.

**Creating**

- As a student, I can paste a list of terms and definitions and get a study set in under a minute.
- As a creator, I can save a set as a draft and publish it when it is ready.
- As a creator, I can make a set private so only I can see it.
- As a creator, I can export my set as CSV and import it again.

## Core workflows

Diagrams and details are in [docs/flow.md](docs/flow.md).

- **A. Study a set (Flashcards):** Browse, open a set, flip a card, mark known or unknown, move to the next card, finish, view the summary, review mistakes.
- **B. Create a set:** Sign in, enter title and description, add terms and definitions, validate, save draft, preview, publish.
- **C. Take a quiz:** Open a set, start an attempt, answer questions, submit, score on the server, show correct answers and the cards that were missed.
- **D. Learn (spaced repetition):** Open a set, start Learn, answer the cards that are due, the server updates each card's box and next due date, finish with a summary.

## Non-functional requirements

| Area            | Target                                                                                                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accessibility   | WCAG 2.2 AA. Full keyboard support, visible focus, `prefers-reduced-motion` respected for the flip animation, `lang` attributes from the set language, live-region announcements for card and score changes |
| Performance     | Server-rendered pages, minimal client JS, Lighthouse performance 90+ on public pages                                                                                                                        |
| Security        | Authorization checks on the server for every read and write, input validated with Zod, no answers or private data leaked to the client                                                                      |
| Quality         | Strict TypeScript, high unit-test coverage on `study` logic, component tests for interactive components, e2e tests for the main workflows                                                                   |
| Maintainability | Small PRs, conventional commits, ADRs for major decisions                                                                                                                                                   |

### Keyboard map (proposed)

| Key                | Action               |
| ------------------ | -------------------- |
| Space / Enter      | Flip the card        |
| Left / Right arrow | Previous / next card |
| K                  | Mark as known        |
| U                  | Mark as unknown      |

## Architecture and design decisions

- Study logic is written as pure functions with no React, so it is easy to test.
- Quizzes are scored on the server so the client never decides the result.
- Database types, validation schemas, and UI view models are kept separate.
- A CMS is not used for user-generated content. See [docs/data-model.md](docs/data-model.md).

Decisions are recorded as short ADRs in `docs/adr/` (to be added), for example:

- ADR-001: Postgres for sets and progress, Sanity only for editorial content
- ADR-002: Prisma or Drizzle
- ADR-003: Feature-based folder structure

See [docs/flow.md](docs/flow.md) for the architecture diagram, routes, and folder structure.

## Component library / Storybook

- All shared components are documented in Storybook.
- The accessibility addon is included for a11y checks.
- Each component has a `.tsx`, `.module.css`, `.stories.tsx`, and `.test.tsx` file next to each other.

## Styling

- **Pure CSS:** standard CSS without SCSS or Less, using modern features (custom properties, `:focus-visible`, container queries, logical properties).
- **CSS Modules:** scoped styles to prevent class name collisions.
- **Design tokens:** colors, spacing, and typography are CSS variables in `src/styles/tokens.css`, which also makes dark mode straightforward.

## Testing

- **Unit tests (Vitest):** study logic such as box transitions, due dates, quiz generation, and scoring.
- **Component tests (Vitest and Testing Library):** flashcard flip, quiz question, set editor.
- **Accessibility checks:** Storybook a11y addon, plus axe checks in component tests.
- **e2e (Playwright):** create a set, study a set, take a quiz.

## Getting started

### Prerequisites

- Node.js (current LTS)
- pnpm
- PostgreSQL (local or hosted), once the database phase starts

### Install and run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables (planned)

Copy `.env.example` to `.env.local` and fill in the values.

```bash
DATABASE_URL=
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

## Available scripts

| Script                 | Description                  |
| ---------------------- | ---------------------------- |
| `pnpm dev`             | Start the development server |
| `pnpm build`           | Create a production build    |
| `pnpm start`           | Run the production server    |
| `pnpm lint`            | Run ESLint                   |
| `pnpm lint:style`      | Run Stylelint                |
| `pnpm format`          | Format with Prettier         |
| `pnpm storybook`       | Run Storybook on port 6006   |
| `pnpm build-storybook` | Build a static Storybook     |
| `pnpm test`            | Run Vitest (planned)         |

## Known issues and limitations

- Early development: most features are not implemented yet. See [Status](#status).
- Track bugs and ideas in GitHub Issues.

## Contributing

This is a personal learning project. Suggestions and feedback are welcome through issues.
Commits follow the Conventional Commits format.

## License

Add a license (for example MIT) before making the repository public.
