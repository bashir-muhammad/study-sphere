import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { MainNav } from "./main-nav";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/about",
}));

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "About",
  },
];

describe("MainNav", () => {
  it("renders all the links", () => {
    render(<MainNav links={links} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders correct href for each link", () => {
    render(<MainNav links={links} />);
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute(
      "href",
      "/about",
    );
  });

  it("renders nothing when links array is empty", () => {
    render(<MainNav links={[]} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("marks the current path link as active", () => {
    render(<MainNav links={links} />);

    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
