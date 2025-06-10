import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Layout from './Layout.tsx';
import TicTacToe from './games/tictactoe/TicTacToe.tsx';
import Wordle from './games/wordle/Wordle.tsx';
import MineSweeper from './games/minesweeper/Minesweeper.tsx';
import Maths from './games/maths/Maths.tsx';
import Typing from './games/typing/Typing.tsx';
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
          <Route path="/minesweeper" element={<MineSweeper />} />
          <Route path="/maths" element={<Maths />} />
          <Route path="/typing" element={<Typing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
