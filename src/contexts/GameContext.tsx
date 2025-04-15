import { useReducer, createContext, ReactNode } from 'react';
import { createGame } from '../utils/gameboard';
import { Field, Game, GameAction, Player } from '../types/gameTypes';

const gameReducer = (state: Game | null, action: GameAction): Game | null => {
  switch (action.type) {
    case 'initGame': {
      const mode = action.payload.mode;
      const size = action.payload.size;
      const players = action.payload.players;
      const game = createGame(mode, size, players);
      game.players[0].isActive = true;
      return game;
    }

    case 'setFieldActive': {
      if (!state) {
        throw new Error('Game state is null');
      }
      const id = action.payload.id;

      const stateCopy = copyState(state);
      const activePLayer = findActiveP(stateCopy);
      setFieldToActive(id, activePLayer.table);
      return stateCopy;
    }

    case 'setFound': {
      if (!state) {
        throw new Error('Game state is null');
      }
      const id = action.payload.id;

      const stateCopy = copyState(state);
      const activePLayer = findActiveP(stateCopy);
      setFieldToFound(id, activePLayer.table);
      return stateCopy;
    }

    case 'incrementMoves': {
      if (!state) {
        throw new Error('Game state is null');
      }

      const stateCopy = copyState(state);
      const activePLayer = findActiveP(stateCopy);
      activePLayer.moves++;
      return stateCopy;
    }

    case 'setAllInactive': {
      if (!state) {
        throw new Error('Game state is null');
      }
      const stateCopy = copyState(state);
      const activePlayer = findActiveP(stateCopy);
      activePlayer.table.forEach((field) => {
        if (field.isActive) {
          field.isActive = false;
        }
      });
      return stateCopy;
    }

    case 'resetGame': {
      if (!state) {
        throw new Error('Game state is null');
      }

      const { mode, size } = state;
      const playersCount = state.players.length;
      const newGame = createGame(mode, size, playersCount);
      newGame.players[0].isActive = true;
      return newGame;
    }

    default:
      return null;
      break;
  }
};

function findActiveP(state: Game): Player {
  const player = state.players.find((p) => p.isActive);
  if (!player) {
    throw new Error('No player is active!');
  }
  return player;
}

function copyState(state: Game): Game {
  return JSON.parse(JSON.stringify(state)) as Game;
}

function setFieldToActive(clickedID: number, table: Field[]): void {
  const clickedField = table.find((field) => field.position == clickedID);
  if (!clickedField) {
    throw new Error('no field with this id');
  }
  clickedField.isActive = true;
}

function setFieldToFound(clickedID: number, table: Field[]): void {
  const clickedField = table.find((field) => field.position == clickedID);
  if (!clickedField) {
    throw new Error('no field with this id');
  }
  clickedField.isActive = false;
  clickedField.isFound = true;
}

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
