"use client";
import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";
import { RootAppData } from "@/types/config";



const AppContext = createContext<{
  state: RootAppData;
} | null>(null);

function appReducer(state: RootAppData): RootAppData {
  return state;
}

export function AppProvider({
  children,
  config,
}: {
  children: ReactNode;
  config: RootAppData;
}) {
  const [state] = useReducer(appReducer, {
    siteConfig: config.siteConfig,
    decks: config.decks,
    navigation: config.navigation,
    stats: config.stats,
  });

  return (
    <AppContext.Provider value={{ state }}>{children}</AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within the AppProvider");
  return context;
};
