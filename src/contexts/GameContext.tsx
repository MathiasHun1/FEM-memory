import { useReducer, createContext } from 'react';
import { createFields } from '../utils/gameboard';
import { Field } from '../types/gameTypes';

interface Game {
  table: Field[];
  roundState: 'first' | 'last';
  moves: number;
}

const initialState: Game = {
  table: createFields(),
  roundState: 'first',
  moves: 0,
};

const gameReducer = (state: Game, action: any) => {
  switch (action.type) {
    case 'setActive': {
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
      const stateCopy = { ...state, table: [...state.table] };
      stateCopy.moves++;
      return stateCopy;
    }

    case 'setAllInactive': {
      const stateCopy = { ...state, table: [...state.table] };
      stateCopy.table.forEach((field) => {
        if (field.isActive) {
          field.isActive = false;
        }
      });
      return stateCopy;
    }
    case 'toggleRoundState': {
      const stateCopy = { ...state, table: [...state.table] };
      if (stateCopy.roundState === 'first') {
        stateCopy.roundState = 'last';
      } else {
        stateCopy.roundState = 'first';
      }
      return stateCopy;
    }

    case 'resetGame': {
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
      break;
  }
};

export const GameContext = createContext(null);

export default function ContextProvider({ children }) {
  const [game, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ game, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}
