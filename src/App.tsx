import { Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';

import GameMenu from './components/Pages/GameMenu';
import SinglePlayer from './components/Pages/SinglePlayer';
import GameplayLayout from './components/Pages/GameplayLayout';

function App() {
  const [size, setSize] = useState<4 | 6>(4);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/menu" />} />
        <Route
          path="menu"
          element={<GameMenu size={size} setSize={setSize} />}
        />
        <Route path="playing">
          <Route element={<GameplayLayout />}>
            <Route path="singleplayer" element={<SinglePlayer />} />
            {/* <Route path="/multyplayer" element={<MultyPlayer />} /> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
