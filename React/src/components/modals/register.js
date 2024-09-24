import React from 'react';

function Modal({ type, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{type === 'register' ? 'Registrarse' : 'Iniciar sesión'}</h2>
        {/* Aquí va el formulario de registro o inicio de sesión */}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default Modal;