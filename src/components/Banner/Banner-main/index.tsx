'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './banner-main.module.scss';
import useDebounce from '@/hooks/useDebounce';
import { WeatherDataCurrent } from '@/types/WeatehrDataCurrent';
import Loader from '@/components/Loader';
import DaysFilter from '@/components/Filter';
import { EDays } from '@/enum/days';
import { Thermometer, Clock, House, SunSnow } from 'lucide-react';
import Image from 'next/image';
import Slider from '@/components/Slider';

interface WeatherComponentProps {
  cityName?: string; // Опционально: переданный город
}

const WeatherComponent: React.FC<WeatherComponentProps> = ({ cityName = '' }) => {
  const [city, setCity] = useState<string>(cityName || '');
  const [days, setDays] = useState<EDays>(EDays.ToDay);
  const [weatherData, setWeatherData] = useState<WeatherDataCurrent | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedCity = useDebounce(city, 1000);

  const fetchWeather = useCallback(
    async (query: string, days: EDays) => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/weather?${query ? `city=${query}` : ''}&days=${days}`,
          {
            method: 'GET',
            cache: 'force-cache',
          }
        );
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
    },
    []
  );

  // Запрос при переданном cityName (с URL) или изменении дней
  useEffect(() => {
    if (cityName) {
      fetchWeather(cityName, days);
    }
  }, [cityName, fetchWeather, days]);

  // Запрос при изменении города в инпуте (через debounce)
  useEffect(() => {
    if (debouncedCity) {
      fetchWeather(debouncedCity, days);
    }
  }, [debouncedCity, fetchWeather, days]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleDaysChange = (selectedDays: EDays) => {
    setDays(selectedDays);
  };

  return (
    <>
      <div className={styles.banner}>
        {/* Инпут для ввода города */}
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Введите город"
          className={styles.bannerInput}
        />
        <button
          onClick={() => fetchWeather(debouncedCity, days)}
          className={styles.bannerBtn}
        >
          Получить погоду
        </button>

        {/* Фильтр дней */}
        <DaysFilter selectedDays={days} onFilterChange={handleDaysChange} />

        {/* Лоадер и ошибки */}
        {loading && <Loader />}
        {error && <div>Ошибка: {error}</div>}

        {/* Отображение данных о погоде */}
        {weatherData && (
          <div className={styles.bannerInner}>
            <h2
              className={styles.bannerTitle}
              style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
            >
              <House />
              Погода в {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}
            </h2>
            <p className={styles.bannerTime}>
              <Clock />
              Время: {weatherData.location.localtime}
            </p>
            <p className={styles.bannerTemp}>
              <Thermometer />
              Температура: {weatherData.current.temp_c}°C
            </p>
            <p className={styles.bannerFeel}>
              <Thermometer />
              Ощущается как: {weatherData.current.feelslike_c}°C
            </p>
            <p className={styles.bannerCondition}>
              <SunSnow />
              Условия: {weatherData.current.condition.text}
            </p>
            <Image
              src={`http:${weatherData.current.condition.icon}`}
              alt="weather icon"
              width={100}
              height={100}
              style={{
                margin: '0 auto',
              }}
            />
          </div>
        )}
      </div>

      {/* Отображение слайдера если выбран не текущий день */}
      {days === EDays.ToDay ? null : (
        <Slider weatherData={weatherData} />
      )}
    </>
  );
};

export default WeatherComponent;
