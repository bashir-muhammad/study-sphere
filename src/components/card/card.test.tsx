import { render } from "@testing-library/react";
import { Card, CardTitle, CardDescription } from "./card";
import Styles from "./card.module.css";

describe("Card", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <Card>
        <CardTitle>Test Title</CardTitle>
        <CardDescription>Test Description</CardDescription>
      </Card>,
    );

    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Test Description")).toBeInTheDocument();
  });

  it("applies disabled class when variant is disabled", () => {
    const { container } = render(<Card variant="disabled">Disabled Card</Card>);
    const cardElement = container.querySelector("div");
    expect(cardElement).toHaveClass(Styles.disabled);
  });

  it("renders with different variants", () => {
    const { container: defaultContainer } = render(
      <Card variant="default">Default Card</Card>,
    );
    const { container: primaryContainer } = render(
      <Card variant="primary">Primary Card</Card>,
    );

    expect(defaultContainer.querySelector("div")).toHaveClass(Styles.default);
    expect(primaryContainer.querySelector("div")).toHaveClass(Styles.primary);
  });
});
