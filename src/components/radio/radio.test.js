import { describe, it, expect } from "vitest";

import { Radio } from "./radio";

describe("Radio", () => {
  it("renders the correct label", () => {
    const radio = new Radio({ label: "Option 1" });
    expect(radio.label).toBe("Option 1");
  });

  it("toggles the checked state", () => {
    const radio = new Radio({ label: "Option 2" });
    expect(radio.checked).toBe(false);
    radio.toggle();
    expect(radio.checked).toBe(true);
    radio.toggle();
    expect(radio.checked).toBe(false);
  });

  it("handles multiple instances independently", () => {
    const radio1 = new Radio({ label: "Option A" });
    const radio2 = new Radio({ label: "Option B" });

    radio1.toggle();
    expect(radio1.checked).toBe(true);
    expect(radio2.checked).toBe(false);

    radio2.toggle();
    expect(radio1.checked).toBe(true);
    expect(radio2.checked).toBe(true);
  });
});