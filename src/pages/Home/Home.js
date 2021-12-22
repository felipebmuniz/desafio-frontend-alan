import React from 'react';
import Select from '../../components/Forms/Select';
import Header from '../../components/Header/Header';
import ActionButton from '../../components/ActionButton/ActionButton';
import useForm from '../../hooks/useForm';
import AddCompany from '../../components/Company/AddCompany';
import {
  DELETE_COMPANY,
  EDIT_COMPANY,
  GET_CNPJ,
  GET_COMPANIES,
  POST_COMPANY,
} from '../../services/endpointsCompany';
import { GET_ESTADOS, GET_MUNICIPIOS } from '../../services/endpointsIBGE';
import { CgCloseR } from 'react-icons/cg';
import styles from './Home.module.css';
import stylesInp from '../../components/Forms/Input.module.css';
import stylesBtn from '../../components/Company/AddCompany.module.css';

function converteAbertura(opening) {
  const reData = opening.split('T').slice(0, -1);
  return reData[0].split('-').reverse().join('/');
}

const Home = () => {
  const [companies, setCompanies] = React.useState([]);
  const [addCompany, setAddCompany] = React.useState(false);

  const [cidades, setCidades] = React.useState(null);
  const [estados, setEstados] = React.useState(null);
  const [selectEstado, setSelectEstado] = React.useState('');
  const [selectCidade, setSelectCidade] = React.useState('');

  const [state, setState] = React.useState({ disabled: false });
  const [actionAdd, setActionAdd] = React.useState(false);

  const [companyEdit, setCompanyEdit] = React.useState(null);

  const [busca, setBusca] = React.useState('');

  const [filter, setFilter] = React.useState(null);

  const buscaCompanies = React.useMemo(() => {
    return busca === ''
      ? filter
        ? filter
        : companies
      : companies.filter((company) =>
          company.name.toLowerCase().includes(busca.toLowerCase()),
        );
  }, [busca, companies, filter]);

  const [activeClose, setActiveClose] = React.useState(null);

  const phone = useForm();
  const CNPJ = useForm();
  const CEP = useForm();
  const fantasy = useForm();
  const name = useForm();
  const email = useForm();
  const opening = useForm();
  const city = useForm();
  const UF = useForm();

  function clearForm() {
    CNPJ.setValue('');
    phone.setValue('');
    CEP.setValue('');
    fantasy.setValue('');
    name.setValue('');
    email.setValue('');
    opening.setValue('');
    city.setValue('');
    UF.setValue('');
  }

  function editForm(companyEdit) {
    CNPJ.setValue(companyEdit.cnpj);
    phone.setValue(companyEdit.telephone);
    CEP.setValue(companyEdit.zip_code);
    fantasy.setValue(companyEdit.fantasy_name);
    name.setValue(companyEdit.name);
    email.setValue(companyEdit.email);
    opening.setValue(companyEdit.opening_date);
    city.setValue(companyEdit.city);
    UF.setValue(companyEdit.state);
  }

  React.useEffect(() => {
    GET_COMPANIES(setCompanies);
    GET_ESTADOS(setEstados);
  }, []);

  React.useEffect(() => {
    GET_MUNICIPIOS(setCidades, selectEstado);
  }, [selectEstado]);

  function filterCompanies() {
    if (selectEstado === '' && selectCidade === '') {
      setFilter(companies);
    } else if (selectEstado !== '' && selectCidade !== '') {
      const filterCompany = companies.filter(
        (company) =>
          company.state === selectEstado &&
          company.city.toLowerCase() === selectCidade.toLowerCase(),
      );
      setFilter(filterCompany);
    } else if (selectEstado !== '' && selectCidade === '') {
      const filterCompany = companies.filter(
        (company) => company.state === selectEstado,
      );
      setFilter(filterCompany);
    } else {
      const filterCompany = companies.filter(
        (company) => company.city.toLowerCase() === selectCidade.toLowerCase(),
      );
      setFilter(filterCompany);
    }

    selectEstado === '' && selectCidade === ''
      ? setActiveClose(null)
      : setActiveClose(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
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

  async function handleSubmitEdit(event) {
    event.preventDefault();
    const companiExists = companies.findIndex(
      (company) => company.cnpj === companyEdit.cnpj,
    );
    if (companiExists === -1) {
      return alert('Companhia não existe.');
    }
    const data = await EDIT_COMPANY(
      {
        name: name.value,
        fantasy_name: fantasy.value,
        cnpj: CNPJ.value,
        opening_date: opening.value,
        email: email.value,
        telephone: phone.value,
        city: city.value,
        state: UF.value,
        zip_code: CEP.value,
      },
      companyEdit.id,
    );
    const aux = companies.map((company) =>
      company.id === data.id ? data : company,
    );

    setCompanies(aux);
    setCompanyEdit(null);
    clearForm();
    setAddCompany(false);
  }

  function clickEdit(company) {
    setState({ disabled: false });
    setActionAdd(false);
    setAddCompany(true);
    setCompanyEdit(company);
    editForm(company);
  }

  function clickDelete(id) {
    const conf = window.confirm('Deseja deletar a companhia?');
    if (conf) {
      const companiExists = companies.findIndex(
        (company) => company.cnpj === id,
      );
      if (companiExists === -1) {
        return alert('Companhia não existe.');
      }

      DELETE_COMPANY(companies[companiExists].id);
      const aux = companies.filter((comany) => comany.cnpj !== id);
      setCompanies(aux);
    }
  }

  return (
    <section className="animeLeft">
      <Header />
      <section className={styles.home}>
        {addCompany && (
          <AddCompany
            id="addcompany"
            inputs={{
              phone,
              CNPJ,
              CEP,
              fantasy,
              name,
              email,
              opening,
              city,
              UF,
            }}
            handleSubmit={actionAdd ? handleSubmit : handleSubmitEdit}
            state={state}
            action={actionAdd}
            setModal={setAddCompany}
          />
        )}

        <h1 className="title">Suas Companhias</h1>
        <h2>Listagem das Companhias</h2>

        <div className={styles.filter}>
          {estados && (
            <Select
              type="Estado"
              options={estados}
              value={selectEstado}
              setValue={setSelectEstado}
            />
          )}

          {cidades && (
            <Select
              type="Cidade"
              options={cidades}
              value={selectCidade}
              setValue={setSelectCidade}
            />
          )}

          <div className={styles.closeFilter}>
            <ActionButton type="filter" onClick={filterCompanies} />
            {activeClose && (
              <div className={stylesBtn.btnClose}>
                <span
                  className={stylesBtn.close}
                  onClick={() => {
                    setSelectCidade('');
                    setSelectEstado('');
                    setFilter(companies);
                    setActiveClose(false);
                  }}
                >
                  {' '}
                  <CgCloseR />
                  <p>Limpar</p>
                </span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.areaAction}>
            <div className={styles.inputArea}>
              <input
                type="text"
                value={busca}
                onChange={({ target }) => setBusca(target.value)}
                className={stylesInp.input}
                placeholder="Busca pelo nome da Companhia..."
              />
            </div>

            <ActionButton
              type="add"
              onClick={() => {
                setAddCompany(true);
                setState({ disabled: true });
                setActionAdd(true);
                clearForm();
              }}
            />
          </div>

          <div className={styles.container}>
            {buscaCompanies.map((company) => (
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
                    onClick={() => clickEdit(company)}
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
