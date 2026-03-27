export interface QuestionnaireQuestion {
  question: string;
  validation: string;
  "follow-up-options": string[];
}

export interface Questionnaire {
  id: string;
  color: string;
  "background-type": string;
  title: string;
  description: string;
  questions: QuestionnaireQuestion[];
}

export interface AppConfig {
  questionnaires: Questionnaire[];
  homepage: {
    title: string;
    description: string;
  };
  questionnaire: {
    "sup-title": string;
    description: string;
    results: {
      title: string;
      description: string;
    };
    footer: {
      copyright: string;
      links: {
        name: string;
        url: string;
      }[];
    };
  };
}

export interface UserAnswer {
  rating: number;
  followUp: string;
}

export interface GlobalState {
  config: AppConfig | null;
  responses: Record<string, Record<number, UserAnswer>>;
  isHydrated: boolean;
}
