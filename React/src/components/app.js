import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './modals/register'; 
import ImageCarousel from './carrucel/carrucel';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleModalOpen = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>

    <nav className="navbar">
      <div className="navbar-brand">
        {/* Aquí puedes poner el nombre de tu web o un logo */}
        Mi Web
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/acerca-de">Acerca de</Link>
        </li>
        <li>
          <button onClick={() => handleModalOpen('register')}>Registrarse</button>
        </li>
        <li>
          <button onClick={() => handleModalOpen('login')}>Iniciar sesión</button>
        </li>
      </ul>
      {showModal && (
        <Modal type={modalType} onClose={handleModalClose} />
      )}
    </nav>
    
      <ImageCarousel/>
    
    </div>
  );
}

export default App;
