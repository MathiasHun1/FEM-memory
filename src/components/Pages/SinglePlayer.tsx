import { useNavigate } from 'react-router';
import { GameContext } from '../../contexts/GameContext';
import styles from '../../styles/components/SinglePlayer.module.scss';
import logo from '/images/logo-dark.svg';
import { useContext } from 'react';
import Table from '../Table';

const SinglePlayer = ({ size }: { size: 4 | 6 }) => {
  const { game, dispatch } = useContext(GameContext)!;
  const navigate = useNavigate();

  const handleRestart = () => {
    dispatch({ type: 'resetGame' });
    navigate('/menu');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>

        <div>
          <button onClick={() => dispatch({ type: 'resetGame' })}>reset</button>
          <button onClick={handleRestart}>restart</button>
        </div>
      </header>

      <main className={styles.main}>
        <Table size={size} />

        <div className={styles.meta_wrapper}>
          <div className={styles.meta_element}>
            <h3 className={styles.meta_text}>Time</h3>
            <p className={styles.meta_value}>0</p>
          </div>
          <div className={styles.meta_element}>
            <h3 className={styles.meta_text}>Moves</h3>
            <p className={styles.meta_value}>{game?.moves}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SinglePlayer;
