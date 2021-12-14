import React from 'react';
import Event from './Event';

const Events = ({ events }) => {
  return (
    <div className='Events m-5'>
      <div className='container '>
        <div className='row row-cols-1 row-cols-sm-3 row-cols-md-3 row-cols-lg-5  g-4'>
          {events.map((e) => (
            <div key={e.id} className='col'>
              <Event eventInfo={e} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
