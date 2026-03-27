# Questionnaire Application


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
