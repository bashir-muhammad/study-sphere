import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RatingGroup } from "./rating-group";

describe("RatingGroup", () => {
  it("renders the correct number of rating buttons based on max prop", () => {
    const { getAllByRole } = render(<RatingGroup value={0} max={5} />);
    const buttons = getAllByRole("button");

    expect(buttons).toHaveLength(5);
  });

  it("sets aria-pressed to true for the selected rating", () => {
    const { getByRole } = render(<RatingGroup value={3} max={5} />);
    const button = getByRole("button", { name: "3" });

    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onChange with the correct value when a rating is clicked", async () => {
    const onChange = vi.fn();
    const { getByRole } = render(
      <RatingGroup value={0} max={5} onChange={onChange} />,
    );
    await userEvent.click(getByRole("button", { name: "4" }));

    expect(onChange).toHaveBeenCalledWith(4);
  });
});
