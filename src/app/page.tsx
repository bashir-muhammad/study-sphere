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
import { Badge } from "@/components/badge/badge";

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
    </main>
  );
}
