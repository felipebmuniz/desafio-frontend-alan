import React from 'react';
import { Link } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import styles from './Header.module.css';
import { UserContext } from '../../UserContext';

const Header = () => {
  const { userLogout } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/home">GroupComp</Link>
        <span onClick={userLogout}>
          <p>Sair</p>
          <BiLogOut />
        </span>
      </nav>
    </header>
  );
};

export default Header;
