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
        <option value="">{type}</option>
        {options.map((option) => (
          <option
            key={option.id}
            value={type === 'Estado' ? option.sigla : option.nome}
          >
            {option.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
