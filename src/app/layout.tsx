import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppProvider } from "@/context/app-context";
import { AppConfig } from "@/types/config";
import { plusJakartaSans, manrope } from "@/styles/fonts";
import "@/styles/tokens.css";
import "@/styles/globals.css";
import localData from "@/data/beecepter.json";

export const metadata: Metadata = {
  title: "Dimando Quesionnare",
  description: "Developed by Muhammad Bashir",
};

async function getAppData(): Promise<AppConfig> {
  try {
    const result = await fetch("https://test-config.free.beeceptor.com/", {
      cache: "no-store",
    });
    if (!result.ok) {
      console.warn(
        `Fetch failed with status ${result.status}, falling back to local data`,
      );
      return localData as AppConfig;
    }
    return result.json();
  } catch (error) {
    console.warn("Fetch threw an error, falling back to local data:", error);
    return localData as AppConfig;
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
        <AppProvider config={config}>{children}</AppProvider>
      </body>
    </html>
  );
}
