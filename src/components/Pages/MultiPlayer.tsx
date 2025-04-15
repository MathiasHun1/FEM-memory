import styles from '../../styles/components/MultyPlayer.module.scss';
import { useContext, useEffect } from 'react';
import Table from '../Table';
import { GameContext } from '../../contexts/GameContext';

const MultiPlayer = () => {
  const { game } = useContext(GameContext);
  const players = game.players;

  useEffect(() => {
    console.log(players);
  }, [game]);

  return (
    <>
      <Table size={4} />

      <div className={styles.meta_wrapper}>
        {/* <div className={styles.meta_element}>
          <h3 className={styles.meta_text}>Time</h3>
          <p className={styles.meta_value}>0</p>
        </div>
        <div className={styles.meta_element}>
          <h3 className={styles.meta_text}>Moves</h3>
          <p className={styles.meta_value}>{game?.moves}</p>
        </div> */}
      </div>
    </>
  );
};

export default MultiPlayer;
