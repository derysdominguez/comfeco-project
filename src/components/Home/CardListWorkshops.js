import React, { useEffect } from 'react';
import '../../assets/styles/components/workshops.css';
import iconCheck from '../../assets/img/icon/check_circular.svg';
import iconPoints from '../../assets/img/icon/points_circular.svg';
import { setWorkshopStatus } from '../../firebase/client';

const CardListWorkshops = ({ workshop }) => {

  const workshopStatus = () => {
    const currentDate = new Date().getTime();
    const workshopStartDate = new Date(workshop.hora).getTime();
    if (currentDate >= workshopStartDate && workshop.estado !== '') {
      setWorkshopStatus(workshop.id, 'Empezó');
    } else if (currentDate < workshopStartDate && workshop.estado !== '') {
      setWorkshopStatus(workshop.id, 'Por empezar');
    }

  };
  useEffect(() => {
    const timerWorkshopStatus = setInterval(() => {
      workshopStatus();
    }, 1000);
    return () => clearTimeout(timerWorkshopStatus);
  }, []);
  return (
    <div className='list__body--group'>

      {
        workshop.estado !== 'Empezó' ? <img src={iconPoints} alt='icono de taller' /> : <img src={iconCheck} alt='icono de taller' />
      }

      <div>
        <h5>{workshop.titulo}</h5>

        <h6>{workshop.hora}</h6>
        <p>
          <span>By </span>
          <a href={workshop.redSocial}>{workshop.profesor}</a>
        </p>
      </div>
    </div>
  );
};

export default CardListWorkshops;
