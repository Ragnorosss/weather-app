'use client';

import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import styles from './slider.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { WeatherDataCurrent } from '@/types/WeatehrDataCurrent';
import { Thermometer, SunSnow } from 'lucide-react';
interface WeatherSliderProps {
  weatherData: WeatherDataCurrent | null;
}

const WeatherSlider: FC<WeatherSliderProps> = ({ weatherData }) => {
  return (
    <Swiper
      modules={[Navigation]}
      slidesPerView={2}
      navigation
      pagination={{ clickable: true }}
      className={styles.slider}
      scrollbar={{ draggable: true }}
    >
      {weatherData?.forecast?.forecastday.map((day, index) => (
        <SwiperSlide key={index}>
          <div
            className={styles.forecastSlide}
          >
            <h3>{day.date}</h3>
            <p>
              <Thermometer />
              Макс: {day.day.maxtemp_c}°C, Мин: {day.day.mintemp_c}°C
            </p>
            <p>
              <SunSnow />
              Условия: {day.day.condition.text}
            </p>
            <Image
              src={`http:${day.day.condition.icon}`}
              alt="forecast icon"
              width={100}
              height={100}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default WeatherSlider;
