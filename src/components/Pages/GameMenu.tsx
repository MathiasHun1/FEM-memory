import React, { useState } from 'react';
import styles from '../../styles/components/GameMenu.module.scss';
import logo from '/images/logo-white.svg';
import { useNavigate } from 'react-router';

const GameMenu = () => {
  const [theme, setTheme] = useState<'numbers' | 'icons'>('numbers');
  const [players, setPlayers] = useState('1');
  const [gridSize, setGridSize] = useState('4');
  const navigate = useNavigate();

  const handlePlayerCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    if (button.dataset.value) {
      setPlayers(button.dataset.value);
    }
  };

  const handleGameStart = () => {
    navigate('/game/singlePlayer');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <img src={logo} alt="" />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.input_group}>
            <label htmlFor="" className={styles.label}>
              Select Theme
            </label>
            <div className={styles.input_wrapper}>
              <button
                className={`${styles.button_selection} ${
                  theme === 'numbers' ? styles.button_selection_active : ''
                }`}
                onClick={() => setTheme('numbers')}
              >
                Numbers
              </button>
              <button
                className={`${styles.button_selection} ${
                  theme === 'icons' ? styles.button_selection_active : ''
                }`}
                onClick={() => setTheme('icons')}
              >
                Icons
              </button>
            </div>
          </div>

          <div className={styles.input_group}>
            <label htmlFor="" className={styles.label}>
              Number of Players
            </label>
            <div className={styles.input_wrapper}>
              <button
                className={`${styles.button_selection} ${
                  players === '1' ? styles.button_selection_active : ''
                }`}
                onClick={handlePlayerCount}
                data-value="1"
              >
                1
              </button>
              <button
                className={`${styles.button_selection} ${
                  players === '2' ? styles.button_selection_active : ''
                }`}
                data-value="2"
                onClick={handlePlayerCount}
              >
                2
              </button>
              <button
                className={`${styles.button_selection} ${
                  players === '3' ? styles.button_selection_active : ''
                }`}
                data-value="3"
                onClick={handlePlayerCount}
              >
                3
              </button>
              <button
                className={`${styles.button_selection} ${
                  players === '4' ? styles.button_selection_active : ''
                }`}
                data-value="4"
                onClick={handlePlayerCount}
              >
                4
              </button>
            </div>
          </div>

          <div className={styles.input_group}>
            <label htmlFor="" className={styles.label}>
              Grid Size
            </label>
            <div className={styles.input_wrapper}>
              <button
                className={`${styles.button_selection} ${
                  gridSize === '4' ? styles.button_selection_active : ''
                }`}
                onClick={() => setGridSize('4')}
              >
                4x4
              </button>
              <button
                className={`${styles.button_selection} ${
                  gridSize === '6' ? styles.button_selection_active : ''
                }`}
                onClick={() => setGridSize('6')}
              >
                6x6
              </button>
            </div>
          </div>

          <button className={styles.button_start} onClick={handleGameStart}>
            Start Game
          </button>
        </div>
      </main>
    </div>
  );
};

export default GameMenu;
