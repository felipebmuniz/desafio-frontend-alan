import React from 'react';
import InputMask from 'react-input-mask';
import styles from './Input.module.css';

const MaskInput = ({ label, name, mask, value, onChange, onBlur, error }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <InputMask
        className={styles.input}
        id={name}
        name={name}
        mask={mask}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default MaskInput;
