import { render, screen } from "@testing-library/react";
import { ProgressOverview } from "./progress-overview";
import { DeckStats } from "@/types/config";

describe("ProgressOverview", () => {
  const stats = [
    {
      deckId: "deck-cosmology-001",
      title: "Secrets of the Cosmos",
      totalCards: 20,
      correctAnswers: 2,
      sessionCount: 0,
      score: 10,
    },
  ] as DeckStats[];

  it("renders progress overview for a deck", () => {
    render(<ProgressOverview stats={stats} />);

    expect(screen.getByText("Secrets of the Cosmos")).toBeInTheDocument();
  });

  it("renders nothing when there are no decks", () => {
    const { container } = render(<ProgressOverview stats={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("add correct url to the deck link", () => {
    render(<ProgressOverview stats={stats} />);

    const link = screen.getByRole("link", {
      name: /Open: Secrets of the Cosmos/i,
    });
    expect(link).toHaveAttribute("href", "/learn/deck-cosmology-001");
  });

  it("renders the correct progress value", () => {
    render(<ProgressOverview stats={stats} />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("value", "10");
  });
});
