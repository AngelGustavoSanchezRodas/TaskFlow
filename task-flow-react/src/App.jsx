import React from 'react';
import IndexLog from './components/Log-Register/IndexLog';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexLog />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
