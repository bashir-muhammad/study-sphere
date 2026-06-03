import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/card/card";
import { Progress } from "@/components/progress/progress";
import { DeckStats } from "@/types/config";
import { Badge } from "@/components/badge/badge";
import { Button } from "@/components/button/button";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import Styles from "./progress-overview.module.css";

interface ProgressOverviewProps {
  stats: DeckStats[];
}

const ProgressOverview = ({ stats }: ProgressOverviewProps) => {
  if (!stats.length) return null;
  return (
    <section className={Styles.progressOverview}>
      {stats.map((stat) => (
        <Card key={stat.deckId}>
          <CardHeader>
            <Badge>{stat.score}% mastered</Badge>
          </CardHeader>
          <CardTitle>{stat.title}</CardTitle>
          <CardDescription>
            <p>
              {stat.totalCards} {stat.totalCards === 1 ? " Card" : " Cards"}
            </p>
          </CardDescription>
          <CardFooter>
            <Progress value={stat.score} variant="primary" />
            <Button
              variant="icon"
              size="sm"
              className={Styles.progressLink}
              as="link"
              href={`/learn/${stat.deckId}`}
              aria-label={`Open: ${stat.title}`}
            >
              <ArrowRight width={16} height={16} />
              <span className="sr-only">Open the Deck</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

export { ProgressOverview };
