import axios from 'axios';
import api from './api';

const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');

export async function GET_COMPANIES(setValue) {
  const response = await api.get('companies').catch((err) => {
    console.error('ops! ocorreu um erro' + err);
  });
  setValue(response.data);
}

export async function GET_CNPJ(value) {
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

export async function POST_COMPANY(value) {
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

export function EDIT_COMPANY(value) {}

export function DLETE_COMPANY(value) {}
