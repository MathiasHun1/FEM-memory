import { useReducer, createContext, ReactNode } from 'react';
import { createGame } from '../utils/gameboard';
import { Game, GameAction } from '../types/gameTypes';

const gameReducer = (state: Game | null, action: GameAction): Game | null => {
  switch (action.type) {
    case 'init': {
      const mode = action.payload.mode;
      const size = action.payload.size;
      const newGame = createGame(mode, size);
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
  game: Game | null;
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
