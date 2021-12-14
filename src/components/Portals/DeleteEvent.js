import React, { useContext } from 'react';
import AuthContext from '../../auth/AuthContext';
import { db, setActivity } from '../../firebase/client';

const DeleteEvent = ({ id, onClose }) => {
  const { usuario } = useContext(AuthContext);
  const handleDelete = async (e) => {
    await setActivity(
      usuario.activity,
      'evento',
      'Has borrado un evento, pero siempre puedes crear uno nuevo',
      'Evento borrado',
      'warning',
      usuario.uid,
    );
    await db.collection('eventos').doc(e).delete();
    onClose();
  };

  return (
    <div>
      <div className='modal-header'>
        <h5 className='modal-title' id='staticBackdropLabel'>¿Quieres eliminar este evento?</h5>
        <h6 className='card-subtitle mb-2 text-muted'>Esta acción será irreversible</h6>
      </div>
      <div className='modal-body'>
        Como creador puedes eliminar el evento en caso de que sea absolutamente necesario o así lo prefieras, esto eliminará a todos los registrados y la información del evento.
      </div>
      <div className='modal-footer'>
        <button type='button' onClick={onClose} className='btn btn-secondary mr-3'>Volver</button>
        <button type='button' onClick={() => handleDelete(id)} className='btn btn-danger'>Eliminar evento</button>
      </div>
    </div>
  );
};

export default DeleteEvent;
