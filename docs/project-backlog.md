# Study Sphere project backlog

This backlog turns [README.md](../README.md), [flow.md](flow.md), and [data-model.md](data-model.md) into
GitHub issues. It starts from the existing Next.js, TypeScript, Storybook, and Vitest setup and the existing base UI components, and does not repeat them.

This file is the **single source of truth**. `scripts/create-github-issues.mjs` reads it and creates the issues, so keep the structure of each task unchanged (see [Importing into GitHub](#importing-into-github)).

## Project outcome

Deliver an accessible, responsive study app where people can create study sets, publish them with clear visibility rules, and study public sets for free using flashcards, Learn, or quizzes. Signed-in users keep progress and session history. Guest study state stays temporary, and quiz scores are always calculated on the server.

## Conventions

**GitHub Project fields** (use fields, not labels or title prefixes, for these):

| Field     | Values                                                                             |
| --------- | ---------------------------------------------------------------------------------- |
| Status    | Backlog, Todo, In progress, In review, Done                                        |
| Priority  | P0 (MVP blocker), P1 (needed for a good launch), P2 (nice to have)                 |
| Size      | S (under half a day), M (1 to 2 days), L (3 to 5 days). Anything bigger gets split |
| Milestone | M1 to M4 (below)                                                                   |

**Labels:** `area:decisions`, `area:platform`, `area:auth`, `area:study-sets`, `area:study`, `area:progress`, `area:quality`, `area:security`, `area:docs`, and one type label: `type:feature`, `type:chore`, `type:decision`, `type:docs`, `type:test`.

**Rules**

- A task may depend only on earlier tasks, and a P0 task never depends on a P1 or P2 task.
- Use GitHub sub-issues and "blocked by" relationships if enabled for your repository. The import script also writes "Blocked by #n" into each issue body.

### Definition of done (applies to every task)

- Acceptance criteria pass and relevant tests are added (unit, component, or integration).
- UI changes have a Storybook story and pass the a11y addon, and keyboard operation was checked by hand.
- New UI primitives follow the rules in [UI components](#ui-components).
- Server code checks authorization and validates input with Zod.
- Docs and ADRs are updated where the change affects them.
- CI is green and the pull request was reviewed.

### UI components

Already built: `badge`, `button`, `card`, `footer`, `header`, `input-field`, `main-nav`, `page-title`, `progress`, `radio`, and `rating-group`.

New primitives are **not built in advance**. The first task that needs one creates it in `components/ui` with a story, a component test, and a passing a11y addon check. Each uses design tokens, has targets of at least 24 by 24 CSS pixels, and shows a visible focus state. Check what an existing component already supports (for example error text linked with `aria-describedby` in `input-field`) before adding a new one.

| Task           | Primitives it will probably need                                                  |
| -------------- | --------------------------------------------------------------------------------- |
| T12 sign-in    | Alert (announced errors)                                                          |
| T17 editor     | Textarea, Select, form error summary, Dialog (delete confirmation)                |
| T19 publish    | Confirm pattern, visibility choice (can reuse `radio`)                            |
| T20 listing    | Skeleton, Pagination, Empty state                                                 |
| T21 search     | Search field, result-count live region                                            |
| T24 flashcards | Live-region announcer, Icon button, Flip card                                     |
| T27 and T31    | Feedback banner (correct or incorrect), Fieldset for radio groups (reuse `radio`) |
| T33 dashboard  | Empty state (can reuse `progress`, `badge`, `card`)                               |
| T35 CSV import | File input                                                                        |

## Milestones

| Milestone                        | Goal                                                                       |
| -------------------------------- | -------------------------------------------------------------------------- |
| M1 — Foundation and decisions    | Decisions made, CI running, database and test infrastructure ready         |
| M2 — Accounts and study sets     | Sign in, create, publish, browse, and search sets, with a deployed preview |
| M3 — Study experiences           | Flashcards, Learn, and quizzes with correct server-side rules              |
| M4 — Progress and launch quality | Dashboard, CSV, hardening, accessibility, e2e coverage, release            |

## Suggested order

1. Start M1 immediately. T01, T02, T03, and T22 have no dependencies, so they can run in parallel.
2. Get a deployed preview (T14) as soon as sign-in works, then deploy every merge. Do not leave deployment to the end.
3. Build the pure logic (T22, T25, T28) while the database work is in progress.
4. Run accessibility and e2e checks as you build. T39 and T40 are the final audit, not the first time you test.

---

## Milestone M1 — Foundation and decisions

### T01 — Record the ORM and authentication decisions

- **Priority:** P0
- **Size:** M
- **Labels:** area:decisions, type:decision
- **Depends on:** —

Choose Prisma or Drizzle, and choose the authentication solution. Auth.js is now in security-maintenance mode under the Better Auth team, who recommend Better Auth for new projects. Compare **Better Auth** (self-hosted, users in your own PostgreSQL) and **Clerk** (hosted, users live at the provider) before committing, and record each decision in a short ADR under `docs/adr/`.

**Acceptance criteria**

- The ORM ADR compares the options on CHECK constraints, a deferrable unique constraint on `(setId, position)`, full-text search (`tsvector`), migrations, and type generation, and notes which parts need hand-written SQL.
- The auth ADR compares Better Auth and Clerk (and states why Auth.js is not used for a new project) on: where user data lives and how the `User` table is created or synced (adapter tables, or a `clerkId` column filled by webhooks), the sign-in UI and who controls its accessibility, local and end-to-end testing, cost, and lock-in.
- The auth ADR states the email sign-in method and its consequences (an email delivery service for links or codes, or password handling), whether a `/register` page exists, the OAuth provider, and the policy for accounts that share an email.
- README, flow.md, and data-model.md no longer mention Auth.js or list these choices as open questions.
- The selected stack installs and runs locally with documented steps.

### T02 — Align terminology, documents, and decision records

- **Priority:** P0
- **Size:** S
- **Labels:** area:docs, type:docs
- **Depends on:** —

Fix inconsistencies between the three documents and write ADRs for decisions that were already made.

**Acceptance criteria**

- The mode is named **quiz** everywhere: UI text, the route `/sets/[setId]/quiz`, `StudySession.mode` (`'quiz'`), `features/quizzes`, and all docs (the README currently says "Test"). A glossary records it.
- README scope headings no longer reuse "phase 2" with a different meaning from the Status phases. README status maps to these milestones or links to the project board.
- README MVP scope and the priorities in this backlog agree (for example CSV import and export).
- The keyboard map in the README states that single-character shortcuts (K and U) work only while the study player has focus (WCAG 2.1.4).
- The raw `// TODO::` line in flow.md is replaced by a note or a linked issue.
- ADRs exist for: Postgres for user data with Sanity for editorial content only, the feature-based folder structure, `/sets` route naming, and the guest study-state model.

### T03 — Add continuous integration for quality checks

- **Priority:** P0
- **Size:** M
- **Labels:** area:quality, area:platform, type:chore
- **Depends on:** —

Run the existing checks on every pull request, and add the missing `typecheck` script.

**Acceptance criteria**

- A GitHub Actions workflow runs on pull requests and on `main`: install with pnpm cache, `typecheck`, `lint`, `lint:style`, format check, `test`, `build`, and `build-storybook`.
- `pnpm typecheck` exists and is documented in the README.
- A failing check fails the workflow, and the workflow finishes in under 10 minutes.

### T04 — Set up the repository workflow

- **Priority:** P1
- **Size:** S
- **Labels:** area:quality, type:chore
- **Depends on:** T03

Add the templates and rules that make reviews consistent.

**Acceptance criteria**

- A pull request template contains the definition-of-done checklist.
- Issue templates exist for feature, bug, and decision.
- Commit messages are checked against Conventional Commits.
- `main` is protected: pull request required, CI must pass.

### T05 — Align the prototype with the documented routes and structure

- **Priority:** P0
- **Size:** M
- **Labels:** area:platform, type:chore
- **Depends on:** T02

The prototype has `/learn/[id]` and `/study-sets/create`. Move it to the documented structure before more code depends on it.

**Acceptance criteria**

- Routes match the route table in flow.md (for example `/sets/[setId]/learn` and `/my-sets/new`) using the route groups `(public)`, `(auth)`, and `(dashboard)`.
- Code lives in `features/<name>/{components,logic,schemas,services,types}` as documented, and shared primitives live in `components/ui`.
- Mock data sits behind a small data-access module so it can be replaced by real services without touching components.
- An ESLint rule blocks imports from another feature's internals.
- No dead routes or unused files remain.

### T06 — Configure PostgreSQL, the ORM, and migrations

- **Priority:** P0
- **Size:** M
- **Labels:** area:platform, type:chore
- **Depends on:** T01

Give every developer a repeatable local database and a migration workflow before any feature needs data.

**Acceptance criteria**

- A `docker-compose.yml` starts a local PostgreSQL, and the README documents the commands.
- Migration commands (generate, apply, reset) work with the chosen ORM and are available as `pnpm db:*` scripts.
- The database client is a server-only singleton, and importing it from a client component fails the build.
- No credentials are committed.

### T07 — Add validated environment configuration

- **Priority:** P0
- **Size:** S
- **Labels:** area:platform, type:chore
- **Depends on:** T01

Fail fast on bad configuration and keep secrets out of client code.

**Acceptance criteria**

- A Zod-validated environment module separates server-only and public variables.
- A missing or invalid variable fails fast and names the variable without printing any value.
- `.env.example` lists names and safe placeholders only.
- CI provides the variables it needs.

### T08 — Create and migrate the MVP database schema

- **Priority:** P0
- **Size:** L
- **Labels:** area:platform, type:feature
- **Depends on:** T06

Implement `User` (plus any tables or columns the chosen authentication solution needs, per the ADR), `StudySet`, `Card`, `CardProgress`, `StudySession`, `SessionAnswer`, and a `QuizAttempt` table. `QuizAttempt` holds the server-side answer key for both signed-in and guest quizzes (id, setId, nullable userId, hashed token, question and answer snapshot, createdAt, expiresAt). It is missing from data-model.md today.

**Acceptance criteria**

- The schema matches data-model.md, and data-model.md plus its ER diagram are updated to include `QuizAttempt`.
- A CHECK constraint enforces that a draft is always private, and `StudySession.mode` is one of `flashcards`, `learn`, `quiz`, or `match`.
- `(setId, position)` is unique and deferrable so cards can be reordered in one transaction.
- `CardProgress` is unique per `(userId, cardId)`, and cascades match the data-model rules.
- Indexes exist for owner lookups, `(status, visibility, updatedAt)`, due cards `(userId, dueAt)`, and `SessionAnswer (sessionId)`.
- A generated `tsvector` column with a GIN index supports title and description search.
- A clean database can be built from migrations, and tests prove the constraints reject invalid rows.

### T09 — Add integration-test infrastructure and seed data

- **Priority:** P0
- **Size:** M
- **Labels:** area:quality, type:test
- **Depends on:** T08

Access-control and scoring rules must be tested against a real PostgreSQL, not mocks.

**Acceptance criteria**

- `pnpm test:integration` runs Vitest against a real PostgreSQL (docker-compose locally, a service container in CI) with a clean state per test file or test.
- Factories exist for users, sets, and cards.
- `pnpm db:seed` creates realistic development data, including draft, private, unlisted, and public sets.
- CI runs the integration tests.

### T10 — Add error handling, not-found, and loading conventions

- **Priority:** P0
- **Size:** M
- **Labels:** area:platform, type:chore
- **Depends on:** T05

Give every service and route the same way to report failures, so access-control and validation errors behave consistently.

**Acceptance criteria**

- Services return typed errors (not found, unauthorized, validation, conflict) instead of throwing strings.
- Server actions return one documented result shape with field-level errors.
- `error.tsx`, `not-found.tsx`, and `loading.tsx` exist for each route group.
- Unauthorized access to a set looks identical to "not found" so private sets cannot be discovered.
- Unexpected errors are logged with context and never show internals to the user.

---

## Milestone M2 — Accounts and study sets

### T11 — Set up authentication, sessions, and user creation

- **Priority:** P0
- **Size:** L
- **Labels:** area:auth, type:feature
- **Depends on:** T07, T08

Add the authentication foundation that every protected feature builds on.

**Acceptance criteria**

- Authentication is configured per the ADR: providers, secure session handling, and the database adapter or webhook sync.
- A user record is created or linked safely on first sign-in, following the account-linking policy, and stays in sync with the provider (profile changes and deletion).
- `getCurrentUser()` and `requireUser()` exist in `lib/auth`, work in server components, server actions, and route handlers, and wrap the provider so no other module imports it directly.
- Tests cover success and failure paths using a mocked provider or the provider's test mode, and no secrets appear in logs.

### T12 — Build the sign-in, registration, and sign-out experience

- **Priority:** P0
- **Size:** M
- **Labels:** area:auth, type:feature
- **Depends on:** T11

Let people sign in with the chosen email method and OAuth provider in a way that works for keyboard and screen-reader users.

**Acceptance criteria**

- `/login` (and `/register` only if the ADR requires it) supports the chosen email method and OAuth provider, and a signed-in user can sign out.
- Errors are announced to assistive technology and never expose credentials or secrets.
- Forms use correct labels and `autocomplete`, allow pasting, and use no cognitive tests (WCAG 3.3.8).
- A `callbackUrl` is accepted only if it is a same-origin relative path.
- If the provider's prebuilt components are used, their accessibility is verified in the accessibility audit and any gaps are fixed or documented.
- Protected routes redirect signed-out users to sign-in and return them afterwards. Authorization is also enforced in the data layer, not only in routing.

### T13 — Set up Playwright with a smoke test and an authenticated fixture

- **Priority:** P0
- **Size:** M
- **Labels:** area:quality, type:test
- **Depends on:** T03, T09, T12

Get one end-to-end test running early so the full journeys later are not a surprise.

**Acceptance criteria**

- Playwright runs locally and in CI, and keeps traces and screenshots on failure.
- A fixture creates a signed-in session programmatically using the provider's supported test approach (no real OAuth or email in tests).
- Each test uses isolated data.
- A smoke test covers: the home page loads, the login page renders, and a signed-in user reaches a protected page.

### T14 — Deploy a preview environment

- **Priority:** P1
- **Size:** M
- **Labels:** area:platform, type:chore
- **Depends on:** T03, T07, T08, T12

Deploy early and often so integration problems show up while they are small.

**Acceptance criteria**

- The app deploys to the hosting platform with a managed PostgreSQL, and secrets are set in the platform, not in the repository.
- Migrations are applied by the deploy step, not at runtime on every instance.
- OAuth callback URLs (and the webhook endpoint, if the provider uses one) are configured for the deployed domain.
- `/api/health` reports app and database status without exposing details.
- The README documents the deployment.

### T15 — Enforce study set access on the server

- **Priority:** P0
- **Size:** M
- **Labels:** area:auth, area:study-sets, area:security, type:feature
- **Depends on:** T11, T09

Create one shared access policy and use it on every read and write path.

**Acceptance criteria**

- Pure functions such as `canViewSet` and `canEditSet` implement the table in flow.md section 4 and are unit tested.
- Every set read goes through a server-only accessor that applies the policy.
- Inaccessible sets return the same response as missing sets.
- Server actions and route handlers authorize on their own, so calling them directly without the UI is rejected.
- Integration tests cover each set state (draft, private, unlisted, public) for each caller (owner, other user, guest).

### T16 — Implement study set create, update, and delete services

- **Priority:** P0
- **Size:** L
- **Labels:** area:study-sets, type:feature
- **Depends on:** T15, T10

Build the server rules for creating, changing, and deleting sets so the editor UI can stay thin.

**Acceptance criteria**

- Inputs use the documented Zod schemas, including BCP-47 validation for the term and definition languages.
- Updating a set diffs cards by id, so edits and reordering **keep `CardProgress`** (cards are never deleted and recreated).
- Reordering cards works in one transaction using the deferrable unique constraint.
- `cardCount` is updated in the same transaction as card changes.
- A published set cannot be reduced below 2 cards, and a draft may have zero.
- Owners only: others cannot update or delete a set.
- Integration tests cover create, update, reorder with progress preserved, delete cascades, and unauthorized changes.

### T17 — Build the study set editor

- **Priority:** P0
- **Size:** L
- **Labels:** area:study-sets, type:feature
- **Depends on:** T16

Let owners create and edit sets, including incomplete drafts.

**Acceptance criteria**

- `/my-sets/new` and `/my-sets/[setId]/edit` let owners edit title, description, languages, and ordered cards, and save as a private draft.
- Cards can be added, removed, and reordered with buttons. Drag and drop is optional and never the only way (WCAG 2.5.7).
- Validation errors are shown inline, linked to their fields, summarized, and announced, and focus moves to the first error.
- Unsaved changes trigger a warning, and delete requires confirmation.
- Pending and error states are visible, and component tests cover editing, validation, and unauthorized access.

### T18 — Add bulk paste to the editor

- **Priority:** P0
- **Size:** M
- **Labels:** area:study-sets, type:feature
- **Depends on:** T17

Covers the README story "paste a list of terms and definitions and get a study set in under a minute". It is not in the previous backlog.

**Acceptance criteria**

- Users can paste rows separated by tab, comma, or a chosen delimiter and see a preview with the card count.
- Blank lines are ignored, and invalid rows are listed with their line numbers.
- Confirming appends cards to the editor without saving.
- The 1000-card limit and field limits apply.
- Unit tests cover delimiters, quotes, blank lines, and long input.

### T19 — Publish sets with explicit visibility

- **Priority:** P0
- **Size:** M
- **Labels:** area:study-sets, type:feature
- **Depends on:** T17

Let an owner preview a draft and publish it as private, unlisted, or public.

**Acceptance criteria**

- An owner can preview a draft at `/sets/[setId]` with a clear "draft preview" notice.
- Publishing requires a title and at least 2 valid cards, runs in a transaction, and sets the chosen visibility and `publishedAt`. A failed publish leaves the set a private draft.
- Changing visibility after publishing is supported, and the rule for unpublishing back to a draft is decided and documented.
- Unlisted set pages send `noindex`.
- Tests cover validation, state transitions, and access.

### T20 — Build the public set listing and set detail pages

- **Priority:** P0
- **Size:** M
- **Labels:** area:study-sets, type:feature
- **Depends on:** T15, T19

Let anyone browse published public sets and open a set to start studying.

**Acceptance criteria**

- `/sets` lists published public sets with cursor pagination, newest first, and `/sets/[setId]` shows details and links to the study modes.
- Term and definition text carries the correct `lang` attribute.
- Empty, loading, and error states are clear and accessible.
- Page data and the rendered HTML never contain private sets or answers, and pages that vary by viewer are not served from a shared cache.
- Each page has a unique `<title>`.

### T21 — Add search for public sets

- **Priority:** P1
- **Size:** M
- **Labels:** area:study-sets, type:feature
- **Depends on:** T20

Let visitors find public sets by title and description.

**Acceptance criteria**

- `?q=` is validated (trimmed, length-limited) and queries the full-text index with parameterized SQL.
- Only published public sets are returned, never unlisted, private, or draft sets.
- The result count is announced to assistive technology, and the no-results state helps the user.
- Pagination keeps the query.
- Integration tests prove non-public sets are never returned.

---

## Milestone M3 — Study experiences

### T22 — Implement and test pure study-session logic

- **Priority:** P0
- **Size:** S
- **Labels:** area:study, type:feature
- **Depends on:** —

Build the framework-independent core that all study modes share.

**Acceptance criteria**

- Functions for ordering and shuffling, navigation, known/unknown marking, restart, and summary have no React, database, or browser dependencies.
- Shuffling takes an injectable random source, does not mutate its input, and is deterministic in tests.
- Empty and single-card sets are handled explicitly.
- Unit tests cover boundaries, navigation, restart, and summary values.

### T23 — Add the guest study-state storage utility

- **Priority:** P0
- **Size:** S
- **Labels:** area:study, type:feature
- **Depends on:** T22

Hold temporary guest progress in the browser without ever trusting it on the server.

**Acceptance criteria**

- A typed wrapper over `sessionStorage` stores state per set and mode with a schema version, and validates what it reads with Zod.
- Entries older than 24 hours are discarded, because `sessionStorage` has no expiry of its own.
- Corrupted data or unavailable storage falls back safely (in-memory) without crashing.
- It is safe during server rendering.
- Its documentation states that stored data is untrusted and never used for scoring or persisted progress.

### T24 — Build the accessible flashcard study mode

- **Priority:** P0
- **Size:** L
- **Labels:** area:study, type:feature
- **Depends on:** T22, T23, T20

Let a learner flip through a set, mark cards known or unknown, and finish with a summary, using only a keyboard if they wish.

**Acceptance criteria**

- `/sets/[setId]/flashcards` supports flip, previous/next, shuffle, restart, known/unknown, and a completion screen with totals.
- A learner can finish a session using only the keyboard, and every action also has a visible button.
- Single-character shortcuts (K, U) and arrow keys work only while the player has focus, and Space does not scroll the page while the card is focused (WCAG 2.1.4).
- The current position ("card 3 of 20"), flipped state, and results are announced, and only the visible face is exposed to screen readers.
- The flip animation respects `prefers-reduced-motion`.
- Public and unlisted sets work without signing in, and guest state uses the T23 utility.
- Component tests cover keyboard interaction and state transitions.

### T25 — Implement Learn-mode scheduling logic

- **Priority:** P0
- **Size:** M
- **Labels:** area:study, area:progress, type:feature
- **Depends on:** T22

Implement the spaced-repetition rules as pure, testable functions before any UI or database depends on them.

**Acceptance criteria**

- Pure functions implement boxes 1 to 5: a correct answer moves up one box (box 5 stays at 5), and a wrong answer returns to box 1.
- Intervals are 0, 1, 3, 7, and 14 days, and `dueAt` is computed from an injected clock.
- Due-card selection includes cards that have no progress row yet (new cards are due immediately).
- Session ordering and a session size cap are decided and documented.
- Unit tests cover every boundary, including box 5 and the due-now case.

### T26 — Persist signed-in Learn progress on the server

- **Priority:** P0
- **Size:** M
- **Labels:** area:progress, area:study, type:feature
- **Depends on:** T15, T25, T08

Save signed-in Learn progress on the server, which is the only place that decides a card's next box and due date.

**Acceptance criteria**

- A server action accepts only `{ setId, cardId, result }`. The **server** computes the new box and `dueAt` and never accepts them from the client.
- The action checks set access, that the card belongs to the set, and that the user is signed in.
- `CardProgress` rows are created lazily on the first answer, and duplicate submissions do not double-count.
- Answers are recorded in a `StudySession` of mode Learn with `SessionAnswer` rows.
- Guests never write to the database.
- Integration tests cover scheduling, access, and duplicate submissions.

### T27 — Build the Learn-mode player

- **Priority:** P0
- **Size:** L
- **Labels:** area:study, area:progress, type:feature
- **Depends on:** T26, T23, T20

Provide the Learn experience at `/sets/[setId]/learn` for signed-in users and guests.

**Acceptance criteria**

- `/sets/[setId]/learn` shows the due-card count, lets the learner answer, and shows clear correct or incorrect feedback. Whether answers are self-graded or typed is decided and documented first.
- When no cards are due, the page explains why and offers a next action (study ahead, flashcards, or the next due time).
- Signed-in progress persists across sessions, and guests see a notice that progress is temporary for this tab, with a sign-in prompt.
- Keyboard operation, visible focus, and live announcements work.
- Tests cover due-card selection and the main answer flow for signed-in and guest users.

### T28 — Implement quiz generation logic

- **Priority:** P0
- **Size:** M
- **Labels:** area:study, type:feature
- **Depends on:** T22

Generate quiz questions as pure functions and keep the answer key separate from what the browser sees. Start simple: one question type, where the learner sees a term and picks its definition.

**Acceptance criteria**

- Pure functions build **multiple-choice questions only** (true/false and written answers come later), with distractors taken from other cards and de-duplicated.
- Each question has `min(4, number of cards)` options, so any published set (2 or more cards) can be quizzed, and this rule is documented.
- Output has two separate types: the public question (no answer) and the server-only answer key.
- Question count is capped, and option order is shuffled using an injectable random source.
- Unit tests cover small sets, duplicates, and determinism.

### T29 — Add server-authoritative quiz attempts and scoring

- **Priority:** P0
- **Size:** L
- **Labels:** area:study, area:security, type:feature
- **Depends on:** T28, T15, T08

Keep correct answers on the server until submission and score from a stored snapshot.

**Acceptance criteria**

- `startQuiz` checks access, stores a `QuizAttempt` snapshot with the answer key, and sends the browser questions without correct answers.
- Guest attempts use an unguessable token (at least 128 bits), stored hashed, sent in an httpOnly cookie, and valid for that attempt only.
- `submitQuiz` scores from the stored snapshot and ignores any client-supplied score. An attempt can be submitted once and only before it expires (one hour).
- Signed-in results create a `StudySession` and `SessionAnswer` rows. Guest attempts are deleted after submission and create no history or card progress.
- Quiz results never change Learn `CardProgress`, and editing a set mid-attempt does not change its scoring.
- Integration tests cover scoring, expiry, tampering, double submission, and authorization.

### T30 — Add guest quiz cleanup and abuse limits

- **Priority:** P1
- **Size:** S
- **Labels:** area:study, area:security, type:chore
- **Depends on:** T29

Stop abandoned guest attempts from piling up and stop one client from flooding the table.

**Acceptance criteria**

- A scheduled job deletes expired attempts, and expired attempts are also rejected and deleted when accessed.
- Limits cap how many attempts a client can start in a time window.
- The cleanup is covered by a test and documented.

### T31 — Build the quiz experience and results

- **Priority:** P0
- **Size:** L
- **Labels:** area:study, type:feature
- **Depends on:** T29, T20

Let learners take a generated quiz and review their result.

**Acceptance criteria**

- `/sets/[setId]/quiz` supports answering with the existing radio component inside a `fieldset` and `legend`, shows progress, and warns before submitting unanswered questions.
- Results show the score, correct answers, and missed cards only after submission.
- Signed-in users get a link to their saved result, and guests see the result once with a note that it is temporary.
- An expired or deleted attempt shows a clear message with a way to start again.
- Pending and error states exist, and tests cover keyboard and screen-reader interaction.

### T32 — Add session summaries and mistake review

- **Priority:** P1
- **Size:** M
- **Labels:** area:study, area:progress, type:feature
- **Depends on:** T24, T27, T31

Show learners how a session went and let them practise only the cards they missed.

**Acceptance criteria**

- Each mode shows an accurate summary of totals and answers when it completes.
- `/sessions/[sessionId]` is visible only to its owner and otherwise looks like "not found".
- Learners can review missed cards and start a flashcard session with only those cards.
- Guest flashcard and Learn sessions never appear in account history.
- Sessions that were abandoned (never finished) have a documented rule.
- Tests cover summary data and ownership.

---

## Milestone M4 — Progress and launch quality

### T33 — Build the signed-in dashboard

- **Priority:** P1
- **Size:** M
- **Labels:** area:progress, type:feature
- **Depends on:** T26, T32

Give signed-in users a home page showing what to study next and how they are doing.

**Acceptance criteria**

- `/dashboard` shows due cards (cards with `dueAt` at or before now), recent sessions, and the user's own sets.
- Sets the user can no longer access (made private or deleted) are excluded.
- Empty states guide new users to create or study a set.
- Data is loaded on the server with access checks, and tests prove users only see their own data.

### T34 — Export study sets as CSV

- **Priority:** P1
- **Size:** S
- **Labels:** area:study-sets, type:feature
- **Depends on:** T16, T15

Let people take their cards out of the app in a standard format.

**Acceptance criteria**

- `/api/sets/[setId]/export` follows the same access rules as the set (owner only for draft and private).
- Output is UTF-8 and escapes commas, quotes, and newlines.
- Cells that start with `=`, `+`, `-`, or `@` are neutralized to prevent spreadsheet formula injection, and the import task reverses it.
- The filename is sanitized, and tests cover special characters and access.

### T35 — Import study sets from CSV

- **Priority:** P1
- **Size:** M
- **Labels:** area:study-sets, type:feature
- **Depends on:** T17, T34

Let owners bring cards in from a spreadsheet or another tool, safely.

**Acceptance criteria**

- Import checks required columns, encoding, file size (for example 1 MB), row count (1000), and field lengths before saving.
- Errors name the row and problem, and nothing is saved partially.
- The user sees a preview before the cards are added to the editor.
- A set exported by T34 imports back unchanged (round trip).
- Tests cover malformed quotes, byte-order marks, CRLF, empty rows, and boundary lengths.

### T36 — Add SEO and page metadata

- **Priority:** P1
- **Size:** S
- **Labels:** area:quality, type:feature
- **Depends on:** T20, T19

Make pages findable and properly titled while keeping non-public sets out of search engines.

**Acceptance criteria**

- Every route has a unique title and description, and public set pages have Open Graph tags.
- `sitemap.xml` lists only published public sets, and `robots.txt` is present.
- Unlisted, private, dashboard, and auth pages are `noindex`.
- Tests check metadata for each visibility.

### T37 — Add legal and data notice pages

- **Priority:** P1
- **Size:** S
- **Labels:** area:docs, type:docs
- **Depends on:** T20

Tell users what the site stores and who is responsible for published content.

**Acceptance criteria**

- Terms of Use and Privacy Policy pages exist and are linked in the footer.
- The Privacy Policy states what is stored, including guest `sessionStorage`, the quiz token cookie, and account data.
- The Terms state that users own and are responsible for the sets they publish.
- Both are reviewed, since a template is not legal advice.

### T38 — Harden security

- **Priority:** P1
- **Size:** M
- **Labels:** area:security, type:chore
- **Depends on:** T12, T21, T29

Close common abuse and attack paths before real users arrive.

**Acceptance criteria**

- Rate limits protect sign-in and email sending, search, quiz start, and publish.
- Security headers (CSP, frame, referrer, permissions) are set and tested.
- Every server action and route handler was reviewed against a checklist: authenticates, authorizes, validates input, limits input size.
- Dependency auditing and secret scanning run in CI.

### T39 — Complete the accessibility and responsive audit

- **Priority:** P0
- **Size:** L
- **Labels:** area:quality, type:test
- **Depends on:** T12, T17, T20, T24, T27, T31

This is the final audit of work that was already checked task by task. It also covers T32 and T33 if they are finished.

**Acceptance criteria**

- Automated axe checks run on every main route in Storybook or Playwright.
- Manual checks are recorded in `docs/accessibility.md`: keyboard-only walkthroughs, a screen reader on flashcards, Learn, quiz, and the editor, 200 percent zoom and 320 pixel reflow, forced colors, and reduced motion.
- Target size, focus not obscured, page titles, heading structure, and landmarks are checked.
- All core flows work at mobile and desktop widths without horizontal scrolling.
- Issues found are fixed, and remaining exceptions are recorded with an owner.

### T40 — Add end-to-end coverage for the MVP journeys

- **Priority:** P0
- **Size:** L
- **Labels:** area:quality, type:test
- **Depends on:** T13, T15, T19, T24, T31

Prove the main journeys and the authorization boundaries work in a real browser.

**Acceptance criteria**

- A signed-in user creates a draft, publishes it, and studies it.
- A visitor studies a public set without signing in, and cannot open a private set or a draft.
- An unlisted set opens by link and does not appear in search.
- A tampered quiz submission does not change the server's score.
- Signed-in Learn progress survives a reload, and guest Learn progress does not survive a new tab.
- Tests use isolated data, run in CI, and keep traces on failure.

### T41 — Run a performance pass

- **Priority:** P1
- **Size:** M
- **Labels:** area:quality, type:chore
- **Depends on:** T24, T27, T31

Check and record real performance numbers before launch.

**Acceptance criteria**

- Lighthouse reports a performance score of at least 90 on the home page, `/sets`, and set detail, and before and after numbers are recorded.
- Study players load only the client JavaScript they need.
- Pages that depend on the signed-in user are confirmed not to be shared-cached.
- Search and dashboard queries are checked with `EXPLAIN` and have the indexes they need.

### T42 — Add account settings

- **Priority:** P2
- **Size:** M
- **Labels:** area:auth, type:feature
- **Depends on:** T12

Give users control over their account and data.

**Acceptance criteria**

- `/settings` shows account details and sign-out.
- A user can delete their account after a confirmation, the effect on their published sets is decided and documented, and the identity is also removed at the authentication provider.
- A user can export their own data (sets and progress) as JSON.

### T43 — Let users report a public set

- **Priority:** P2
- **Size:** M
- **Labels:** area:security, type:feature
- **Depends on:** T20, T37

Give the community a way to flag unsuitable public content.

**Acceptance criteria**

- A report form on public sets stores a reason in a new `Report` table (added to data-model.md).
- Admins can list and dismiss reports, and an admin can unpublish a set.
- Reporting is rate limited, and tests cover access to the admin view.

### T44 — Add error monitoring

- **Priority:** P2
- **Size:** S
- **Labels:** area:platform, type:chore
- **Depends on:** T14

Learn about production errors before users report them.

**Acceptance criteria**

- Client and server errors are reported with source maps and no personal data.
- An uptime check watches `/api/health`.

### T45 — Release to production

- **Priority:** P1
- **Size:** M
- **Labels:** area:platform, area:quality, type:chore
- **Depends on:** T14, T36, T37, T38, T39, T40, T41

Ship the app to production with a safe, repeatable process.

**Acceptance criteria**

- A production environment has its own database, secrets in the hosting platform, and a documented migration and rollback procedure.
- A post-deploy smoke test and the health check pass.
- Storybook is published, and the README links to the live demo and Storybook.
- The release is tagged and has release notes, and README setup and deployment steps match the working pipeline.

### T46 — Package the project for your portfolio

- **Priority:** P1
- **Size:** S
- **Labels:** area:docs, type:docs
- **Depends on:** T45

Turn the finished project into something a hiring manager can evaluate in a few minutes.

**Acceptance criteria**

- The README has screenshots or a short demo clip and the architecture diagram.
- A short case study covers the problem, key decisions (linking the ADRs), trade-offs, accessibility results, and metrics.
- A 2 to 3 minute demo video exists.

---

## Later backlog (not MVP)

Create separate issues only after M4: Match game, folders and tags, card images with required alt text, starred cards, dark mode, study streaks, Sanity editorial content, text-to-speech, offline PWA, real-time collaboration, and AI card generation (after product, privacy, and cost requirements are defined).

## Importing into GitHub

Requirements: the [GitHub CLI](https://cli.github.com) (`gh`) logged in with the `repo` and `project` scopes, and Node.js 18 or later.

1. In your GitHub Project, create two single-select fields: **Priority** with options `P0`, `P1`, `P2`, and **Size** with options `S`, `M`, `L`. Status and Milestone already exist.
2. Preview what will be created (nothing is changed):

   ```bash
   node scripts/create-github-issues.mjs
   ```

3. Create the labels, milestones, and issues, and add them to the project:

   ```bash
   node scripts/create-github-issues.mjs --apply --project <number> --owner <your-login>
   ```

The script validates the backlog first (dependency order, P0 not depending on P1 or P2), saves created issue numbers in `scripts/.backlog-map.json`, and skips tasks that already exist, so it is safe to run again.
