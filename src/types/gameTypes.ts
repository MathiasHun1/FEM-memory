export interface GameSingle {
  table: Field[];
  roundState: 'first' | 'last';
  moves: number;
  elapsedTime?: number;
}

export interface GameMulty {
  players: Player[];
}

export interface Player {
  isActive: boolean;
  table: Field[];
  pairs: number;
  isWinning: boolean;
  name: string;
}

export interface Field {
  position: number;
  value: number | string;
  isActive: boolean;
  isFound: boolean;
}

export type GameAction =
  | { type: 'initSingle'; payload: { mode: 'numbers' | 'icons'; size: 4 | 6 } }
  | { type: 'setActive'; payload: { id: number } }
  | { type: 'setFound'; payload: { id: number } }
  | { type: 'incrementMoves' }
  | { type: 'setAllInactive' }
  | { type: 'toggleRoundState' }
  | { type: 'resetGame' };
