import React from 'react';
import styles from './HomeLogin.module.css';

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
          <button>Login</button>
          <button>Cadastrar</button>
        </div>
      </div>
    </section>
  );
};

export default HomeLogin;
