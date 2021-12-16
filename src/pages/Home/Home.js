import axios from 'axios';
import React from 'react';
import api from '../../services/api';
import styles from './Home.module.css';

const Home = () => {
  const [users, setUsers] = React.useState([]);
  const [companies, setCompanies] = React.useState([]);

  React.useEffect(() => {
    api.get('users').then(({ data }) => setUsers(data));

    api
      .post('session', {
        email: 'email@email.com',
        password: 'senhadificil123',
      })
      .then(({ data }) => window.localStorage.setItem('token', data.token));

    api
      .get('companies', {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      })
      .then((response) => setCompanies(response.data));
  }, []);

  return (
    <div className={styles.home}>
      <h1>Users</h1>
      <br />
      <h2>Local Storage Token</h2>
      <p>{window.localStorage.getItem('token')}</p>
      <br />
      <h2>Listagem de Usuários</h2>
      {users.map((user) => (
        <div key={user.id} style={{ marginBottom: '2rem' }}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ))}
      <h2>Listagem das Companhias</h2>
      {companies.map((company) => (
        <div key={company.id} style={{ marginBottom: '2rem' }}>
          <p>{company.name}</p>
          <p>{company.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
