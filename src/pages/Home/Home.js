import React from 'react';
import Select from '../../components/Forms/Select';
import Header from '../../components/Header/Header';
import api from '../../services/api';
import { UserContext } from '../../UserContext';
import styles from './Home.module.css';

const Home = () => {
  const [companies, setCompanies] = React.useState([]);
  // const [users, setUsers] = React.useState([]);
  const { data } = React.useContext(UserContext);
  const [cidade, setCidade] = React.useState('');

  React.useEffect(async () => {
    // setUsers(data);
    console.log(data);
    await api
      .get('companies')
      .then(({ data }) => setCompanies(data))
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err);
      });
  }, []);

  return (
    <>
      <Header />
      <section className={styles.home}>
        <h1 className="title">Suas Companhias</h1>
        <h2>Listagem das Companhias</h2>
        <Select
          type="Cidade"
          options={['Ibiapina', 'Sobral', 'Ubajara']}
          value={cidade}
          setValue={setCidade}
        />
        <div className={styles.container}>
          {companies.map((company) => (
            <div className={styles.company} key={company.id}>
              <p>{company.name}</p>
              <p>{company.email}</p>
            </div>
          ))}
          {companies.map((company) => (
            <div className={styles.company} key={company.id}>
              <p>{company.name}</p>
              <p>{company.email}</p>
            </div>
          ))}
          {companies.map((company) => (
            <div className={styles.company} key={company.id}>
              <p>{company.name}</p>
              <p>{company.email}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
