"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";
import { AppConfig, GlobalState, UserAnswer } from "@/types/config";

type Action =
  | { type: "HYDRATE"; payload: Record<string, Record<number, UserAnswer>> }
  | {
      type: "SET_ANSWER";
      payload: { qId: string; index: number; answer: UserAnswer };
    }
  | { type: "DELETE_QUESTIONNAIRE"; payload: { qId: string } }
  | { type: "RESET_ALL" };

const AppContext = createContext<{
  state: GlobalState;
  dispatch: Dispatch<Action>;
} | null>(null);

function appReducer(state: GlobalState, action: Action): GlobalState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, responses: action.payload, isHydrated: true };
    case "SET_ANSWER":
      const { qId, index, answer } = action.payload;
      const updatedResponses = {
        ...state.responses,
        [qId]: { ...(state.responses[qId] || {}), [index]: answer },
      };
      localStorage.setItem("user_responses", JSON.stringify(updatedResponses));
      return { ...state, responses: updatedResponses };
    case "RESET_ALL":
      localStorage.removeItem("user_responses");
      return { ...state, responses: {}, isHydrated: true };

    case "DELETE_QUESTIONNAIRE": {
      const { qId } = action.payload;
      const newResponses = { ...state.responses };

      delete newResponses[qId];

      localStorage.setItem("user_responses", JSON.stringify(newResponses));
      return { ...state, responses: newResponses };
    }
    default:
      return state;
  }
}

export function AppProvider({
  children,
  config,
}: {
  children: ReactNode;
  config: AppConfig;
}) {
  const [state, dispatch] = useReducer(appReducer, {
    config,
    responses: {},
    isHydrated: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("user_responses");
    dispatch({ type: "HYDRATE", payload: saved ? JSON.parse(saved) : {} });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within the AppProvider");
  return context;
};
