import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeLogin.module.css';
import stylesBtn from '../../components/Forms/Button.module.css';
import { BiLogIn } from 'react-icons/bi';

const HomeLogin = () => {
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
            <BiLogIn />
            Login
          </Link>
          <Link className={stylesBtn.button} to="/">
            Cadastre-se
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeLogin;
