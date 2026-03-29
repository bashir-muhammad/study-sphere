import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppProvider } from "@/context/app-context";
import { RootAppData } from "@/types/config";
import { plusJakartaSans, manrope } from "@/styles/fonts";
import "@/styles/tokens.css";
import "@/styles/globals.css";
import Styles from "./layout.module.css";
import localData from "@/data/study-sphere.json";

export const metadata: Metadata = {
  title: "Dimando Quesionnare",
  description: "Developed by Muhammad Bashir",
};

async function getAppData(): Promise<RootAppData> {
  try {
    const result = await fetch(
      "https://bashir.free.beeceptor.com/study-sphere",
      {
        cache: "no-store",
      },
    );
    if (!result.ok) {
      console.warn(
        `Fetch failed with status ${result.status}, falling back to local data`,
      );
      return localData as RootAppData;
    }
    return result.json();
  } catch (error) {
    console.warn("Fetch threw an error, falling back to local data:", error);
    return localData as RootAppData;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const config = await getAppData();
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} ${manrope.variable}`}>
        <div className={Styles.layout}>
          <AppProvider config={config}>{children}</AppProvider>
        </div>
      </body>
    </html>
  );
}
