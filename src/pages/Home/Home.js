import React from 'react';
import Select from '../../components/Forms/Select';
import Header from '../../components/Header/Header';
import ActionButton from '../../components/ActionButton/ActionButton';
import useForm from '../../hooks/useForm';
import {
  DLETE_COMPANY,
  EDIT_COMPANY,
  GET_CNPJ,
  GET_COMPANIES,
  POST_COMPANY,
} from '../../services/endpointsCompany';
import AddCompany from '../../components/Company/AddCompany';
import styles from './Home.module.css';

function converteAbertura(opening) {
  const reData = opening.split('T').slice(0, -1);
  return reData[0].split('-').reverse().join('/');
}

const Home = () => {
  const [companies, setCompanies] = React.useState([]);
  const [addCompany, setAddCompany] = React.useState(false);

  const [cidade, setCidade] = React.useState('');

  const phone = useForm();
  const CNPJ = useForm();
  const CEP = useForm();

  React.useEffect(() => {
    GET_COMPANIES(setCompanies);
  }, []);

  function filterCompanies() {}

  async function handleSubmit(event) {
    event.preventDefault();
    console.log('Enviou formulário');
    console.log(CNPJ);

    const {
      nome,
      fantasia,
      cnpj,
      abertura,
      email,
      telefone,
      municipio,
      uf,
      cep,
    } = await GET_CNPJ(CNPJ.value);
    try {
      const data = await POST_COMPANY({
        nome,
        fantasia,
        cnpj,
        abertura,
        email,
        telefone,
        municipio,
        uf,
        cep,
      });
      setCompanies([...companies, data]);
    } catch (err) {
      alert('Erro em adicionar Empresa');
    }

    phone.setValue('');
    CNPJ.setValue('');
    CEP.setValue('');
    setAddCompany(false);
  }

  function clickDelete(id) {
    const companiExists = companies.findIndex((company) => company.cnpj === id);
    if (companiExists === -1) {
      return alert('Companhia não existe.');
    }
    DLETE_COMPANY(companies[companiExists].id);
    const aux = companies.filter((comany) => comany.cnpj !== id);
    setCompanies(aux);
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
              inputs={{ phone, CNPJ, CEP }}
              handleSubmit={handleSubmit}
            />
          )}

          <div className={styles.container}>
            {companies &&
              companies.map((company) => (
                <div className={styles.company} key={company.cnpj}>
                  <h4>{company.fantasy_name}</h4>
                  <p>{company.name}</p>
                  <p>CNPJ: {company.cnpj}</p>
                  <p>Abertura: {converteAbertura(company.opening_date)}</p>
                  <p>Email: {company.email}</p>
                  <p>Contato: {company.telephone}</p>
                  <p>
                    {company.city} / {company.state} - {company.zip_code}
                  </p>
                  <div className={styles.crud}>
                    <ActionButton
                      type="edit"
                      onClick={() => EDIT_COMPANY(company)}
                    />
                    <ActionButton
                      type="delete"
                      onClick={() => clickDelete(company.cnpj)}
                    />
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
