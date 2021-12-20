import React from 'react';
import { BiFilterAlt, BiAddToQueue, BiTrashAlt, BiEdit } from 'react-icons/bi';
import styles from './ActionButton.module.css';

const ActionButton = ({ type, onClick }) => {
  function typeButton() {
    switch (type) {
      case 'filter':
        return <BiFilterAlt />;
      case 'add':
        return <BiAddToQueue />;
      case 'edit':
        return <BiEdit className={styles.edit} />;
      case 'delete':
        return <BiTrashAlt className={styles.delete} />;
      default:
        return null;
    }
  }

  return (
    <div className={styles.addContainer}>
      <span className={styles.ActionBtn} onClick={onClick}>
        {typeButton()}
      </span>
    </div>
  );
};

export default ActionButton;
