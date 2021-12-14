import React, { useContext } from 'react';
import AuthContext from '../../auth/AuthContext';
import { db, setActivity } from '../../firebase/client';

const ExitEvent = ({ id, onClose, enrolled, banned, user, name }) => {
  const { usuario } = useContext(AuthContext);
  const updateData = async (e) => {
    await db.collection('eventos').doc(id).update(e);
    onClose();
  };

  const handleInfo = async () => {
    await setActivity(
      'evento',
      'Has salido de un evento, ahora estarás vetado de él',
      `Saliste del evento ${name}`,
      'warning',
      usuario.uid,
    );
    // Se toma toda la info de la base de datos del evento en cuestión
    const doc = await db.collection('eventos').doc(id).get();
    // Se agrega al usuario a la lista de "Vetados"
    banned.push(user);
    // Se consigue el indice que ocupa en el array de inscritos
    const index = enrolled.indexOf(user);
    // Se saca de la lista de inscritos
    enrolled.splice(index, 1);
    // Se envía el objeto con la nueva lista
    updateData({ ...doc.data(), banned, enrolled });
  };

  return (

    <div>
      <div className='modal-header'>
        <h5 className='modal-title' id='staticBackdropLabel'>¿Quieres salir de este evento?</h5>
        <h6 className='card-subtitle mb-2 text-muted'>Esta acción será irreversible</h6>
      </div>
      <div className='modal-body'>
        Ten en cuenta que si sales de este evento, quedarás
        <b> vetado </b>
        y no podrás volver a inscribirte.
      </div>
      <div className='modal-footer'>
        <button type='button' onClick={onClose} className='btn btn-secondary'>Volver</button>
        <button type='button' onClick={handleInfo} className='btn btn-danger'>Salir del evento</button>
      </div>
    </div>
  );
};

export default ExitEvent;
