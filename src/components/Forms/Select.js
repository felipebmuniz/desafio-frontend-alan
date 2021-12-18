import React from 'react';
import styles from './Select.module.css';

const Select = ({ type, options, value, setValue }) => {
  return (
    <div className={styles.wrapper}>
      <select
        className={styles.select}
        value={value}
        onChange={({ target }) => setValue(target.value)}
      >
        <option value="" disabled>
          {type}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
