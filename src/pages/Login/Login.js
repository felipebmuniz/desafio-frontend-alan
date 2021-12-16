import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Forms/Input';
import Button from '../../components/Forms/Button';
import styles from './Login.module.css';
import stylesBtn from '../../components/Forms/Button.module.css';

const Login = () => {
  return (
    <section className={styles.login}>
      <div className={styles.container}>
        <div className={styles.form}>
          <form>
            <h1 className="title">Login</h1>
            <Input label="Email" type="email" name="email" />
            <Input label="Senha" type="password" name="password" />
            <Button>Entrar</Button>
          </form>

          <Link className={styles.perdeu} to="/Login">
            Perdeu a senha?
          </Link>

          <div className={styles.cadastro}>
            <h2 className={styles.subtitle}>Cadastre-se</h2>
            <p>Ainda não possui conta? Cadastre-se no site.</p>
            <Link className={stylesBtn.button} to="/login">
              Cadastro
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
