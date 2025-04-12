import { Routes, Route, Navigate } from 'react-router';

import GameMenu from './components/Pages/GameMenu';
import SinglePlayer from './components/Pages/SinglePlayer';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/menu" />} />
        <Route path="/menu" element={<GameMenu />} />
        <Route path="/game/singleplayer" element={<SinglePlayer />} />
      </Routes>
    </>
  );
}

export default App;
