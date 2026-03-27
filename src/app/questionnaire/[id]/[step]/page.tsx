"use client";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/context/app-context";
import { Button } from "@/components/button/button";
import { RatingGroup } from "@/components/rating-group/rating-group";
import { Radio } from "@/components/radio/radio";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import ArrowLeft from "@/assets/icons/arrow-left.svg";

import Styles from "./page.module.css";

export default function Questionnaires() {
  const { id, step } = useParams();
  const router = useRouter();
  const { state, dispatch } = useApp();

  const stepIndex = Number(step) - 1;
  const questionnaire = state.config?.questionnaires.find((q) => q.id === id);
  const currentQuestion = questionnaire?.questions[stepIndex];
  const total = questionnaire?.questions.length || 0;

  const currentSavedAnswer = state.responses[id as string]?.[stepIndex] || {
    rating: 0,
    followUp: "",
  };

  const updateRating = (rating: number) => {
    dispatch({
      type: "SET_ANSWER",
      payload: {
        qId: id as string,
        index: stepIndex,
        answer: { ...currentSavedAnswer, rating },
      },
    });
  };

  const updateFollowUp = (val: string) => {
    dispatch({
      type: "SET_ANSWER",
      payload: {
        qId: id as string,
        index: stepIndex,
        answer: { ...currentSavedAnswer, followUp: val },
      },
    });
  };

  const handleQuitWithoutSaving = () => {
    dispatch({ type: "DELETE_QUESTIONNAIRE", payload: { qId: id as string } });
    router.push("/");
  };

  const handleQuitAndSave = () => {
    router.push("/");
  };

  if (!currentQuestion) return null;

  return (
    <main className={Styles.main}>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => router.back()}
        disabled={stepIndex === 0}
        className={Styles.backButton}
      >
        <ArrowLeft />
        Back
      </Button>
      <div>
        <p>
          {state.config?.questionnaire["sup-title"]
            ?.replace("{current}", step as string)
            .replace("{total}", total.toString())}
        </p>
        <h2>{currentQuestion.question}</h2>
        <p>{state.config?.questionnaire.description}</p>
        <RatingGroup
          value={currentSavedAnswer.rating}
          max={10}
          onChange={updateRating}
        ></RatingGroup>
        {currentSavedAnswer.rating > 0 && (
          <div className={Styles.rating}>
            {currentQuestion["follow-up-options"].map((option) => (
              <Radio
                key={option}
                id={option}
                onChange={() => updateFollowUp(option)}
                value={option}
                checked={currentSavedAnswer.followUp === option}
              >
                {option}
              </Radio>
            ))}
          </div>
        )}

        {stepIndex + 1 < total ? (
          <Button
            className={Styles.nextButton}
            onClick={() =>
              router.push(`/questionnaire/${id}/${Number(step) + 1}`)
            }
            disabled={
              !currentSavedAnswer.rating || !currentSavedAnswer.followUp
            }
          >
            Next Question
            <ArrowRight />
          </Button>
        ) : (
          <div className={Styles.finishButton}>
            <Button
              className={Styles.finishButton}
              onClick={() => router.push("/results")}
              disabled={
                !currentSavedAnswer.rating || !currentSavedAnswer.followUp
              }
            >
              Finish and Save
            </Button>
          </div>
        )}
      </div>
      {stepIndex + 1 < total && (
        <div className={Styles.buttonGroup}>
          <Button variant="secondary" onClick={handleQuitWithoutSaving}>
            Quit
          </Button>
          <Button variant="secondary" onClick={handleQuitAndSave}>
            Quit and Save
          </Button>
        </div>
      )}
    </main>
  );
}
