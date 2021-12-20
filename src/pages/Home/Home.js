import React from 'react';
import Select from '../../components/Forms/Select';
import Header from '../../components/Header/Header';
import api from '../../services/api';
// import { UserContext } from '../../UserContext';
import styles from './Home.module.css';
import { BiFilterAlt, BiAddToQueue, BiTrashAlt, BiEdit } from 'react-icons/bi';
import MaskInput from '../../components/Forms/MaskInput';
import useForm from '../../hooks/useForm';
import Button from '../../components/Forms/Button';
import axios from 'axios';

const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');

const Home = () => {
  // const { data, session, userSession } = React.useContext(UserContext);
  // const [user, setUser] = React.useState([]);
  const [companies, setCompanies] = React.useState([]);
  const [addCompany, setAddCompany] = React.useState(false);

  const [cidade, setCidade] = React.useState('');

  const phone = useForm();
  const cnpj = useForm();
  const cep = useForm();

  React.useEffect(() => {
    GET_COMPANIES(setCompanies);
  }, [setCompanies]);

  async function GET_COMPANIES(setValue) {
    const response = await api.get('companies').catch((err) => {
      console.error('ops! ocorreu um erro' + err);
    });
    setValue(response.data);
    console.log(response.data);
  }

  async function POST_COMPANY(value) {
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
    } = await GET_CNPJ(value);

    await api
      .post('companies', {
        name: nome,
        fantasy_name: fantasia,
        cnpj: cnpj,
        opening_date: abertura,
        email: email,
        telephone: telefone,
        city: municipio,
        state: uf,
        zip_code: cep,
      })
      .then((response) => console.log(response))
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err);
      });
  }

  async function GET_CNPJ(value) {
    const strCNPJ = onlyNumbers(value);
    const { data } = await axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.receitaws.com.br/v1/cnpj/${strCNPJ}`,
      )
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err);
      });

    return data;
  }

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
          <span className={styles.ActionBtn} onClick={filterCompanies}>
            <BiFilterAlt />
          </span>
        </div>

        <div className={styles.content}>
          <div className={styles.addContainer}>
            <span
              className={styles.ActionBtn}
              onClick={() => setAddCompany(!addCompany)}
            >
              <BiAddToQueue />
            </span>
          </div>
          <form
            className={`${
              addCompany ? styles['addCompany'] : styles['none']
            } animeLeft`}
            onSubmit={handleSubmit}
          >
            <h2>Cadastro de Empresa</h2>
            <MaskInput
              label="Telefone"
              name="phone"
              mask="(99) 9 9999-9999"
              {...phone}
            />
            <MaskInput
              label="CNPJ"
              name="cnpj"
              mask="99.999.999/9999-99"
              {...cnpj}
            />
            <MaskInput label="CEP" name="cep" mask="99999-999" {...cep} />
            <Button>Cadastrar</Button>
          </form>
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
                  <span
                    className={styles.ActionBtn}
                    onClick={() => setAddCompany(!addCompany)}
                  >
                    <BiEdit />
                  </span>
                  <span
                    className={styles.ActionBtn}
                    onClick={() => setAddCompany(!addCompany)}
                  >
                    <BiTrashAlt />
                  </span>
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
