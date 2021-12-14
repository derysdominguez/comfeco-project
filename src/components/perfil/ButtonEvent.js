import React, { useContext, useState } from 'react';
import AuthContext from '../../auth/AuthContext';
import Modal from '../Portals/Modal';
import DeleteEvent from '../Portals/DeleteEvent';
import ExitEvent from '../Portals/ExitEvent';
import EnterEvent from '../Portals/EnterEvent';
import trash from '../../assets/img/icon/trash.svg';

const ButtonEvent = ({ enrolled, banned, id, creator, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenExit, setIsOpenExit] = useState(false);
  const [isOpenEnter, setIsOpenEnter] = useState(false);
  const { usuario } = useContext(AuthContext);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleCloseExit = () => {
    setIsOpenExit(false);
  };

  const handleOpenExit = () => {
    setIsOpenExit(true);
  };

  const handleCloseEnter = () => {
    setIsOpenEnter(false);
  };

  const handleOpenEnter = () => {
    setIsOpenEnter(true);
  };

  if (creator === usuario.uid) {
    return (
      <div className='row'>
        <small className='text-muted col-9'>Tu eres el creador del evento ¿Deseas eliminarlo?</small>
        <button type='button' className='btn btn-outline-danger col-3' onClick={handleOpen}><img src={trash} alt='' /></button>
        <Modal isOpen={isOpen} onClose={handleClose}>
          <DeleteEvent id={id} onClose={handleClose} />
        </Modal>
      </div>
    );
  }

  if (enrolled.indexOf(usuario.uid) >= 0) {
    return (
      <>
        <button type='button' onClick={handleOpenExit} className='btn btn-danger float-end'>Salir del evento</button>
        <Modal isOpen={isOpenExit} onClose={handleCloseExit}>
          <ExitEvent id={id} enrolled={enrolled} banned={banned} user={usuario.uid} name={name} onClose={handleCloseExit} />
        </Modal>
      </>
    );
  }

  if (banned.indexOf(usuario.uid) >= 0) {
    return (
      <button type='button' className='btn btn-outline-danger disabled float-end'>Estás vetado de este evento</button>
    );
  }

  return (
    <>
      <button type='button' onClick={handleOpenEnter} className='btn btn-success float-end btn-morado'>¡Me anoto!</button>
      <Modal isOpen={isOpenEnter} onClose={handleCloseEnter}>
        <EnterEvent id={id} enrolled={enrolled} user={usuario.uid} name={name} onClose={handleCloseEnter} />
      </Modal>

    </>
  );
};

export default ButtonEvent;
