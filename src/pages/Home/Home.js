import React from 'react';
import Select from '../../components/Forms/Select';
import Header from '../../components/Header/Header';
import api from '../../services/api';
import { UserContext } from '../../UserContext';
import styles from './Home.module.css';
import { FiFilter } from 'react-icons/fi';

const Home = () => {
  const [companies, setCompanies] = React.useState([]);
  const { data } = React.useContext(UserContext);
  const [cidade, setCidade] = React.useState('');

  React.useEffect(() => {
    // console.log(data);
    api
      .get('companies')
      .then(({ data }) => setCompanies(data))
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err);
      });
    console.log(companies);
  }, [data, companies]);

  function filterCompanies() {}

  return (
    <section className="animeLeft">
      <Header />
      <section className={styles.home}>
        <h1 className="title">Suas Companhias</h1>
        <h2>Listagem das Companhias</h2>
        <div className={styles.filter}>
          <Select
            type="Cidade"
            options={['Ibiapina', 'Sobral', 'Ubajara']}
            value={cidade}
            setValue={setCidade}
          />
          <Select
            type="Estado"
            options={['Ceará', 'Rio Grande do Norte', 'Piauí']}
            value={cidade}
            setValue={setCidade}
          />
          <Select
            type="Região"
            options={['Nordeste', 'Sudeste', 'Norte']}
            value={cidade}
            setValue={setCidade}
          />
          <span className={styles.ActionBtn} onClick={filterCompanies}>
            <FiFilter />
          </span>
        </div>

        <div className={styles.container}>
          {companies.map((company) => (
            <div className={styles.company} key={company.id}>
              <h4>{company.fantasy_name}</h4>
              <p>{company.name}</p>
              <p>CNPJ: {company.cnpj}</p>
              <p>Email: {company.email}</p>
              <p>Contato: {company.telephone}</p>
              <p>
                {company.city} / {company.state} - {company.zip_code}
              </p>
            </div>
          ))}
          {companies.map((company) => (
            <div className={styles.company} key={company.id}>
              <h4>{company.fantasy_name}</h4>
              <p>{company.name}</p>
              <p>CNPJ: {company.cnpj}</p>
              <p>Email: {company.email}</p>
              <p>Contato: {company.telephone}</p>
              <p>
                {company.city} / {company.state} - {company.zip_code}
              </p>
            </div>
          ))}
          {companies.map((company) => (
            <div className={styles.company} key={company.id}>
              <h4>{company.fantasy_name}</h4>
              <p>{company.name}</p>
              <p>CNPJ: {company.cnpj}</p>
              <p>Email: {company.email}</p>
              <p>Contato: {company.telephone}</p>
              <p>
                {company.city} / {company.state} - {company.zip_code}
              </p>
            </div>
          ))}
          {companies.map((company) => (
            <div className={styles.company} key={company.id}>
              <h4>{company.fantasy_name}</h4>
              <p>{company.name}</p>
              <p>CNPJ: {company.cnpj}</p>
              <p>Email: {company.email}</p>
              <p>Contato: {company.telephone}</p>
              <p>
                {company.city} / {company.state} - {company.zip_code}
              </p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Home;
