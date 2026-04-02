"use client";
import Styles from "./page.module.css";
import { useApp } from "@/context/app-context";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card/card";
import { Progress, ProgressLabel } from "@/components/progress/progress";
import { Badge } from "@/components/badge/badge";
import { Button } from "@/components/button/button";
import ArrowRight from "@/assets/icons/arrow-right.svg";

export default function Home() {
  const { state } = useApp();

  return (
    <main className={Styles.main}>
      <h1 className={Styles.title}>Welcome back</h1>
      <p>
        Your focus sanctuary is prepared. You have 3 pending reviews today to
        maintain your momentum.
      </p>
      <div className={Styles.cards}>
        {state.stats.map((stat) => (
          <Card key={stat.deckId} className={Styles.card}>
            <CardHeader>
              <Badge>{stat.score}% mastered</Badge>
            </CardHeader>
            <CardTitle>{stat.title}</CardTitle>
            <CardDescription>
              <p>
                {stat.totalCards} {stat.totalCards === 1 ? " Card" : " Cards"}
              </p>
              <ProgressLabel>
                Progress
                <span className={Styles.labelleft}>
                  {stat.correctAnswers}/{stat.totalCards}
                </span>
              </ProgressLabel>
              <Progress value={`${stat.score}%`} variant="tertiary" />
            </CardDescription>
          </Card>
        ))}
      </div>

      <div className={Styles.cards}>
        {state.decks?.map((deck) => (
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
                className={Styles.cardlink}
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
      </div>
    </main>
  );
}
