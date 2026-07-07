"use client";
import Styles from "./page.module.css";
import { useApp } from "@/context/app-context";
import { PageTitle, PageDescription } from "@/components/page-title/page-title";
import { DecksList } from "@/app/modules/decks-list/decks-list";
import { ProgressOverview } from "@/app/modules/progress-overview/progress-overview";

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
      {state.stats.length > 0 && <ProgressOverview stats={state.stats} />}
      {state.studySets.length > 0 && <DecksList decks={state.studySets} />}
    </div>
  );
}
