"use client";
import { useParams } from "next/navigation";
import { useApp } from "@/context/app-context";
import { useState } from "react";
import { Button } from "@/components/button/button";
import { Card, CardHeader, CardTitle } from "@/components/card/card";
import { RadioFieldset, Radio } from "@/components/radio/radio";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { Progress } from "@/components/progress/progress";

import Styles from "./page.module.css";

const Learn = () => {
  const params = useParams();
  const { state } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const deck = state.decks?.find((d) => d.id === params.id);
  const cards = deck?.cards || [];
  return (
    <main>
      <h1>{deck?.title}</h1>
      <p>{deck?.description}</p>
      <div className={Styles.deckContainer}>
        <Progress value={`${((currentIndex + 1) / cards.length) * 100}%`} />
        <Card>
          <CardHeader className={Styles.cardHeader}>
            <p>Quetion No: {currentIndex + 1}</p>
          </CardHeader>
          <CardTitle>{cards[currentIndex].question}</CardTitle>
        </Card>
        <RadioFieldset className={Styles.optionsFieldset}>
          {cards[currentIndex].options.map((option) => (
            <Radio
              variant="alphabet"
              key={option}
              id={option}
              name={`option-${currentIndex}`}
            >
              {option}
            </Radio>
          ))}
        </RadioFieldset>
        <div>
          <Button
            variant="ghost"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
          >
            <ArrowLeft width={24} height={24} />
            Previous Question
          </Button>
          <Button
            variant="primary"
            disabled={currentIndex >= cards.length - 1}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
          >
            Next Question
            <ArrowRight width={24} height={24} />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Learn;
