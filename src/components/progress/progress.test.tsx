import { render } from "@testing-library/react";
import { Progress } from "./progress";

describe("Progress", () => {
  it("renders a progress element with the correct value", () => {
    const ProgressElement = render(<Progress value={50} />);

    expect(ProgressElement.getByRole("progressbar")).toBeInTheDocument();
    expect(ProgressElement.getByRole("progressbar")).toHaveAttribute(
      "value",
      "50",
    );
  });

  it("the visual representation reflects the correct value", () => {
    const { getByTestId } = render(<Progress value={40} />);
    const progressBar = getByTestId("progress-bar");

    expect(progressBar).toHaveStyle("width: 40%");
  });

  it("the visual representation and the native progress element are in sync", () => {
    const { getByTestId, getByRole } = render(<Progress value={75} />);
    const progressBar = getByTestId("progress-bar");
    const nativeProgress = getByRole("progressbar");

    expect(progressBar).toHaveStyle("width: 75%");
    expect(nativeProgress).toHaveAttribute("value", "75");
  });
});
