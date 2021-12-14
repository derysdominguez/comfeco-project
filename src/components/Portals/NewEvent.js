import React, { useState, useContext } from 'react';
import AuthContext from '../../auth/AuthContext';
import { setActivity } from '../../firebase/client';

const NewEvent = ({ addEvent, onClose }) => {
  const { usuario } = useContext(AuthContext);
  const initialState = {
    name: '',
    dateInit: '',
    dateEnd: '',
    description: '',
    enrolled: [usuario.uid],
    banned: [],
    createdBy: usuario.uid,
  };
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setActivity(
      usuario.activity,
      'evento',
      'Has creado un evento, ¡esperamos que sea un éxito!',
      'Evento creado',
      'success',
      usuario.uid,
    );
    await addEvent(values);
    await setValues(initialState);
    onClose();
    console.log(usuario);
  };

  return (
    <div className='container newEvent'>
      <h2>Nuevo evento</h2>
      <form onSubmit={handleSubmit} className='row g-3'>
        <div className='form-floating col-12 mb-3'>
          <input name='name' type='text' value={values.name} onChange={handleChange} className='form-control' id='name' placeholder='COMFECO' />
          <label htmlFor='name'>Nombre del evento</label>
        </div>
        <div className='form-floating col-12 col-sm-6 mb-3'>
          <input name='dateInit' type='date' value={values.dateInit} onChange={handleChange} className='form-control' id='dateInit' placeholder='Fecha de inicio' />
          <label htmlFor='dateInit'>Fecha de inicio</label>
        </div>
        <div className='form-floating col-12 col-sm-6 mb-3'>
          <input name='dateEnd' type='date' value={values.dateEnd} onChange={handleChange} className='form-control' id='dateEnd' placeholder='Fecha de fin' />
          <label htmlFor='dateEnd'>Fecha de fin</label>
        </div>
        <div className='form-floating col-12 mb-3'>
          <textarea onChange={handleChange} value={values.description} className='form-control' name='description' style={{ 'height': '100px' }} placeholder='¿En qué consiste el evento?' id='description' />
          <label htmlFor='description'>Descripción</label>
        </div>
        <button type='submit' className='btn btn-secondary'>Guardar</button>
      </form>
    </div>
  );
};

export default NewEvent;
