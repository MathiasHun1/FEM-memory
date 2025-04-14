import { useReducer, createContext, ReactNode } from 'react';
import { createSinglePlayer } from '../utils/gameboard';
import { GameSingle, GameAction } from '../types/gameTypes';

const gameReducer = (
  state: GameSingle | null,
  action: GameAction
): GameSingle | null => {
  switch (action.type) {
    case 'initSingle': {
      const mode = action.payload.mode;
      const size = action.payload.size;
      const newGame = createSinglePlayer(mode, size);
      return newGame;
    }

    case 'initMulty': {
      const mode = action.payload.mode;
      const size = action.payload.size;
      const playersCount = action.payload.players;
      const newGame = createMultyPlayer(mode, size, playersCount);
      return newGame;
    }

    case 'setActive': {
      if (!state) {
        throw new Error('Game state is null');
      }
      const stateCopy = { ...state, table: [...state.table] };
      const id = action.payload.id;
      const clickedField = stateCopy.table.find(
        (field) => field.position == id
      );

      if (!clickedField) {
        throw new Error('no field with this id');
      }
      clickedField.isActive = true;
      return stateCopy;
    }

    case 'setFound': {
      if (!state) {
        throw new Error('Game state is null');
      }
      const stateCopy = { ...state, table: [...state.table] };

      const id = action.payload.id;
      const clickedField = stateCopy.table.find(
        (field) => field.position == id
      );

      if (!clickedField) {
        throw new Error('no field with this id');
      }
      clickedField.isActive = false;
      clickedField.isFound = true;
      return stateCopy;
    }

    case 'incrementMoves': {
      if (!state) {
        throw new Error('Game state is null');
      }

      const stateCopy = { ...state, table: [...state.table] };
      stateCopy.moves++;
      return stateCopy;
    }

    case 'setAllInactive': {
      if (!state) {
        throw new Error('Game state is null');
      }
      const stateCopy = { ...state, table: [...state.table] };
      stateCopy.table.forEach((field) => {
        if (field.isActive) {
          field.isActive = false;
        }
      });
      return stateCopy;
    }
    case 'toggleRoundState': {
      if (!state) {
        throw new Error('Game state is null');
      }
      const stateCopy = { ...state, table: [...state.table] };
      if (stateCopy.roundState === 'first') {
        stateCopy.roundState = 'last';
      } else {
        stateCopy.roundState = 'first';
      }
      return stateCopy;
    }

    case 'resetGame': {
      if (!state) {
        throw new Error('Game state is null');
      }
      const stateCopy = { ...state, table: [...state.table] };
      stateCopy.table.forEach((field) => {
        field.isActive = false;
        field.isFound = false;
      });
      stateCopy.moves = 0;
      stateCopy.roundState = 'first';
      return stateCopy;
    }

    default:
      return null;
      break;
  }
};

interface GameContextType {
  game: GameSingle | null;
  dispatch: React.Dispatch<GameAction>;
}

export const GameContext = createContext<GameContextType | null>(null);

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [game, dispatch] = useReducer(gameReducer, null);

  return (
    <GameContext.Provider value={{ game, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
