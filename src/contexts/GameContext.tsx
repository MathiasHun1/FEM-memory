/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useReducer, createContext, ReactNode, useState } from 'react';
import { createGame } from '../utils/gameboard';
import { Field, Game, GameAction, Player } from '../types/gameTypes';
import { languages } from '../assets/languages';
import { Language } from '../types/langTypes';

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
      const clickedField = getClickedField(id, activePLayer.table);

      if (!clickedField) {
        throw new Error('error finding the clicked field');
      }

      if (clickedField.isActive || clickedField.isFound) {
        return stateCopy;
      }

      clickedField.isActive = true;

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

      // set player's winning flag to true if every field is found
      if (activePLayer.table.every((f) => f.isFound)) {
        activePLayer.isWinning = true;
        stateCopy.lastRound = true;
      }
      return stateCopy;
    }

    case 'incrementMoves': {
      if (!state) {
        throw new Error('Game state is null');
      }

      const stateCopy = copyState(state);
      const activePLayer = findActiveP(stateCopy);
      activePLayer.moves += 1;
      return stateCopy;
    }

    case 'incrementPairs': {
      if (!state) {
        throw new Error('Game state is null');
      }

      const stateCopy = copyState(state);
      const activePLayer = findActiveP(stateCopy);
      activePLayer.pairs++;
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

    case 'changeActivePlayer': {
      if (!state) {
        throw new Error('Game state is null');
      }
      const stateCopy = copyState(state);
      const activePlayerIndex = stateCopy.players.findIndex((p) => p.isActive);
      const nextIndex =
        activePlayerIndex === stateCopy.players.length - 1
          ? 0
          : activePlayerIndex + 1;

      stateCopy.players[activePlayerIndex].isActive = false;
      stateCopy.players[nextIndex].isActive = true;
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

function getClickedField(clickedID: number, table: Field[]) {
  return table.find((field) => field.position == clickedID);
}

function setFieldToFound(clickedID: number, table: Field[]): void {
  const clickedField = table.find((field) => field.position == clickedID);
  if (!clickedField) {
    throw new Error('no field with this id');
  }
  clickedField.isActive = false;
  clickedField.isFound = true;
}

// ------------- Context --------------- //

interface GameContextType {
  game: Game | null;
  dispatch: React.Dispatch<GameAction>;
  timerValue: number;
  setTimerValue: React.Dispatch<React.SetStateAction<number>>;
}

interface LanguageContextType {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

export const GameContext = createContext<GameContextType | null>(null);
export const LanguageContext = createContext<LanguageContextType | null>(null);

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [game, dispatch] = useReducer(gameReducer, null);
  const [timerValue, setTimerValue] = useState(0);
  const [language, setLanguage] = useState<Language>(languages.hun);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <GameContext.Provider
        value={{ game, dispatch, timerValue, setTimerValue }}
      >
        {children}
      </GameContext.Provider>
    </LanguageContext.Provider>
  );
}
