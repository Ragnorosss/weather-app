import { FC, useState } from 'react';
import styles from './modal.module.scss';

interface IModalProps {
  setOpen: () => void; // Функция для закрытия модального окна
  open: boolean; // Состояние открытия модального окна
  updateCities: () => void; // Функция для обновления списка городов
}

const ModalWindow: FC<IModalProps> = ({ setOpen, open, updateCities }) => {
  const [city, setCity] = useState<string>(''); // Состояние для хранения введенного города

  // Функция для сохранения города в localStorage
  const addCity = () => {
    if (city.trim()) {
      const savedCities = JSON.parse(localStorage.getItem('cities') || '[]');
      localStorage.setItem('cities', JSON.stringify([...savedCities, city]));
      setCity(''); // Очистить поле после добавления
      setOpen(); // Закрыть модальное окно
      updateCities(); // Обновить список городов
    } else {
      alert('Введите название города'); // Вывод предупреждения, если поле пустое
    }
  };

  return (
    <div className={`${styles.modal} ${open ? styles.open : styles.close}`}>
      <div className={styles.modalContent}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Обновление состояния при вводе
          placeholder="City"
        />
        <button type="button" onClick={addCity}>
          Add
        </button>
        <button className={styles.closeBtn} onClick={setOpen}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalWindow;
