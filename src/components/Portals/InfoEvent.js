import React from 'react';

const InfoEvent = ({ data, onClose }) => {
  return (
    <div>
      <div className='modal-header'>
        <h5 className='modal-title' id='staticBackdropLabel'>{data.name}</h5>
      </div>
      <div className='modal-body'>
        {data.description}
      </div>
      <div className='modal-footer'>
        <button type='button' onClick={onClose} className='btn btn-secondary'>Cerrar</button>
      </div>
    </div>
  );
};

export default InfoEvent;
