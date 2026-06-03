"use client";
import Styles from "./page.module.css";
import { useApp } from "@/context/app-context";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card/card";
import { Progress, ProgressLabel } from "@/components/progress/progress";
import { PageTitle, PageDescription } from "@/components/page-title/page-title";
import { Badge } from "@/components/badge/badge";
import { DecksList } from "@/app/modules/decks-list/decks-list";

export default function Home() {
  const { state } = useApp();

  return (
    <div className={Styles.page}>
      <header>
        <PageTitle>Welcome back</PageTitle>
        <PageDescription>
          Your focus sanctuary is prepared. You have 3 pending reviews today to
          maintain your momentum.
        </PageDescription>
      </header>
      <section className={Styles.cards}>
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
      </section>
      {state.decks.length > 0 && <DecksList decks={state.decks} />}
    </div>
  );
}
