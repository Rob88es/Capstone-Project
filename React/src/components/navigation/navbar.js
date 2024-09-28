import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from '../modals/register';
import Close from '../modals/close';

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleModalOpen = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleLogout = async () => {
    try {
      // Lógica para cerrar sesión (e.g., enviar solicitud al servidor)
      const response = await fetch('/logout');
      if (!response.ok) {
        throw new Error('Error al cerrar sesión');
      }
      setIsLoggedIn(false);
      setShowConfirmModal(false);
    } catch (error) {
      console.error(error);
      // Mostrar un mensaje de error al usuario
    }
  };

  const handleConfirmLogout = () => {
    // Lógica para cerrar sesión (e.g., enviar solicitud al servidor)
    setIsLoggedIn(false);
    setShowConfirmModal(false);
  };

  const handleCancelLogout = () => {
    setShowConfirmModal(false);
  };
  

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Nombre de tu Página</Link>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/mis-eventos">Mis Eventos</Link></li>
          <li><Link to="/crear-evento">Crear Evento</Link></li>
        </ul>
      </nav>
      <nav>
        <ul>
            <li><button onClick={() => handleModalOpen('register')}>Registrarse</button></li>
            <li><button onClick={() => handleModalOpen('login')}>Iniciar sesión</button></li>
        </ul>
      </nav>
      {showConfirmModal && <Close onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />}
      {showModal && <Modal type={modalType} onClose={handleModalClose} />}
    </nav>
  );
}

export default Navbar;
/*
<ul>
{isLoggedIn ? (
    <li><button onClick={handleLogout}>Cerrar sesión</button></li>
) : (
    <>
    <li><button onClick={() => handleModalOpen('register')}>Registrarse</button></li>
    <li><button onClick={() => handleModalOpen('login')}>Iniciar sesión</button></li>
    </>
)}
</ul>
*/