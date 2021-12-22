import axios from 'axios';

export async function GET_ESTADOS(setValue) {
  try {
    const { data } = await axios.get(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
    );
    setValue(data);
  } catch (err) {
    alert('Erro ao obter dados da API IBGE Estados');
  }
}

export async function GET_MUNICIPIOS(setValue, UF) {
  try {
    if (UF === '') {
      const { data } = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/municipios',
      );
      setValue(data);
    } else {
      const { data } = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`,
      );
      setValue(data);
    }
  } catch (err) {
    console.log(err);
  }
}
