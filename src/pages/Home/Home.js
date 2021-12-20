import React from 'react';
import Select from '../../components/Forms/Select';
import Header from '../../components/Header/Header';
import ActionButton from '../../components/ActionButton/ActionButton';
// import { UserContext } from '../../UserContext';
import styles from './Home.module.css';
import useForm from '../../hooks/useForm';
import {
  DLETE_COMPANY,
  EDIT_COMPANY,
  GET_COMPANIES,
  POST_COMPANY,
} from '../../services/endpointsCompany';
import AddCompany from '../../components/Company/AddCompany';

const Home = () => {
  // const { data, session, userSession } = React.useContext(UserContext);
  // const [user, setUser] = React.useState([]);
  const [companies, setCompanies] = React.useState([]);
  const [addCompany, setAddCompany] = React.useState(false);

  const refAdd = React.useRef();

  const [cidade, setCidade] = React.useState('');

  const phone = useForm();
  const cnpj = useForm();
  const cep = useForm();

  React.useEffect(() => {
    GET_COMPANIES(setCompanies);
  }, [setCompanies]);

  function filterCompanies() {}

  function handleSubmit(event) {
    event.preventDefault();
    setAddCompany(false);
    POST_COMPANY(cnpj.value);
    phone.setValue('');
    cnpj.setValue('');
    cep.setValue('');
    GET_COMPANIES(setCompanies);
  }

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
          <ActionButton type="filter" onClick={filterCompanies} />
        </div>

        <div className={styles.content}>
          <ActionButton type="add" onClick={() => setAddCompany(!addCompany)} />

          {addCompany && (
            <AddCompany
              inputs={{ phone, cnpj, cep }}
              handleSubmit={handleSubmit}
            />
          )}

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
                <div className={styles.crud}>
                  <ActionButton type="edit" onClick={EDIT_COMPANY()} />
                  <ActionButton type="delete" onClick={DLETE_COMPANY()} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
