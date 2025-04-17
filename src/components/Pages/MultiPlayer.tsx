import styles from '../../styles/components/MultyPlayer.module.scss';
import React, { useContext, useEffect } from 'react';
import Table from '../Table';
import { GameContext } from '../../contexts/GameContext';

interface Props {
  setWinState: React.Dispatch<React.SetStateAction<boolean>>;
}

const MultiPlayer = ({ setWinState }: Props) => {
  const { game, dispatch } = useContext(GameContext)!;
  const players = game?.players;
  const activePlayer = getActivePlayer();

  useEffect(() => {
    checkMatch();
    checkWinning();
  }, [game]);

  function getActivePlayer() {
    //using filter to see if we have error
    const result = players?.filter((p) => p.isActive);
    if (!result || result.length !== 1) {
      throw new Error('Error retrieving the active player');
    }
    return result[0];
  }

  function checkMatch() {
    const activeFields = activePlayer.table.filter((field) => field.isActive);
    if (activeFields.length === 2) {
      if (activeFields[0].value !== activeFields[1].value) {
        setTimeout(() => {
          dispatch({ type: 'setAllInactive' });
          dispatch({ type: 'changeActivePlayer' });
        }, 500);
      }

      if (activeFields[0].value === activeFields[1].value) {
        activeFields.map((field) =>
          dispatch({ type: 'setFound', payload: { id: field.position } })
        );
        dispatch({ type: 'incrementPairs' });
        setTimeout(() => {
          dispatch({ type: 'changeActivePlayer' });
        }, 500);
      }
    }
  }

  function checkWinning() {
    const isLastRound = game?.lastRound; // true if someone's winning state is true
    const isFirstPlayer = activePlayer.playerID === 1;

    // we have winner(s) and passed the last player
    if (isLastRound && isFirstPlayer) {
      setWinState(true);
    }
  }

  function handleClick(e: React.MouseEvent<HTMLSpanElement>) {
    const activeFields = activePlayer.table.filter((field) => field.isActive);
    if (activeFields.length >= 2) {
      return;
    }
    const target = e.currentTarget as HTMLSpanElement;
    const position = Number(target.dataset.id);
    dispatch({ type: 'setFieldActive', payload: { id: position } });
  }

  return (
    <>
      <Table table={activePlayer.table} onClick={handleClick} />

      <div className={styles.meta_wrapper}>
        {players?.map((p) => (
          <div
            key={p.playerID}
            className={`${
              p.isActive ? styles.meta_element_active : styles.meta_element
            }`}
          >
            <span>P{p.playerID}</span>
            <span>{p.pairs}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default MultiPlayer;
