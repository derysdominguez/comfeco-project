import React, { useContext, useState, useEffect } from 'react';
import { getEvents } from '../../firebase/client';
import AuthContext from '../../auth/AuthContext';

const EventsProfile = () => {

  const { usuario } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents(usuario.uid)
      .then((res) => {
        setEvents(res);
      })
      .catch((err) => {
        console.log('This events gonna fuck all this ', err);
      });
  }, []);

  return (
    <div className='box-info-user'>
      <div className='list-group'>
        <h4 className='float-start user-name'>Mis eventos</h4>
        {
          events.map((e) => {
            return (
              <div className='list-group-item'>
                <div className='d-flex w-100 justify-content-between'>
                  <h5 className='mb-1'>{e.name}</h5>
                </div>
                <small className='text-muted'>
                  Fecha de inicio:
                  <br />
                  {e.dateInit}
                </small>
              </div>
            );
          })
        }
      </div>
      {/* Aquí iría el botón para ir a eventos, pero no sé como ponerlo al ser de React/bootstrap  */}
    </div>
  );
};

export default EventsProfile;
