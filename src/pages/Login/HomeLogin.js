import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import styles from './HomeLogin.module.css';
import stylesBtn from '../../components/Forms/Button.module.css';
import { FiLogIn } from 'react-icons/fi';
import { UserContext } from '../../UserContext';

const HomeLogin = () => {
  const { login } = React.useContext(UserContext);
  if (login === true) return <Navigate to="/home" />;
  return (
    <section className={`${styles.hello} animeLeft`}>
      <div className={styles.container}>
        <h1 className="title">Bem Vindo ao GroupComp</h1>
        <p>
          <b>Cadastre</b>, <b>Busque</b> e <b>Modifique</b> os dados da sua
          empresa em um só lugar.
        </p>
        <div className={styles.submits}>
          <Link className={stylesBtn.button} to="/login">
            <FiLogIn />
            Login
          </Link>
          <Link className={stylesBtn.button} to="/login/cadastro">
            Cadastre-se
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeLogin;
