import { render, fireEvent } from "@testing-library/react";
import { Radio } from "./radio";

describe("Radio", () => {
  it("renders the radio input", () => {
    const RadioElement = render(<Radio id="radio-1">Option 1</Radio>);
    const radioInput = RadioElement.getByRole("radio");

    expect(radioInput).toBeInTheDocument();
  });

  it("renders the label text", () => {
    const RadioElement = render(<Radio id="radio-1">Option 1</Radio>);

    expect(RadioElement.getByText("Option 1")).toBeInTheDocument();
  });

  it("the label is associated with the radio input", () => {
    const RadioElement = render(<Radio id="radio-2">Option 2</Radio>);
    const radioInput = RadioElement.getByRole("radio");
    const label = RadioElement.container.querySelector("label");

    expect(label).toHaveAttribute("for", "radio-2");
    expect(radioInput).toHaveAttribute("id", "radio-2");
  });

  it("toggles the checked state when clicked", () => {
    const RadioElement = render(<Radio id="radio-4">Option 4</Radio>);
    const radioInput = RadioElement.getByRole("radio");

    expect(radioInput).not.toBeChecked();
    fireEvent.click(radioInput);
    expect(radioInput).toBeChecked();
  });
});
