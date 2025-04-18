import { Routes, Route, Navigate, useLocation } from 'react-router';
import { ReactNode, useState } from 'react';
import useAppHeight from './hooks/useAppHeight';
import { AnimatePresence, motion } from 'motion/react';

import GameMenu from './components/Pages/GameMenu';
import SinglePlayer from './components/Pages/SinglePlayer';
import GameplayLayout from './components/Pages/GameplayLayout';
import MultiPlayer from './components/Pages/MultiPlayer';

function App() {
  const [size, setSize] = useState<4 | 6>(4);
  const [winState, setWinState] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const location = useLocation();

  useAppHeight();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/menu" />} />
        <Route
          path="menu"
          element={<GameMenu size={size} setSize={setSize} />}
        />
        <Route path="playing">
          <Route
            element={
              <PageWrapper>
                <GameplayLayout
                  winState={winState}
                  setWinState={setWinState}
                  setGameStarted={setGameStarted}
                />
              </PageWrapper>
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
    </AnimatePresence>
  );
}

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default App;
