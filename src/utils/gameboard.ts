import { Field } from '../types/gameTypes';

// create an array of fields
export const createFields = () => {
  const fields: Field[] = [];
  const valuesArray: number[] = [];
  const usedPositions: number[] = [];

  //fill values array with numbers 1-16
  for (let i = 0; i < 8; i++) {
    valuesArray.push(i + 1);
  }

  // map the value array and create 2 field for each one, with a random poisition
  valuesArray.map((value) => {
    for (let i = 0; i < 2; i++) {
      const randomPosition = createRandomPos(16, usedPositions);
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

// util to reate a random position number
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

export const createGame = (mode, size) => {
  return {
    table: createFields(),
    roundState: 'first',
    moves: 0,
    elapsedTime: 0,
  };
};
