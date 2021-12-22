import React from 'react';
import { BiFilterAlt, BiAddToQueue, BiTrashAlt, BiEdit } from 'react-icons/bi';
import styles from './ActionButton.module.css';

const ActionButton = ({ type, onClick }) => {
  function typeButton() {
    switch (type) {
      case 'filter':
        return (
          <div className={styles.addContainer}>
            <span className={styles.ActionBtn} onClick={onClick}>
              <BiFilterAlt />
            </span>
          </div>
        );
      case 'add':
        return (
          <div className={styles.addContainer}>
            <span
              className={`${styles.ActionBtn} ${styles.add}`}
              onClick={onClick}
            >
              <BiAddToQueue />
            </span>
          </div>
        );
      case 'edit':
        return (
          <div className={styles.addContainer}>
            <span
              className={`${styles.ActionBtn} ${styles.edit}`}
              onClick={onClick}
            >
              <BiEdit />
            </span>
          </div>
        );
      case 'delete':
        return (
          <div className={styles.addContainer}>
            <span
              className={`${styles.ActionBtn} ${styles.delete}`}
              onClick={onClick}
            >
              <BiTrashAlt />
            </span>
          </div>
        );
      default:
        return null;
    }
  }

  return typeButton();
};

export default ActionButton;
