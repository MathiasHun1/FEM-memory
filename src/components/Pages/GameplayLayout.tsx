import styles from '../../styles/components/GameplayLayout.module.scss';
import logo from '/images/logo-dark.svg';
import { Outlet, useNavigate } from 'react-router';
import React, { useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';
import useAppHeight from '../../hooks/useAppHeight';

import GameOverModal from '../GameOverModal';

interface Props {
  winState: boolean;
  setWinState: React.Dispatch<React.SetStateAction<boolean>>;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameplayLayout = ({ winState, setWinState, setGameStarted }: Props) => {
  const { dispatch, setTimerValue } = useContext(GameContext)!;
  const navigate = useNavigate();
  useAppHeight();

  const handleRestart = () => {
    dispatch({ type: 'resetGame' });
    navigate('/menu');
    setGameStarted(false);
    setTimerValue(0);
  };

  const handleReset = () => {
    dispatch({ type: 'resetGame' });
    setGameStarted(false);
    setTimerValue(0);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="" />
        </div>

        <div className={styles.buttons_wrapper}>
          <button className={styles.restart_button} onClick={handleReset}>
            Restart
          </button>
          <button className={styles.new_game_button} onClick={handleRestart}>
            New Game
          </button>

          <button
            className={styles.new_game_button_mobile}
            onClick={handleRestart}
          >
            Menu
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
      {winState && <GameOverModal setWinState={setWinState} />}
    </div>
  );
};

export default GameplayLayout;
