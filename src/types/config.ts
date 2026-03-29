export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  options: string[];
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  cards: Flashcard[];
  createdAt: number; // Unix timestamp
}

export interface DeckStats {
  deckId: string;
  totalCards: number;
  correctAnswers: number;
  sessionCount: number;
  score: number; // Percentage (0-100)
}

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  logoUrl: string;
}

export interface RootAppData {
  siteConfig: SiteConfig;
  navigation: {
    header: NavItem[];
    footer: NavItem[];
  };
  decks: Deck[];
  stats: DeckStats[];
}

export interface AppState {
  data: RootAppData | null;
  loading: boolean;
  error: string | null;
}
