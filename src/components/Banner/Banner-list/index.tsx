import Image from "next/image"
import { EDays } from '@/enum/days';
import styles from './banner-list.module.scss';
import { WeatherDataCurrent } from '@/types/WeatehrDataCurrent';
import { FC } from 'react';

interface IBannerList {
  days: EDays;
  weatherData: WeatherDataCurrent | null;
}

const BannerList: FC<IBannerList> = ({ days, weatherData }) => {
  return (
    <>
      <h3>Прогноз на {days} дней:</h3>
      <ul className={styles.forecast}>
        {weatherData?.forecast?.forecastday.map((day, index) => (
          <li key={index} className={styles.forecastItem}>
            <li>{day.date}</li>
            <li>
              Макс: {day.day.maxtemp_c}°C, Мин: {day.day.mintemp_c}°C
            </li>
            <li>Условия: {day.day.condition.text}</li>
            <Image src={`http:${day.day.condition.icon}`} alt="forecast icon" width={100} height={100}/>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BannerList;
