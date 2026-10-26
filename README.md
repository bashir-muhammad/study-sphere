# Questionnaire Application

A fast, accessible flashcard app where every core study mode is free

## Product Goal

A useful learning platform with flashcard creation, study sessions, quizzes, and progress tracking.

## Career Goal

Demonstrate professional development skills: architecture, TypeScript modeling, accessibility, automated testing, database design, error handling, code reviews, documentation, and deployment.

## Scope

### MVP (must have)

- Sign up, sign in and sign out (email and one OAuth provider)
- Create, edit, and delete study sets with cards (term and definition)
- Save drafts and public set pages and basic search
- Study modes: Flashcards (flip), Learn (spaced repetition), Test (generated questions)
- Shuffle cards and restart a session
- Per-card progress tracking
- CSV import and export
- Accessibility baseline, plus unit tests for the core logic

### Should have (phase 2)

- Restrict private sets to their owners
- Match game
- Folders and tags
- Images on cards
- Dark mode
- Starred cards
- Study streaks

### Could have (later)

- AI card generation
- Import and export study sets.
- Classes and sharing
- Text-to-speech
- Offline PWA
- Share study sets through public links.
- Real-time collaboration

## Core user stories

- As a student, I can paste a list of terms and definitions and get a study set in under a minute.
- As a student, I can flip through cards using only the keyboard.
- As a student, I can study only the cards I am about to forget.
- As a student, I can take a test generated from my set and see which cards I got wrong.
- As a visitor, I can search public sets and study them without paying.
- As a screen-reader user, I know which card I am on, whether it is flipped, and what my score is.

## Architecture and Design Decisions

## Component Library / Storybook

- All shared components are documented in the Storybook
- Accessibilty addon is included for a11y checks.

## Styling

- Pure CSS: Developed with standard `css` without `SCSS` or `less`, leveraging modern features.
- CSS Modules: Implemented the CSS modules pattern to ensure scoped styling and prevent class name collisions.

## Known issues

## Link

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `pnpm dev` - start development server
- `pnpm build` - create production build
- `pnpm start` - run production server
- `pnpm lint` - run ESlint
- `pnpm lint:style` - run Stylelint
- `pnpm format` - format with Prettier
- `pnpm storybook` - run storybook on port 6006
- `pnpm build-storybook` - build static Storybook
