import React, { useContext } from 'react';
import AuthContext from '../../auth/AuthContext';
import { db, setActivity } from '../../firebase/client';

const EnterEvent = ({ id, onClose, enrolled, user, name }) => {
  const { usuario } = useContext(AuthContext);

  const updateData = async (e) => {
    await db.collection('eventos').doc(id).update(e);
    onClose();
  };

  const handleInfo = async () => {
    await setActivity(
      'evento',
      'Has entrado a un evento, ¡disfruta mucho de esta experiencia!',
      `Ingresaste al evento ${name}`,
      'success',
      usuario.uid,
    );
    // Se toma toda la info de la base de datos del evento en cuestión
    const doc = await db.collection('eventos').doc(id).get();
    // Se agrega al usuario a la lista de "Inscritos"
    enrolled.push(user);
    // Se envía el objeto con la nueva lista
    updateData({ ...doc.data(), enrolled });
  };

  return (

    <div>
      <div className='modal-header'>
        <h5 className='modal-title' id='staticBackdropLabel'>¿Quieres entrar a este evento?</h5>
      </div>
      <div className='modal-body'>
        <b> ¡Felicidades! </b>
        El primer paso para crecer es tener la iniciativa de tomar retos, nos encanta escuchar que quieres participar en este evento, para ingresar por favor confirma en el siguiente botón.
      </div>
      <div className='modal-footer'>
        <button type='button' onClick={onClose} className='btn btn-secondary'>Volver</button>
        <button type='button' onClick={handleInfo} className='btn btn-success btn-morado'>Entrar al evento</button>
      </div>
    </div>
  );
};

export default EnterEvent;
