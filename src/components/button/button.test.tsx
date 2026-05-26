import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders a button element by default", () => {
    render(<Button>Start learning</Button>);
    const ButtonElement = screen.getByRole("button");

    expect(ButtonElement).toBeInTheDocument();
    expect(ButtonElement).toHaveTextContent("Start learning");
  });

  it("renders an anchor when used as a link", () => {
    render(
      <Button as="a" href="/learn/1">
        Open lesson
      </Button>,
    );
    const LinkElement = screen.getByRole("link");

    expect(LinkElement).toBeInTheDocument();
    expect(LinkElement).toHaveAttribute("href", "/learn/1");
    expect(LinkElement).toHaveTextContent("Open lesson");
  });
});
