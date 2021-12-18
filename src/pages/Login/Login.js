import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginAccess from './LoginAccess';
import NotFound from '../NotFound';
import LoginCreate from './LoginCreate';
import styles from './Login.module.css';
import { UserContext } from '../../UserContext';

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login === true) return <Navigate to="/home" />;
  return (
    <section className={`${styles.login} animeLeft`}>
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<LoginAccess />} />
          <Route path="/cadastro" element={<LoginCreate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
