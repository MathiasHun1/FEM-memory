import { useNavigate } from 'react-router';
import { GameContext } from '../../contexts/GameContext';
import styles from '../../styles/components/SinglePlayer.module.scss';
import logo from '/images/logo-dark.svg';
import { useContext, useEffect } from 'react';
import Field from '../Field';

const SinglePlayer = () => {
  const { game, dispatch } = useContext(GameContext);
  const navigate = useNavigate();

  useEffect(() => {
    const activeFields = game.table.filter((field) => field.isActive);
    if (activeFields.length === 2) {
      if (activeFields[0].value !== activeFields[1].value) {
        dispatch({ type: 'setAllInactive' });
      }

      if (activeFields[0].value === activeFields[1].value) {
        activeFields.map((field) =>
          dispatch({ type: 'setFound', payload: { id: field.position } })
        );
      }
    }
  }, [game]);

  const handleClick = (e) => {
    const position = Number(e.target.dataset.id);
    dispatch({ type: 'setActive', payload: { id: position } });
    dispatch({ type: 'toggleRoundState' });
    dispatch({ type: 'incrementMoves' });
  };

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
        <div className={styles.table}>
          {game.table.map((field, index) => (
            <Field
              key={index}
              id={index}
              onClick={handleClick}
              isActive={field.isActive}
              isFound={field.isFound}
              value={field.value}
            />
          ))}
        </div>
        <div className={styles.meta_wrapper}>
          <div className={styles.meta_element}>
            <h3 className={styles.meta_text}>Time</h3>
            <p className={styles.meta_value}>0</p>
          </div>
          <div className={styles.meta_element}>
            <h3 className={styles.meta_text}>Moves</h3>
            <p className={styles.meta_value}>{game.moves}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SinglePlayer;
