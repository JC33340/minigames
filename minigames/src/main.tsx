import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Layout from './Layout.tsx';
import TicTacToe from './games/tictactoe/TicTacToe.tsx';
import Wordle from './games/wordle/Wordle.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/wordle" element={<Wordle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
