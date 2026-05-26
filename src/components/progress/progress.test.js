import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Progress } from "./progress";

describe("Progress", () => {
  it("renders a progress element with the correct value and max", () => {
    const html = renderToStaticMarkup(
      createElement(Progress, { value: 50 })
    );
    expect(html).toContain('value="50"');
  });
});
