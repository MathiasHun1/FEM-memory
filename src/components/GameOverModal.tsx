import React, { useContext, useEffect } from 'react';
import styles from '../styles/components/GameOverModal.module.scss';
import { GameContext, LanguageContext } from '../contexts/GameContext';
import { useNavigate } from 'react-router';
import { formatTimeValue } from '../utils/helpers';

interface Props {
  setWinState: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameOverModal = ({ setWinState }: Props) => {
  const { language } = useContext(LanguageContext)!;
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
            {isSingle && <> {language.gameOver.singlePlayer.title}</>}
            {isMulti && !isTie && (
              <>
                {language.gameOver.multiPlayer.player}{' '}
                {getWinningPlayer()?.playerID}{' '}
                {language.gameOver.multiPlayer.wins}
              </>
            )}
            {isMulti && isTie && <>{language.gameOver.multiPlayer.tie}</>}
          </h1>

          <p className={styles.sub_text}>
            {isSingle && <>{language.gameOver.singlePlayer.subText}</>}
            {isMulti && <>{language.gameOver.multiPlayer.subText}</>}
          </p>
        </header>

        <ul className={styles.list}>
          {isSingle && (
            <>
              <li className={styles.list_item}>
                <span>{language.gameOver.singlePlayer.timeResult}</span>
                <span>{formatTimeValue(timerValue)}</span>
              </li>
              <li className={styles.list_item}>
                <span>{language.gameOver.singlePlayer.movesResult}</span>
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
                <span>
                  {language.gameOver.multiPlayer.player} {p.playerID}
                </span>
                <span>
                  {p.pairs} {language.gameOver.multiPlayer.pairs}
                </span>
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
            {language.gameOver.restartBtn}
          </button>
          <button
            className={styles.new_game_button}
            onClick={() => {
              dispatch({ type: 'resetGame' });
              navigate('/menu');
              setWinState(false);
            }}
          >
            {language.gameOver.newGameBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
