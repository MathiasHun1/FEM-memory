export interface Game {
  table: Field[];
  roundState: 'first' | 'last';
  moves: number;
  elapsedTime?: number;
}

export interface Field {
  position: number;
  value: number | string;
  isActive: boolean;
  isFound: boolean;
}

export type GameAction =
  | { type: 'init'; payload: { mode: 'numbers' | 'icons'; size: 4 | 6 } }
  | { type: 'setActive'; payload: { id: number } }
  | { type: 'setFound'; payload: { id: number } }
  | { type: 'incrementMoves' }
  | { type: 'setAllInactive' }
  | { type: 'toggleRoundState' }
  | { type: 'resetGame' };
