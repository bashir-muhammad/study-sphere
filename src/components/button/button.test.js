import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "./button";

describe("Button", () => {
	it("renders a button element by default", () => {
		const html = renderToStaticMarkup(
			createElement(Button, { type: "button" }, "Start learning")
		);

		expect(html).toContain("<button");
		expect(html).toContain("Start learning");
	});

	it("renders an anchor when used as a link", () => {
		const html = renderToStaticMarkup(
			createElement(Button, { as: "link", href: "/learn/1" }, "Open lesson")
		);

		expect(html).toContain("<a");
		expect(html).toContain('href="/learn/1"');
		expect(html).toContain("Open lesson");
	});
});