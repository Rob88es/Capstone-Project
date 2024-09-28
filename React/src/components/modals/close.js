import React from 'react';

function ConfirmModal({ onConfirm, onCancel }) {
    return (
      <div className="modal">
        <div className="modal-content">
            <p>¿Estás seguro de que quieres cerrar sesión?</p>
            <button onClick={onConfirm}>Confirmar</button>
            <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    );
  }

export default ConfirmModal;