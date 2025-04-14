import styles from '../../styles/components/GameplayLayout.module.scss';
import logo from '/images/logo-dark.svg';
import { Outlet, useNavigate } from 'react-router';
import { useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';

const GameplayLayout = () => {
  const { dispatch } = useContext(GameContext)!;
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
        <Outlet />
      </main>
    </div>
  );
};

export default GameplayLayout;
