import React from 'react';
import InfiniteCarousel from 'react-leaf-carousel';

const CarouselItem = ({ item, size }) => {
  const { name, img } = item;
  console.log(name, img, item, size);
  return (
    <div className='carrousel__item'>
      <img
        style={{ width: `${size}`, height: `${size}` }}
        alt={name}
        src={img}
      />
    </div>
  );
};

const Carousel = ({
  items,
  auto,
  visiblePorcent,
  sizeImg,
  slidesToShow,
  carousel,
}) => {
  console.log(sizeImg, 'tamaño');
  if (items.length === 0) {
    return <></>;
  }

  return (
    <InfiniteCarousel
      breakpoints={[
        {
          breakpoint: 500,
          settings: {
            slidesToShow: carousel === 'creadores' ? 2 : 3,
            slidesToScroll: carousel === 'creadores' ? 2 : 3,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: carousel === 'creadores' ? 3 : 4,
            slidesToScroll: carousel === 'creadores' ? 3 : 4,
          },
        },
      ]}
      dots={true}
      showSides={true}
      sidesOpacity={0.5}
      sideSize={Number(visiblePorcent)}
      slidesToScroll={3}
      slidesToShow={Number(slidesToShow)}
      // scrollOnDevice
      autoCycle={auto}
      animationDuration={500}
      cycleInterval={3000}
      slidesSpacing={10}
    >
      {items.map((item) => (
        <>
          <CarouselItem key={item.id} item={item} size={sizeImg} />
          <div className='item-name'>{item.name}</div>
        </>
      ))}
    </InfiniteCarousel>
  );
};

export default Carousel;
