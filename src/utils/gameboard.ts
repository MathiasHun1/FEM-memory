import { Field, Game, Player } from '../types/gameTypes';
import anchor from '../assets/anchor.svg';
import bug from '../assets/bug.svg';
import car from '../assets/car.svg';
import flask from '../assets/flask.svg';
import futbol from '../assets/futbol.svg';
import hand from '../assets/hand.svg';
import moon from '../assets/moon.svg';
import snow from '../assets/snow.svg';
import sterling from '../assets/sterling.svg';
import sun from '../assets/sun.svg';
import eye from '../assets/eye.svg';
import face from '../assets/face.svg';
import keyboard from '../assets/keyboard.svg';
import registered from '../assets/registered.svg';
import star from '../assets/star.svg';
import trash from '../assets/trash.svg';
import ghost from '../assets/ghost.svg';
import money from '../assets/money.svg';

const values = {
  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  icons: [
    anchor,
    bug,
    car,
    eye,
    face,
    flask,
    futbol,
    hand,
    moon,
    snow,
    sterling,
    sun,
    keyboard,
    registered,
    star,
    trash,
    ghost,
    money,
  ],
};

// create an array of fields
const createFields = (mode: 'numbers' | 'icons', size: 4 | 6) => {
  const fields: Field[] = [];
  const usedPositions: number[] = [];
  const valuesArray = values[mode].filter((v, index) => {
    if (index < (size * size) / 2) return v;
  });

  // map the value array and create 2 field for each one, with a random poisition
  valuesArray.map((value) => {
    for (let i = 0; i < 2; i++) {
      const randomPosition = createRandomPos(size * size, usedPositions);
      usedPositions.push(randomPosition);

      const field: Field = {
        position: randomPosition,
        value: value,
        isActive: false,
        isFound: false,
      };

      fields.push(field);
    }
  });

  return fields.sort((a, b) => a.position - b.position);
};

// util to create a random position number
const createRandomPos = (maxValue: number, usedPositions: number[]) => {
  if (usedPositions.length >= maxValue) {
    throw new Error('table is already filled');
  }

  const calculated = Math.floor(Math.random() * maxValue);

  if (usedPositions.includes(calculated)) {
    return createRandomPos(maxValue, usedPositions);
  }
  return calculated;
};

export const createGame = (
  mode: 'numbers' | 'icons',
  size: 4 | 6,
  playersCount: number
): Game => {
  const players: Player[] = [];

  for (let i = 0; i < playersCount; i++) {
    players.push({
      playerID: i + 1,
      table: createFields(mode, size),
      isActive: false,
      isWinning: false,
      moves: 0,
      pairs: 0,
    });
  }
  return {
    players,
    mode,
    size,
  };
};
