import { GameContext } from '../../contexts/GameContext';
import styles from '../../styles/components/SinglePlayer.module.scss';
import { useContext, useEffect } from 'react';
import Table from '../Table';

const SinglePlayer = () => {
  const { game, dispatch } = useContext(GameContext)!;
  if (!game) {
    throw new Error('game is null');
  }
  const player = game.players[0];

  useEffect(() => {
    const activeFields = player.table.filter((field) => field.isActive);
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
  }, [game, dispatch, player.table]);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLSpanElement;
    const position = Number(target.dataset.id);
    dispatch({ type: 'setFieldActive', payload: { id: position } });
    dispatch({ type: 'incrementMoves' });
  };

  return (
    <>
      <Table table={player.table} onClick={handleClick} />

      <div className={styles.meta_wrapper}>
        <div className={styles.meta_element}>
          <h3 className={styles.meta_text}>Time</h3>
          <p className={styles.meta_value}>0</p>
        </div>
        <div className={styles.meta_element}>
          <h3 className={styles.meta_text}>Moves</h3>
          <p className={styles.meta_value}>{player.moves}</p>
        </div>
      </div>
    </>
  );
};

export default SinglePlayer;
