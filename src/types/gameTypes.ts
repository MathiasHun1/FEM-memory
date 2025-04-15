export interface GameSingle {
  table: Field[];
  roundState: 'first' | 'last';
  moves: number;
  elapsedTime?: number;
}

export interface Game {
  players: Player[];
  mode: 'icons' | 'numbers';
  size: 4 | 6;
}

export interface Player {
  playerID: number;
  table: Field[];
  isActive: boolean;
  moves: number;
  pairs: number;
  isWinning: boolean;
}

export interface Field {
  position: number;
  value: number | string;
  isActive: boolean;
  isFound: boolean;
}

export type GameAction =
  | { type: 'initSingle'; payload: { mode: 'numbers' | 'icons'; size: 4 | 6 } }
  | { type: 'setFieldActive'; payload: { id: number } }
  | { type: 'setFound'; payload: { id: number } }
  | { type: 'incrementMoves' }
  | { type: 'setAllInactive' }
  | { type: 'resetGame' }
  | {
      type: 'initGame';
      payload: { mode: 'numbers' | 'icons'; size: 4 | 6; players: number };
    };
