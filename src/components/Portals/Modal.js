import React from 'react';
import ReactDOM from 'react-dom';
import '../../assets/styles/components/Modal.css';
import close from '../../assets/img/icon/close.svg';

const Modal = ({ children, isOpen, onClose }) => {

  function handleCloseModal(e) {
    onClose(e.target.isOpen);
  }

  if (!isOpen) {
    return null;
  }

  return (
    ReactDOM.createPortal(
      <div className='Modal'>
        <div className='Modal__container'>
          <button onClick={handleCloseModal} type='button' className='Modal__close--button'>
            <img src={close} alt='cierra el modal' />
          </button>
          {children}
        </div>
      </div>,
      document.getElementById('Modal'),
    )
  );

};

export default Modal;
