import Field from './Field';
import styles from '../styles/components/Table.module.scss';
import React, { useEffect, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

const Table = ({ size }: { size: 4 | 6 }) => {
  const style = {
    '--grid-size': size,
    '--grid-width': size === 4 ? '28rem' : '34rem',
  };

  const { game, dispatch } = useContext(GameContext)!;

  useEffect(() => {
    if (!game) return;

    const activeFields = game.table.filter((field) => field.isActive);
    if (activeFields.length === 2) {
      if (activeFields[0].value !== activeFields[1].value) {
        dispatch({ type: 'setAllInactive' });
      }

      if (activeFields[0].value === activeFields[1].value) {
        activeFields.map((field) =>
          dispatch({ type: 'setFound', payload: { id: field.position } })
        );
      }
    }
  }, [game, dispatch]);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLSpanElement;
    const position = Number(target.dataset.id);
    dispatch({ type: 'setActive', payload: { id: position } });
    dispatch({ type: 'toggleRoundState' });
    dispatch({ type: 'incrementMoves' });
  };

  return (
    <div className={styles.table} style={style as React.CSSProperties}>
      {game?.table.map((field, index) => (
        <Field
          key={index}
          id={index}
          onClick={handleClick}
          isActive={field.isActive}
          isFound={field.isFound}
          value={field.value}
        />
      ))}
    </div>
  );
};

export default Table;
