import "@testing-library/jest-dom/vitest";
import { forwardRef, createElement, SVGProps } from "react";

const createSVGMock = () => ({
  default: forwardRef<SVGElement, SVGProps<SVGElement>>(
    function SVGMock(props) {
      return createElement("svg", { ...props });
    },
  ),
});

vi.mock("@/assets/icons/arrow-right.svg", () => createSVGMock());
vi.mock("@/assets/icons/arrow-left.svg", () => createSVGMock());
vi.mock("@/assets/icons/double-arrow-right.svg", () => createSVGMock());
vi.mock("@/assets/icons/list-alt-check.svg", () => createSVGMock());
vi.mock("@/assets/icons/logo.svg", () => createSVGMock());
