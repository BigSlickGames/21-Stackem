import type { Card } from './Card';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GridPosition {
  cardId: string;
  card: Card;
}

export interface GameState {
  deck: Card[];
  dealtCards: Card[];
  deckCycles: number;
  isDealing: boolean;
  gridPositions: (GridPosition | null)[];
  showSettings: boolean;
  score: number;
  difficulty: Difficulty;
  showAnimation: boolean;
  animationType: '2-card' | '3-card';
}