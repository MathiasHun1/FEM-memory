import React, { useState, useContext } from 'react';
import styles from '../../styles/components/GameMenu.module.scss';
import logo from '/images/logo-white.svg';
import { useNavigate } from 'react-router';
import { GameContext, LanguageContext } from '../../contexts/GameContext';

import LanguagePicker from '../LanguagePicker';

interface Props {
  size: 4 | 6;
  setSize: React.Dispatch<4 | 6>;
}

const GameMenu = ({ size, setSize }: Props) => {
  const [mode, setMode] = useState<'numbers' | 'icons'>('numbers');
  const [players, setPlayers] = useState(1);
  const navigate = useNavigate();
  const { dispatch } = useContext(GameContext)!;
  const { language } = useContext(LanguageContext)!;

  const handlePlayerCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    if (button.dataset.value) {
      setPlayers(Number(button.dataset.value));
    }
  };

  const handleGameStart = () => {
    dispatch({ type: 'initGame', payload: { mode: mode, size, players } });

    if (players === 1) {
      navigate('/playing/singleplayer');
    } else {
      navigate('/playing/multiplayer');
    }
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
          <LanguagePicker />
          <div className={styles.input_group}>
            <label htmlFor="" className={styles.label}>
              {language.menu.titleMode}
            </label>
            <div className={styles.input_wrapper}>
              <button
                className={`${styles.button_selection} ${
                  mode === 'numbers' ? styles.button_selection_active : ''
                }`}
                onClick={() => setMode('numbers')}
              >
                {language.menu.modeNum}
              </button>
              <button
                className={`${styles.button_selection} ${
                  mode === 'icons' ? styles.button_selection_active : ''
                }`}
                onClick={() => setMode('icons')}
              >
                {language.menu.modeIcon}
              </button>
            </div>
          </div>

          <div className={styles.input_group}>
            <label htmlFor="" className={styles.label}>
              {language.menu.titlePlayers}
            </label>
            <div className={styles.input_wrapper}>
              <button
                className={`${styles.button_selection} ${
                  players === 1 ? styles.button_selection_active : ''
                }`}
                onClick={handlePlayerCount}
                data-value="1"
              >
                1
              </button>
              <button
                className={`${styles.button_selection} ${
                  players === 2 ? styles.button_selection_active : ''
                }`}
                data-value="2"
                onClick={handlePlayerCount}
              >
                2
              </button>
              <button
                className={`${styles.button_selection} ${
                  players === 3 ? styles.button_selection_active : ''
                }`}
                data-value="3"
                onClick={handlePlayerCount}
              >
                3
              </button>
              <button
                className={`${styles.button_selection} ${
                  players === 4 ? styles.button_selection_active : ''
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
              {language.menu.titleSize}
            </label>
            <div className={styles.input_wrapper}>
              <button
                className={`${styles.button_selection} ${
                  size === 4 ? styles.button_selection_active : ''
                }`}
                onClick={() => setSize(4)}
              >
                4x4
              </button>
              <button
                className={`${styles.button_selection} ${
                  size === 6 ? styles.button_selection_active : ''
                }`}
                onClick={() => setSize(6)}
              >
                6x6
              </button>
            </div>
          </div>

          <button className={styles.button_start} onClick={handleGameStart}>
            {language.menu.startBtn}
          </button>
        </div>
      </main>
    </div>
  );
};

export default GameMenu;
