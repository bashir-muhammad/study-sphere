import { render, screen } from "@testing-library/react";
import { DecksList } from "./decks-list";
import { Deck } from "@/types/config";

describe("DecksList", () => {
  const decks = [
    {
      id: "deck-cosmology-001",
      title: "Secrets of the Cosmos",
      description: "Explore the physics of black holes.",
      createdAt: 1711612800000,
      cards: [
        {
          id: "1",
          question: "What is a black hole?",
          answer:
            "A region in space where gravity is so strong that nothing can escape.",
        },
        {
          id: "2",
          question: "What is dark matter?",
          answer:
            "A form of matter that does not emit or absorb light, but has gravitational effects.",
        },
      ],
    },
  ] as Deck[];

  it("renders a list of decks", () => {
    render(<DecksList decks={decks} />);

    expect(screen.getByText("Secrets of the Cosmos")).toBeInTheDocument();
    expect(
      screen.getByText("Explore the physics of black holes."),
    ).toBeInTheDocument();
  });

  it("renders nothing when there are no decks", () => {
    const { container } = render(<DecksList decks={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("add correct url to the deck link", () => {
    render(<DecksList decks={decks} />);

    const link = screen.getByRole("link", {
      name: /Open: Secrets of the Cosmos/i,
    });
    expect(link).toHaveAttribute("href", "/learn/deck-cosmology-001");
  });

  it("renders all decks in the list", () => {
    const multipleDecks = [
      ...decks,
      {
        id: "deck-quantum-001",
        title: "Quantum Mechanics",
        description: "Dive into the world of quantum physics.",
        createdAt: 1711699200000,
        cards: [
          {
            id: "1",
            question: "What is quantum entanglement?",
            answer:
              "A phenomenon where particles become interconnected and the state of one can instantly influence the state of another, regardless of distance.",
          },
        ],
      },
    ] as Deck[];

    render(<DecksList decks={multipleDecks} />);

    expect(screen.getByText("Secrets of the Cosmos")).toBeInTheDocument();
    expect(screen.getByText("Quantum Mechanics")).toBeInTheDocument();
  });
});
