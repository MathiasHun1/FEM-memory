import React, { useContext, useEffect } from 'react';
import styles from '../styles/components/GameOverModal.module.scss';
import { GameContext } from '../contexts/GameContext';
import { useNavigate } from 'react-router';
import { formatTimeValue } from '../utils/helpers';

interface Props {
  setWinState: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameOverModal = ({ setWinState }: Props) => {
  const { game, dispatch, timerValue, setTimerValue } =
    useContext(GameContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    if (!game) {
      navigate('/menu');
    }
  }, [game]);

  const isSingle = game?.players.length === 1;
  const isMulti = !isSingle;
  const isTie = isMulti && checkIsTie();

  function getWinningPlayer() {
    if (!game) {
      return;
    }
    return game.players.find((p) => p.isWinning);
  }

  function checkIsTie() {
    if (!game) {
      return;
    }
    return game.players.filter((p) => p.isWinning).length > 1;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            {isSingle && <> You did it!</>}
            {isMulti && !isTie && (
              <>Player {getWinningPlayer()?.playerID} Wins!</>
            )}
            {isMulti && isTie && <>It's a tie!</>}
          </h1>

          <p className={styles.sub_text}>
            {isSingle && <>Game over! Here's how you got on...</>}
            {isMulti && <>Game over! Here are the results...</>}
          </p>
        </header>

        <ul className={styles.list}>
          {isSingle && (
            <>
              <li className={styles.list_item}>
                <span>Time Elapsed</span>
                <span>{formatTimeValue(timerValue)}</span>
              </li>
              <li className={styles.list_item}>
                <span>Moves Taken</span>
                <span>{game.players[0].moves}</span>
              </li>
            </>
          )}

          {isMulti &&
            game?.players.map((p) => (
              <li
                key={p.playerID}
                className={`${
                  p.isWinning ? styles.list_item_winner : styles.list_item
                }`}
              >
                <span>Player {p.playerID}</span>
                <span>{p.pairs} Pairs</span>
              </li>
            ))}
        </ul>
        <div className={styles.buttons_wrapper}>
          <button
            className={styles.restart_button}
            onClick={() => {
              setWinState(false);
              dispatch({ type: 'resetGame' });
              setTimerValue(0);
            }}
          >
            Restart
          </button>
          <button
            className={styles.new_game_button}
            onClick={() => {
              dispatch({ type: 'resetGame' });
              navigate('/menu');
              setWinState(false);
            }}
          >
            Setup New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
