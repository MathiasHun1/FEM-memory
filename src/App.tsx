import { Routes, Route, Navigate } from 'react-router';

import GameMenu from './components/Pages/GameMenu';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/menu" />} />
        <Route path="/menu" element={<GameMenu />} />
      </Routes>
    </>
  );
}

export default App;
