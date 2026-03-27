"use client";
import { ReactNode } from "react";
import { useApp } from "@/context/app-context";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import Styles from "./layout.module.css";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { state } = useApp();
  return (
    <div className={Styles.layout}>
      <Header className={Styles.header} />
      {children}
      <Footer data={state.config?.questionnaire.footer} />
    </div>
  );
}
