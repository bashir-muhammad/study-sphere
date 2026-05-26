Write these first:

Button tests in button.tsx

- Renders as button by default
- Renders as anchor when as="a"
- Renders as Next link when as="link"
- Disabled link path renders non-clickable fallback
- Applies variant/size/disabled classes correctly
  Radio tests in radio.tsx
- Label is connected to input via id/htmlFor
- Renders correct variant class
- Passes input props (name, checked, disabled, onChange)
  RatingGroup tests in rating-group.tsx
- Renders max number of buttons
- Calls onChange with clicked value
- Sets aria-pressed correctly for selected value
  Progress tests in progress.tsx
- Applies width style from value
- Renders progress native element with max=100
- Variant class applied
  Footer tests in footer.tsx
- Uses default copyright
- Renders passed links
- Handles missing links safely
