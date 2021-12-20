import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/Forms/Input';
import Button from '../../components/Forms/Button';
import styles from './Login.module.css';
import stylesBtn from '../../components/Forms/Button.module.css';
import useForm from '../../hooks/useForm';
import { UserContext } from '../../UserContext';
import api from '../../services/api';

const LoginCreate = () => {
  const name = useForm();
  const email = useForm('email');
  const password = useForm('password');
  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    if (email.validate() && password.validate()) {
      const postUser = await api.post('users', {
        name: name.value,
        email: email.value,
        password: password.value,
        is_admin: true,
      });
      console.log(name.value);
      console.log(email.value);
      console.log(password.value);
      console.log(postUser);
      if (postUser.status !== 200) Error(`Error: ${postUser.statusText}`);
      userLogin(email.value, password.value);
    }
  }

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <h1 className="title">Cadastro</h1>
        <Input label="Nome" type="text" name="name" {...name} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        {error && <p style={{ color: '#f31', margin: '1rem 0' }}>{error}</p>}
      </form>

      <div className={styles.section}>
        <span>
          <h2 className={styles.subtitle}>Login</h2>
          <p>Possui conta? Realize seu Login</p>
        </span>

        <span className={styles.sub}>
          <Link className={stylesBtn.button} to="/login">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginCreate;
