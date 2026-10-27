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
  sets: StudySet[];
}

const DecksList = ({ sets }: DecksListProps) => {
  if (!sets.length) return null;
  return (
    <section className={Styles.decksList}>
      {sets.map((set) => (
        <Card key={set.id} className={Styles.card}>
          <CardTitle>{set.title}</CardTitle>
          <CardDescription>
            <p>{set.description}</p>
          </CardDescription>
          <CardFooter>
            <span>
              {set.cards.length} {set.cards.length === 1 ? "Card" : "Cards"}
            </span>
            <Button
              variant="icon"
              size="sm"
              className={Styles.deckLink}
              as="link"
              href={`/sets/learn/${set.id}`}
              aria-label={`Open: ${set.title}`}
            >
              <ArrowRight width={16} height={16} />
              <span className="sr-only">Open: {set.title}</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

export { DecksList };
