import React, { useState } from 'react';
import ButtonEvent from './ButtonEvent';
import Modal from '../Portals/Modal';
import InfoEvent from '../Portals/InfoEvent';
import '../../assets/styles/components/Events.css';

const Event = ({ eventInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const dateI = eventInfo.dateInit;
  const dateIR = dateI.split('-').reverse();
  const dateIRJ = dateIR.join('-');

  const dateE = eventInfo.dateEnd;
  const dateER = dateE.split('-').reverse();
  const dateERJ = dateER.join('-');

  return (
    <div className='Event'>
      <div className='card mb-1'>
        <div className='card-header'>
          <div className='card-title'>
            <h3>{eventInfo.name}</h3>
          </div>
        </div>
        <div className='card-body'>
          <p className='text-muted'>
            Fecha de inicio:
            {' '}
            {dateIRJ}
          </p>
          <p className='text-muted'>
            Fecha de fin:
            {' '}
            {dateERJ}
          </p>
          <hr />
          <p className='card-text'>¿Quieres saber más de este evento? Encuentra más información en el enlace:</p>
          <button type='button' onClick={handleOpen} className='btn btn-link float-end link-ancor'>Ver más</button>
          <Modal isOpen={isOpen} onClose={handleClose} xl>
            <InfoEvent data={eventInfo} onClose={handleClose} />
          </Modal>
        </div>
        <div className='card-footer'>
          <ButtonEvent enrolled={eventInfo.enrolled} creator={eventInfo.createdBy} id={eventInfo.id} banned={eventInfo.banned} name={eventInfo.name} className='btn-evento' />
        </div>
      </div>
    </div>
  );
};

export default Event;
