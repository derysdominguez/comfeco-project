import React, { useContext } from 'react';
import AuthContext from '../../auth/AuthContext';
import { db, setActivity } from '../../firebase/client';

const Unsubscribe = ({ onClose }) => {

  const { usuario } = useContext(AuthContext);

  const handleExit = async () => {
    await db.collection('usuarios').doc(usuario.uid).set({
      group: '',
    }, { merge: true });
    setActivity(
      'group',
      'Has salido de tu grupo, siempre puedes ingresar a otro',
      'Saliste de grupo',
      'warning',
      usuario.uid,
    );
    onClose();
  };

  return (
    <div>
      <div className='modal-header'>
        <h5 className='modal-title' id='staticBackdropLabel'>¿Quieres salir de este grupo?</h5>
        <h6 className='card-subtitle mb-2 text-muted'>Dejarán de reconocerte como miembro</h6>
      </div>
      <div className='modal-body'>
        ¿Estás seguro? Seguramente tu equipo se entristecerá si te marchas, en todo caso, siempre podrás unirte a un nuevo grupo.
      </div>
      <div className='modal-footer'>
        <button type='button' onClick={onClose} className='btn btn-secondary'>Volver</button>
        <button type='button' onClick={handleExit} className='btn btn-danger'>Salir del grupo</button>
      </div>
    </div>
  );
};

export default Unsubscribe;
