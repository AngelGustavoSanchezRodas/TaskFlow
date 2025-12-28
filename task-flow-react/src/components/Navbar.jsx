import { useNavigate } from 'react-router-dom';

function Navbar() {

     const navigate = useNavigate();

    let cerrarSesion = ()=> {
        localStorage.removeItem('usuario');
        navigate('/');

    }

  return (
    <nav className="navbar navbar-dark bg-dark px-3 rounded">
      <span className="navbar-brand mb-0 h1">TaskFlow</span>
      <button 
        className="btn btn-danger btn-sm" 
        type="button" 
        onClick={cerrarSesion}
      >
        Cerrar Sesión
      </button>
    </nav>
  );
}

export default Navbar;
