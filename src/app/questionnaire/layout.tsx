"use client";

import { useParams } from "next/navigation";
import { useApp } from "@/context/app-context";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import Styles from "./layout.module.css";

export default function QuestionnaireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams();
  const { state } = useApp();
  const questionnaire = state.config?.questionnaires.find((q) => q.id === id);
  const backgroundImage = questionnaire?.["background-type"];

  return (
    <div
      className={Styles.layout}
      style={
        {
          "--questionnaire-bg": backgroundImage
            ? `url('/images/${backgroundImage}.jpg')`
            : "url('/images/a1.jpg')",
        } as React.CSSProperties
      }
    >
      <div className={Styles.container}>
        <Header className={Styles.header} />
        {children}
        <Footer data={state.config?.questionnaire.footer} />
      </div>
    </div>
  );
}
