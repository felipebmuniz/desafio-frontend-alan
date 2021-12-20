import React from 'react';
import Button from '../Forms/Button';
import MaskInput from '../Forms/MaskInput';
import styles from './AddCompany.module.css';

const AddCompany = ({ inputs, handleSubmit }) => {
  return (
    <form className={`${styles.addCompany} animeLeft`} onSubmit={handleSubmit}>
      <h2>Cadastro de Empresa</h2>
      <MaskInput
        label="Telefone"
        name="phone"
        mask="(99) 9 9999-9999"
        {...inputs.phone}
      />
      <MaskInput
        label="CNPJ"
        name="cnpj"
        mask="99.999.999/9999-99"
        {...inputs.cnpj}
      />
      <MaskInput label="CEP" name="cep" mask="99999-999" {...inputs.cep} />
      <Button>Cadastrar</Button>
    </form>
  );
};

export default AddCompany;
