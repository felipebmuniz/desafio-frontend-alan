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
  console.log(strCNPJ);
  const { data } = await axios
    .get(`https://www.receitaws.com.br/v1/cnpj/${strCNPJ}`)
    .catch((err) => {
      console.error('ops! ocorreu um erro' + err);
    });

  console.log(data);
  return data;
}

// 33.659.245/0001-84
export async function POST_COMPANY({
  nome,
  fantasia,
  cnpj,
  abertura,
  email,
  telefone,
  municipio,
  uf,
  cep,
}) {
  const response = await api.post('companies', {
    name: nome,
    fantasy_name: fantasia,
    cnpj: cnpj,
    opening_date: abertura.split('/').reverse().join('-'),
    email: email,
    telephone: telefone,
    city: municipio,
    state: uf,
    zip_code: cep,
  });
  return response.data;
}

export function EDIT_COMPANY(value) {}

export async function DLETE_COMPANY(id) {
  const response = await api.delete(`companies/${id}`);
  console.log(response);
}
