import React from 'react';
import styles from './day-filter.module.scss';
import { EDays } from '@/enum/days';

interface DaysFilterProps {
  selectedDays: EDays;
  onFilterChange: (days: EDays) => void;
}

const DaysFilter: React.FC<DaysFilterProps> = ({
  selectedDays,
  onFilterChange,
}) => {
  return (
    <div className={styles.filter}>
      <button
        className={selectedDays === EDays.ToDay ? styles.active : ''}
        onClick={() => onFilterChange(EDays.ToDay)}
      >
        Сегодня
      </button>
      <button
        className={selectedDays === EDays.Days7 ? styles.active : ''}
        onClick={() => onFilterChange(EDays.Days7)}
      >
        7 дней
      </button>
      <button
        className={selectedDays === EDays.Days14 ? styles.active : ''}
        onClick={() => onFilterChange(EDays.Days14)}
      >
        14 дней
      </button>
    </div>
  );
};

export default DaysFilter;
