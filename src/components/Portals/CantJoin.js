import React from 'react';

const CantJoin = ({ onClose }) => {
  return (
    <div>
      <div className='modal-header'>
        <h5 className='modal-title' id='staticBackdropLabel'>No puedes unirte</h5>
        <h6 className='card-subtitle mb-2 text-muted'>Solo puedes estar en un grupo</h6>
      </div>
      <div className='modal-body'>
        Parece que estás intentando ingresar a un grupo cuándo ya perteneces a otro, si prefieres estar aquí por favor sal de tu grupo anterior antes.
      </div>
      <div className='modal-footer'>
        <button type='button' onClick={onClose} className='btn btn-secondary'>Volver</button>
      </div>
    </div>
  );
};

export default CantJoin;
