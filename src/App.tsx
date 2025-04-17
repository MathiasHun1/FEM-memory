import { Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';
import useAppHeight from './hooks/useAppHeight';

import GameMenu from './components/Pages/GameMenu';
import SinglePlayer from './components/Pages/SinglePlayer';
import GameplayLayout from './components/Pages/GameplayLayout';
import MultiPlayer from './components/Pages/MultiPlayer';

function App() {
  const [size, setSize] = useState<4 | 6>(4);
  const [winState, setWinState] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useAppHeight();

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/menu" />} />
        <Route
          path="menu"
          element={<GameMenu size={size} setSize={setSize} />}
        />
        <Route path="playing">
          <Route
            element={
              <GameplayLayout
                winState={winState}
                setWinState={setWinState}
                setGameStarted={setGameStarted}
              />
            }
          >
            <Route
              path="singleplayer"
              element={
                <SinglePlayer
                  setWinState={setWinState}
                  gameStarted={gameStarted}
                  setGameStarted={setGameStarted}
                />
              }
            />
            <Route
              path="multiplayer"
              element={<MultiPlayer setWinState={setWinState} />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
