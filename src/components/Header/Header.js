import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import styles from './Header.module.css';
import { UserContext } from '../../UserContext';

const Header = () => {
  const { userLogout } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/home">GroupComp</Link>
        <span onClick={userLogout}>
          <FiLogOut />
          <p> Sair</p>
        </span>
      </nav>
    </header>
  );
};

export default Header;
