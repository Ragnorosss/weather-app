'use client';

import { useState, useEffect } from 'react';
import styles from './aside.module.scss';
import ModalWindow from '../ModalWindow';
import Link from 'next/link';

const Aside = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false); // Состояние для открытия/закрытия меню
  const [modalOpen, setModalOpen] = useState<boolean>(false); // Состояние для открытия/закрытия модалки
  const [cities, setCities] = useState<string[]>([]); // Состояние для хранения списка городов

  // Функция для переключения состояния меню
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // Открытие и закрытие модального окна
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Получение городов из localStorage при загрузке компонента
  useEffect(() => {
    const savedCities = localStorage.getItem('cities');
    if (savedCities) {
      setCities(JSON.parse(savedCities));
    }
  }, []);

  // Функция для обновления списка городов после добавления нового города
  const updateCities = () => {
    const savedCities = localStorage.getItem('cities');
    if (savedCities) {
      setCities(JSON.parse(savedCities)); // Обновляем список городов в состоянии
    }
  };

  return (
    <aside className={styles.aside}>
      <div className={styles.asideOpenMenu} onClick={handleMenuToggle}>
        <span></span>
      </div>

      {/* Список с кнопкой для открытия модального окна */}
      <ul
        className={`${
          menuOpen
            ? styles.listWeather + ' ' + styles.open
            : styles.listWeather + ' ' + styles.close
        }`}
      >
        <li>
          <button className={styles.asideBtn} onClick={handleModalOpen}>
            Add city
          </button>
        </li>
        {cities.length > 0 ? (
          cities.map((city, index) => <li key={index}><Link href={city} style={{textDecoration:"none", color:"inherit"}}>{city}</Link></li>)
        ) : (
          <li>Нет сохраненных городов</li>
        )}
      </ul>

      <ModalWindow
        setOpen={handleModalClose}
        open={modalOpen}
        updateCities={updateCities}
      />
    </aside>
  );
};

export default Aside;
