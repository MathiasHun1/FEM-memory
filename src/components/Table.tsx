import Field from './Field';
import styles from '../styles/components/Table.module.scss';
import React, { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import { Field as FieldType } from '../types/gameTypes';

interface Props {
  table: FieldType[];
  onClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const Table = ({ table, onClick }: Props) => {
  const { game } = useContext(GameContext)!;

  if (!game) {
    throw new Error('Game is null');
  }

  const style = {
    '--grid-size': game.size,
    '--grid-width': game.size === 4 ? '28rem' : '34rem',
  };

  return (
    <div className={styles.table} style={style as React.CSSProperties}>
      {table.map((field, index) => (
        <Field
          key={index}
          index={index}
          onClick={onClick}
          isActive={field.isActive}
          isFound={field.isFound}
          value={field.value}
        />
      ))}
    </div>
  );
};

export default Table;
