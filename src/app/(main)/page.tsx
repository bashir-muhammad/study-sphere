"use client";
import { ReactNode } from "react";
import styles from "./page.module.css";
import { useApp } from "@/context/app-context";
import {
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/card/card";
import { Button } from "@/components/button/button";
import DoubleArrowRight from "@/assets/icons/double-arrow-right.svg";
import ListAltCheck from "@/assets/icons/list-alt-check.svg";

export default function Home() {
  const { state } = useApp();

  if (!state.isHydrated) return null;

  const getAnswerCount = (qId: string) =>
    Object.keys(state.responses[qId] ?? {}).length;
  const hasResults = Object.keys(state.responses).length > 0;

  const getNextStep = (qId: string, totalQuestions: number) => {
    const savedAnswers = state.responses[qId] ?? {};

    for (let index = 0; index < totalQuestions; index += 1) {
      if (!(index in savedAnswers)) return index + 1;
    }

    return savedAnswers;
  };

  function renderSafeTitle(text: string): ReactNode[] {
    return text.split(/(<mark>.*?<\/mark>|<[^>]+>)/g).map((part, i) => {
      const markMatch = part.match(/^<mark>(.*?)<\/mark>$/);
      if (markMatch) return <mark key={i}>{markMatch[1]}</mark>;

      if (/^<[^>]+>$/.test(part)) return null;

      return part;
    });
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        {renderSafeTitle(state.config?.homepage.title as string) ?? ""}
      </h1>
      <p>{state.config?.homepage.description}</p>
      <div className={styles.cards}>
        {state.config?.questionnaires.map((quesionnare) => {
          const answeredQuestions = getAnswerCount(quesionnare.id);
          const completed = answeredQuestions >= quesionnare.questions.length;
          const variant = completed ? "completed" : "default";

          return (
            <Card
              key={quesionnare.id}
              variant={variant}
              className={styles.card}
              style={{ backgroundColor: quesionnare.color }}
            >
              <CardTitle>{quesionnare.title}</CardTitle>
              <CardDescription>{quesionnare.description}</CardDescription>
              <CardFooter>
                <span>
                  {quesionnare.questions.length} Question
                  {quesionnare.questions.length > 1 && "s"}
                  {completed && " completed"}
                  {!completed &&
                    answeredQuestions > 0 &&
                    `, ${answeredQuestions} answered`}
                </span>
                {!completed && (
                  <Button
                    className={styles.link}
                    variant="icon"
                    as="link"
                    href={`questionnaire/${quesionnare.id}/${getNextStep(quesionnare.id, quesionnare.questions.length)}`}
                    aria-label={`Open: ${quesionnare.title}`}
                  >
                    <DoubleArrowRight />
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
        {hasResults && (
          <Card variant="result" className={styles.card}>
            <CardTitle>See results</CardTitle>
            <CardFooter>
              <span>
                {Object.keys(state.responses).length} Questionnaires completed
              </span>
              <Button
                className={styles.link}
                variant="icon"
                as="link"
                href="/results"
              >
                <ListAltCheck />
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </main>
  );
}
