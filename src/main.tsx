import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.scss';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import ContextProvider from './contexts/GameContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>
);
