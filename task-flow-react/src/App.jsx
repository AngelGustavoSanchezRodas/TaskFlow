import React from 'react';
import IndexLog from './components/Log-Register/IndexLog';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import TeamDashboard from './components/EquipoComponente/TeamDashBoard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexLog />} />
      <Route path="/home" element={<Home />} />
      <Route path='/equipo/:idEquipo' element={<TeamDashboard />} />
    </Routes>
  );
}

export default App;
