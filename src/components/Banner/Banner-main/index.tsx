'use client';
import React, { useEffect, useState, useCallback } from 'react';
import styles from './banner-main.module.scss';
import useIP from '@/hooks/useIp';
import useDebounce from '@/hooks/useDebounce';
import { WeatherDataCurrent } from '@/types/WeatehrDataCurrent';
import Loader from '@/components/Loader';


const WeatherComponent: React.FC = () => {
  const { ip } = useIP();
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherDataCurrent | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedCity = useDebounce(city, 1000);

  const fetchWeather = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/weather?${query ? `city=${query}` : `ip=${ip}`}`
      , {
        method:"GET",
        cache:"force-cache",
      });
      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [ip]);

 
  useEffect(() => {
    if (ip) {
      fetchWeather(''); 
    }
  }, [ip, fetchWeather]);

  useEffect(() => {
    if (debouncedCity) {
      fetchWeather(debouncedCity); 
    }
  }, [debouncedCity, fetchWeather]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value); 
  };

  return (
    <div className={styles.banner}>
      <input
        type="text"
        value={city}
        onChange={handleChange}
        placeholder="Введите город (оставьте пустым для использования IP)"
      />
      <button onClick={() => fetchWeather(debouncedCity)}>Получить погоду</button>

      {loading && <Loader/>}
      {error && <div>Ошибка: {error}</div>}

      {weatherData && (
        <div className={styles.bannerInner}>
          <h2 className={styles.bannerTitle}>
            Погода в {weatherData.location.name}, {weatherData.location.region},{' '}
            {weatherData.location.country}
          </h2>
          <p className={styles.bannerTime}>
            Время: {weatherData.location.localtime}
          </p>
          <p className={styles.bannerTemp}>
            Температура: {weatherData.current.temp_c}°C
          </p>
          <p className={styles.bannerFeel}>
            Ощущается как: {weatherData.current.feelslike_c}°C
          </p>
          <p className={styles.bannerCondition}>
            Условия: {weatherData.current.condition.text}
          </p>
          <img src={weatherData.current.condition.icon} alt="weather icon" />
          
          <h3>Прогноз на 14 дней:</h3>
          <ul className={styles.forecast}>
            {weatherData?.forecast?.forecastday.map((day, index) => (
              <li key={index} className={styles.forecastDay}>
                <li>{day.date}</li>
                <li>Макс: {day.day.maxtemp_c}°C, Мин: {day.day.mintemp_c}°C</li>
                <li>Условия: {day.day.condition.text}</li>
                <img src={day.day.condition.icon} alt="forecast icon" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
