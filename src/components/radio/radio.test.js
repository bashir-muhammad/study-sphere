import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Radio } from "./radio";

describe("Radio", () => {
  it("renders the correct label", () => {
    const radio = createElement(Radio, { id: "radio-1" }, "Option 1");
    expect(radio.props.children).toBe("Option 1");
    expect(radio.props.id).toBe("radio-1");
  });

  it("toggles the checked state", () => {
    const uncheckedRadio = renderToStaticMarkup(
      createElement(Radio, { id: "radio-2", checked: false }, "Option 2")
    );
    const checkedRadio = renderToStaticMarkup(
      createElement(Radio, { id: "radio-3", checked: true }, "Option 3")
    );

    expect(uncheckedRadio).not.toContain("checked");
    expect(checkedRadio).toContain("checked");
  });
});