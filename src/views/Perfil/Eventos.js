import React, { useState, useEffect } from 'react';
import Events from '../../components/perfil/Events';
import Modal from '../../components/Portals/Modal';
import NewEvent from '../../components/Portals/NewEvent';
import { db } from '../../firebase/client';

import '../../assets/styles/components/Events.css';

const Eventos = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const addEvent = async (e) => {
    await db.collection('eventos').doc().set(e);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const getEvents = () => {
    db.collection('eventos').onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setEvents(docs);
    });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className='fade-in animated container my-5'>
      <div className='d-flex justify-content-between'>
        <h2>Eventos</h2>
        <button type='button' onClick={handleOpen} className='btn d-inline-block btn-outline-secondary btn-evento'>Nuevo Evento</button>
        <Modal isOpen={isOpen} onClose={handleClose}>
          <NewEvent addEvent={addEvent} onClose={handleClose} />
        </Modal>
      </div>
      <Events events={events} />
    </div>
  );
};

export default Eventos;
