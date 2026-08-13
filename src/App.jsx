import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HHGoaGeneratorPage from './pages/HHGoaGeneratorPage';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HHGoaGeneratorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
