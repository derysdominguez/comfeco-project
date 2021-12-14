import React, { useState, useRef, useEffect } from 'react';
import '../../assets/styles/components/counter.css';

const Counter = () => {
  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date('Mar 20, 2021 00:00:00').getTime();

    interval = setInterval(() => {
      const now = new Date();
      const diff = countdownDate - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = (`0${Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}`).slice(-2);
      const minutes = (`0${Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))}`).slice(-2);
      const seconds = (`0${Math.floor((diff % (1000 * 60)) / 1000)}`).slice(-2);

      if (diff <= 1) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <div className='Counter'>
      <div className='Counter__inner'>
        <div className='Counter__days'>
          <h1>{timerDays}</h1>
          <small>Días</small>
        </div>
      </div>
      <span>:</span>
      <div className='Counter__inner'>
        <div className='Counter__hours'>
          <h1>{timerHours}</h1>
          <small>Horas</small>
        </div>
      </div>
      <span>:</span>
      <div className='Counter__inner'>
        <div className='Counter__minutes'>
          <h1>{timerMinutes}</h1>
          <small>Minutos</small>
        </div>
      </div>
      <span>:</span>
      <div className='Counter__inner'>
        <div className='Counter__seconds'>
          <h1>{timerSeconds}</h1>
          <small>Segundos</small>
        </div>
      </div>
    </div>
  );
};

export default Counter;
