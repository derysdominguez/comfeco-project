import React from 'react';
import '../../assets/styles/components/Activity.css';
import evento from '../../assets/img/icon/evento.svg';
import badge from '../../assets/img/icon/badge.svg';
import group from '../../assets/img/icon/group.svg';
import profile from '../../assets/img/icon/profile.svg';

const Activity = ({ type, message, color, title, time }) => {

  const endTime = new Date();
  const startTime = time;
  const timeDiff = endTime.getTime() - startTime;
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (type === 'evento') {
    return (
      <div className='activity'>
        <div className='row'>
          <div className='col-3'>
            <div className='activity-type'>
              <img src={evento} alt='icon' className='activity_icon' />
            </div>
          </div>
          <div className='col-9'>
            <h3 className={`titulo-actividad ${color}`}>
              {title}
              {' '}
              -
              {' '}
              <span className='text-muted'>{days > 0 ? `Hace ${days} días` : hours > 0 ? `Hace ${hours} horas` : minutes > 0 ? `Hace ${minutes} minutos` : `Hace ${seconds} segundos`}</span>
            </h3>
            <small className='text-muted'>{message}</small>

          </div>
        </div>
      </div>
    );
  };
  if (type === 'group') {
    return (
      <div className='activity'>
        <div className='row'>
          <div className='col-3'>
            <div className='activity-type'>
              <img src={group} alt='icon' className='activity_icon' />
            </div>
          </div>
          <div className='col-9'>
            <h3 className={`titulo-actividad ${color}`}>
              {title}
              {' '}
              -
              {' '}
              <span className='text-muted'>{days > 0 ? `Hace ${days} días` : hours > 0 ? `Hace ${hours} horas` : minutes > 0 ? `Hace ${minutes} minutos` : `Hace ${seconds} segundos`}</span>
            </h3>
            <small className='text-muted'>{message}</small>

          </div>
        </div>
      </div>
    );
  };
  if (type === 'badge') {
    return (
      <div className='activity'>
        <div className='row'>
          <div className='col-3'>
            <div className='activity-type'>
              <img src={badge} alt='icon' className='activity_icon' />
            </div>
          </div>
          <div className='col-9'>
            <h3 className={`titulo-actividad ${color}`}>
              {title}
              -
              <span className='text-muted'>{days > 0 ? `Hace ${days} días` : hours > 0 ? `Hace ${hours} horas` : minutes > 0 ? `Hace ${minutes} minutos` : `Hace ${seconds} segundos`}</span>
            </h3>
            <small className='text-muted'>{message}</small>

          </div>
        </div>
      </div>
    );
  };
  if (type === 'perfil') {
    return (
      <div className='activity'>
        <div className='row'>
          <div className='col-3'>
            <div className='activity-type'>
              <img src={profile} alt='icon' className='activity_icon' />
            </div>
          </div>
          <div className='col-9'>
            <h3 className={`titulo-actividad ${color}`}>
              {title}
              -
              <span className='text-muted'>{days > 0 ? `Hace ${days} días` : hours > 0 ? `Hace ${hours} horas` : minutes > 0 ? `Hace ${minutes} minutos` : `Hace ${seconds} segundos`}</span>
            </h3>
            <small className='text-muted'>{message}</small>

          </div>
        </div>
      </div>
    );
  };
};

export default Activity;
