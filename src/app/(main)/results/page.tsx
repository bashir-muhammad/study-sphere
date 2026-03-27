"use client";

import { useApp } from "@/context/app-context";
import { Button } from "@/components/button/button";
import ArrowLeft from "@/assets/icons/arrow-left.svg";

import Styles from "./page.module.css";

export default function Results() {
  const { state, dispatch } = useApp();
  if (!state.isHydrated) return null;
  const completedQuestions = Object.keys(state.responses).length;
  const handleDelete = (qId: string) => {
    dispatch({ type: "DELETE_QUESTIONNAIRE", payload: { qId } });
  };

  return (
    <main className={Styles.main}>
      <Button className={Styles.backButton} as="a" size="sm" href="/">
        <ArrowLeft />
        Home
      </Button>
      <h1>{state.config?.questionnaire.results.title}</h1>
      <p>
        {state.config?.questionnaire.results.description.replace(
          "{number}",
          completedQuestions.toString(),
        )}
      </p>

      <div
        className={Styles.categoryGroupButton}
        role="navigation"
        aria-label="Category filters"
      >
        {Object.entries(state.responses).map(([qId]) => {
          const questionData = state.config?.questionnaires.find(
            (q) => q.id === qId,
          );
          return (
            <Button key={qId} as="a" href={`#${qId}`}>
              {questionData?.title}
            </Button>
          );
        })}
      </div>
      <div className={Styles.results}>
        {Object.entries(state.responses).map(([qId, answers]) => {
          const questionData = state.config?.questionnaires.find(
            (q) => q.id === qId,
          );

          const ratings = Object.values(answers);
          const averageRating =
            ratings.reduce((sum, { rating }) => sum + rating, 0) /
            ratings.length;

          return (
            <div key={qId}>
              <div id={qId} className={Styles.resultsHeader}>
                <div>
                  <h2 className={Styles.categoryTitle}>
                    {questionData?.title}
                  </h2>
                  <p className={Styles.categoryScore}>
                    Score: {averageRating.toFixed(2)}
                  </p>
                </div>
                <div>
                  <Button size="sm" onClick={() => handleDelete(qId)}>
                    Clear data
                  </Button>
                </div>
              </div>
              <div className={Styles.questionResults}>
                {Object.values(answers).map((answer, index) => (
                  <div key={index} className={Styles.questionResult}>
                    <p>Question {index + 1}</p>
                    <h3>{questionData?.questions[index].question}</h3>
                    <div className={Styles.result}>
                      <span className={Styles.resultRating}>
                        <span className="sr-only">Result rating: </span>
                        {answer.rating}
                      </span>
                      <p className={Styles.resultText}>
                        <span className={Styles.resultTextOption}>
                          Follow up option
                        </span>
                        <span>{answer.followUp}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
