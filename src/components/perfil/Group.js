import React, { useContext, useState } from 'react';
import Modal from '../Portals/Modal';
import CanJoin from '../Portals/CanJoin';
import CantJoin from '../Portals/CantJoin';
import AuthContext from '../../auth/AuthContext';

const Group = ({ name, lang, img, desc, id }) => {

  const { usuario } = useContext(AuthContext);
  const [isOpenCanJoin, setIsOpenCanJoin] = useState(false);
  const [isOpenCantJoin, setIsOpenCantJoin] = useState(false);

  const onCloseCan = () => {
    setIsOpenCanJoin(false);
  };

  const onCloseCant = () => {
    setIsOpenCantJoin(false);
  };

  const handleJoin = () => {
    if (usuario.group !== '') {
      setIsOpenCantJoin(true);
    } else {
      setIsOpenCanJoin(true);
    }
  };

  return (
    <div className='col'>
      <div className='card h-100'>
        <div className='card-img'>
          <img className='h-100 w-100' src={img} />
        </div>
        <div className='card-body'>
          <div className='box-lenguaje'>
            {lang}
          </div>
          <h5 className='card-title text-start'>{name}</h5>
          <p className='card-text text-start'>
            {desc}
          </p>
        </div>
        <div className='card-footer text-center'>
          <button
            onClick={handleJoin}
            type='button'
            className='btn d-inline-block btn-outline-secondary btn-evento '
          >
            Unirse
          </button>
          <Modal isOpen={isOpenCanJoin} onClose={onCloseCan}>
            <CanJoin img={img} id={id} lang={lang} name={name} desc={desc} onClose={onCloseCan} />
          </Modal>
          <Modal isOpen={isOpenCantJoin} onClose={onCloseCant}>
            <CantJoin onClose={onCloseCant} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Group;
