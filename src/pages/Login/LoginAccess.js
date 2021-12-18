import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Forms/Input';
import Button from '../../components/Forms/Button';
import styles from './Login.module.css';
import stylesBtn from '../../components/Forms/Button.module.css';
import useForm from '../../hooks/useForm';
import { UserContext } from '../../UserContext';

const LoginAccess = () => {
  const email = useForm('email');
  const password = useForm();
  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    if (email.validate() && password.validate()) {
      userLogin(email.value, password.value);
    }
  }

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <h1 className="title">Login</h1>
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Entrando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
      </form>

      <Link className={styles.perdeu} to="/Login">
        Perdeu a senha?
      </Link>

      <div className={styles.section}>
        <span>
          <h2 className={styles.subtitle}>Cadastre-se</h2>
          <p>Não possui conta? Cadastre-se</p>
        </span>

        <span className={styles.sub}>
          <Link className={stylesBtn.button} to="/login/cadastro">
            Cadastro
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginAccess;
