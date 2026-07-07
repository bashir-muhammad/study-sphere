import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/card/card";
import { Button } from "@/components/button/button";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import Styles from "./decks-list.module.css";
import { StudySet } from "@/types/config";

interface DecksListProps {
  decks: StudySet[];
}

const DecksList = ({ decks }: DecksListProps) => {
  if (!decks.length) return null;
  return (
    <section className={Styles.decksList}>
      {decks.map((deck) => (
        <Card key={deck.id} className={Styles.card}>
          <CardTitle>{deck.title}</CardTitle>
          <CardDescription>
            <p>{deck.description}</p>
          </CardDescription>
          <CardFooter>
            <span>
              {deck.cards.length} {deck.cards.length === 1 ? "Card" : "Cards"}
            </span>
            <Button
              variant="icon"
              size="sm"
              className={Styles.deckLink}
              as="link"
              href={`/learn/${deck.id}`}
              aria-label={`Open: ${deck.title}`}
            >
              <ArrowRight width={16} height={16} />
              <span className="sr-only">Open: {deck.title}</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

export { DecksList };
