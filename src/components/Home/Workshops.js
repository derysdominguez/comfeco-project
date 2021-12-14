import React, { useEffect, useState } from 'react';
import '../../assets/styles/components/workshops.css';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import CardListWorkshops from './CardListWorkshops';
import {
  getWorkshopsToday,
  getWorkshopsFilterArea,
} from '../../firebase/client';

const Workshops = () => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [listWorkshops, setListWorkshops] = useState([]);
  const options = [
    {
      value: 'frontend',
      label: 'frontend',
    },
    {
      value: 'backend',
      label: 'backend',
    },
    {
      value: 'DevOps',
      label: 'DevOps',
    },
    {
      value: 'Video Game',
      label: 'Video Game',
    },
    {
      value: 'Developers',
      label: 'Developers',
    },
    {
      value: 'UI/UX',
      label: 'UI/UX',
    },
    {
      value: 'Database Developer',
      label: 'Database Developer',
    },
    {
      value: 'Cloud Computing',
      label: 'Cloud Computing',
    },
  ];

  const currentDay = new Date();
  const years = currentDay.getFullYear();
  const month = currentDay.getMonth();
  const date = currentDay.getDate();
  const startCurrentDay = new Date(years, month, date, 0, 0, 0);
  const endCurrentDay = new Date(years, month, date, 23, 59, 59);
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    getWorkshopsToday(startCurrentDay, endCurrentDay)
      .then((res) => {
        setListWorkshops(res);
      })
      .catch((error) => {
        console.log(error, 'error :)');
      });

  }, []);

  useEffect(() => {
    if (selectedOption.length !== 0) {
      getWorkshopsFilterArea(selectedOption.value)
        .then((res) => {
          setListWorkshops(res);
        })
        .catch((error) => {
          console.log(error, 'error :) del filtro');
        });
    }

  }, [selectedOption]);

  return (
    <aside className='workshops'>
      <div className='workshops__header'>
        <h5>Talleres</h5>
        <Link to='/'>Ver más</Link>
      </div>
      <div className='workshops__filter'>
        <Select
          value={selectedOption}
          onChange={handleChange}
          name='area'
          options={options}
          className='select-marca'
          placeholder='Selecciona una marca'
          noOptionsMessage={() => 'Cargando marcas'}
          required
        />
      </div>
      <div className='workshops__list'>
        {selectedOption.length === 0 && (
          <div className='list__header'>
            <span>HOY</span>
          </div>
        )}

        <div className='list__body'>
          {listWorkshops.length === 0 ? (
            <p>No se encontraron resultados</p>
          ) : (
            <>
              {listWorkshops.map((workshop) => (
                <CardListWorkshops key={workshop.id} workshop={workshop} />
              ))}
            </>
          )}
        </div>
      </div>
    </aside>
  );
};
export default Workshops;
