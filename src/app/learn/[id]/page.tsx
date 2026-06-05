"use client";
import { ChangeEvent } from "react";
import { useParams } from "next/navigation";
import { useApp } from "@/context/app-context";
import { useState } from "react";
import { Button } from "@/components/button/button";
import { Card, CardHeader, CardTitle } from "@/components/card/card";
import { RadioFieldset, Radio } from "@/components/radio/radio";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { Progress, ProgressLabel } from "@/components/progress/progress";
import { PageTitle, PageDescription } from "@/components/page-title/page-title";

import Styles from "./page.module.css";

const Learn = () => {
  const params = useParams();
  const { state } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const deck = state.decks?.find((d) => d.id === params.id);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  const cards = deck?.cards || [];

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    setSelectedOption(selected);

    if (selected === cards[currentIndex].answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  return (
    <>
      <header>
        <PageTitle>{deck?.title}</PageTitle>
        {deck?.description && (
          <PageDescription>{deck?.description}</PageDescription>
        )}
      </header>
      <section className={Styles.deckContainer}>
        <div className={Styles.progressContainer}>
          <ProgressLabel>
            {correctAnswers} Correct / {cards.length}
          </ProgressLabel>
          <Progress
            value={(((currentIndex + 1) / cards.length) * 100).toFixed(0)}
          />
        </div>
        <Card>
          <CardHeader className={Styles.cardHeader}>
            <p>Question No: {currentIndex + 1}</p>
          </CardHeader>
          <CardTitle>{cards[currentIndex].question}</CardTitle>
        </Card>
        <RadioFieldset className={Styles.optionsFieldset}>
          {cards[currentIndex].options.map((option) => {
            const dataCorrect = selectedOption
              ? option === cards[currentIndex].answer
                ? "true"
                : "false"
              : "";
            return (
              <Radio
                variant="alphabet"
                key={option}
                id={option}
                name={`option-${currentIndex}`}
                value={option}
                checked={selectedOption === option}
                data-correct={dataCorrect}
                onChange={handleOptionChange}
              >
                {option}
              </Radio>
            );
          })}
        </RadioFieldset>
        <div>
          <Button
            variant="ghost"
            disabled={currentIndex === 0}
            onClick={() => {
              setCurrentIndex((prev) => prev - 1);
              setSelectedOption("");
            }}
          >
            <ArrowLeft width={24} height={24} />
            Previous Question
          </Button>
          <Button
            variant="primary"
            disabled={currentIndex >= cards.length - 1}
            onClick={() => {
              setCurrentIndex((prev) => prev + 1);
              setSelectedOption("");
            }}
          >
            Next Question
            <ArrowRight width={24} height={24} />
          </Button>
        </div>
      </section>
    </>
  );
};

export default Learn;
