## Storybook

- Adding local fonts to preview

main.ts

```
const config: StorybookConfig = {
  ...
  staticDirs: [
    "../public",
    { from: "../src/assets/fonts", to: "/src/assets/fonts" },
  ],
  ...
}
```

## CSS

use the `:is()` selector to solve speficity error

```
:is(.defaultRadio) {
  & input:checked ~ .circle {
    box-shadow: inset 0 0 0 4px var(--color-white);
    border: 2px solid var(--color-primary);
  }
}

:is(.alphabet) {
  & input:checked ~ .circle {
    color: var(--color-white);
  }
}

:is(.defaultRadio, .alphabet) {
  background-color: var(--color-primary);
}
```
