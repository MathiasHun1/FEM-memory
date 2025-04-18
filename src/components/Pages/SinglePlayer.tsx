import { GameContext, LanguageContext } from '../../contexts/GameContext';
import styles from '../../styles/components/SinglePlayer.module.scss';
import { useContext, useEffect, useRef } from 'react';
import Table from '../Table';
import { useNavigate } from 'react-router';
import { formatTimeValue } from '../../utils/helpers';

interface Props {
  setWinState: React.Dispatch<React.SetStateAction<boolean>>;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  gameStarted: boolean;
}

const SinglePlayer = ({ setWinState, gameStarted, setGameStarted }: Props) => {
  const timerRef = useRef<number | null>(null);
  const { language } = useContext(LanguageContext)!;

  const { game, dispatch, timerValue, setTimerValue } =
    useContext(GameContext)!;
  const navigate = useNavigate();
  const player = game?.players[0];

  useEffect(() => {
    if (!game) {
      navigate('/menu');
    } else {
      checkMatch();
      checkWinning();
    }
  }, [game]);

  useEffect(() => {
    if (gameStarted) {
      timerRef.current = setInterval(() => {
        setTimerValue((prevValue: number) => prevValue + 1);
      }, 1000);
    }

    if (timerRef.current && !gameStarted) {
      clearInterval(timerRef.current);
      setTimerValue(0);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timerRef.current = null;
    };
  }, [gameStarted]);

  function checkMatch() {
    if (!player) return;

    const activeFields = player.table.filter((field) => field.isActive);
    if (activeFields.length === 2) {
      if (activeFields[0].value !== activeFields[1].value) {
        setTimeout(() => {
          dispatch({ type: 'setAllInactive' });
          dispatch({ type: 'incrementMoves' });
        }, 500);
      }

      if (activeFields[0].value === activeFields[1].value) {
        activeFields.map((field) =>
          dispatch({ type: 'setFound', payload: { id: field.position } })
        );
        dispatch({ type: 'incrementMoves' });
      }
    }
  }

  function checkWinning() {
    if (!player) {
      return;
    }
    const winning = player.table.every((f) => f.isFound);
    if (winning) {
      setWinState(true);
      setGameStarted(false);
    }
  }

  function handleClick(e: React.MouseEvent<HTMLSpanElement>) {
    if (!player) {
      return;
    }
    // set game-running flag on first click
    if (!gameStarted) {
      setGameStarted(true);
    }
    // not allow to activate more than 2 fields
    const activeFields = player.table.filter((field) => field.isActive);
    if (activeFields.length === 2) {
      return;
    }

    const target = e.currentTarget as HTMLSpanElement;
    const position = Number(target.dataset.id);
    dispatch({ type: 'setFieldActive', payload: { id: position } });
  }

  return !player ? (
    <div>Loading...</div>
  ) : (
    <>
      <Table table={player.table} onClick={handleClick} />

      <div className={styles.meta_wrapper}>
        <div className={styles.meta_element}>
          <h3 className={styles.meta_text}>{language.game.player.time}</h3>
          <p className={styles.meta_value}>{formatTimeValue(timerValue)}</p>
        </div>
        <div className={styles.meta_element}>
          <h3 className={styles.meta_text}>{language.game.player.moves}</h3>
          <p className={styles.meta_value}>{player.moves}</p>
        </div>
      </div>
    </>
  );
};

export default SinglePlayer;
