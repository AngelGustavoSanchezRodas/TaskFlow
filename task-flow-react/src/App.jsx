import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Log-Register/LoginForm';
import RegisterForm from './components/Log-Register/RegisterForm';
import Home from './components/Home'; 
import TeamDashboard from './components/EquipoComponente/TeamDashBoard';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />

        <Route path="/register" element={<RegisterForm />} />
  
        <Route path="/home" element={<Home />} />
        
        <Route path="/equipo/:idEquipo" element={<TeamDashboard />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;