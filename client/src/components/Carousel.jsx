import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './Carousel.css';

const carouselData = [
  {
    id: 1,
    image: '/images/electronics-banner.jpg',
    title: 'Premium Electronics',
    description: 'Discover high-end gadgets at incredible prices',
    buttonText: 'Browse Electronics',
    category: 'electronics'
  },
  {
    id: 2,
    image: '/images/fashion-banner.jpg',
    title: 'Trending Fashion',
    description: 'Shop the latest styles from top brands',
    buttonText: 'Shop Fashion',
    category: 'fashion'
  },
  {
    id: 3,
    image: '/images/furniture-banner.jpg',
    title: 'Modern Furniture',
    description: 'Transform your space with elegant furniture',
    buttonText: 'View Collection',
    category: 'furniture'
  }
];

const Carousel = () => {
  return (
    <div className="carousel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="main-carousel"
      >
        {carouselData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="carousel-slide">
              <div className="slide-content">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <button className="slide-button" onClick={() => window.location.href = `/category/${slide.category}`}>
                  {slide.buttonText}
                </button>
              </div>
              <div 
                className="slide-background"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="slide-overlay" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;