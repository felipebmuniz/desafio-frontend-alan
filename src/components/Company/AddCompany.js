import React from 'react';
import Button from '../Forms/Button';
import MaskInput from '../Forms/MaskInput';
import Input from '../Forms/Input';
import styles from './AddCompany.module.css';
import { CgCloseR } from 'react-icons/cg';

const AddCompany = ({ inputs, handleSubmit, state, action, setModal }) => {
  return (
    <section className={styles.modal}>
      <form
        className={`${styles.addCompany} animeLeft`}
        onSubmit={handleSubmit}
      >
        <div className={styles.btnClose}>
          <span
            className={styles.close}
            onClick={() => setModal((value) => !value)}
          >
            {' '}
            <p>Fechar</p>
            <CgCloseR />
          </span>
        </div>

        {action ? <h2>Cadastro de Empresa</h2> : <h2>Edição de Empresa</h2>}

        <div className={styles.inputs}>
          <MaskInput
            label="CNPJ"
            name="cnpj"
            mask="99.999.999/9999-99"
            {...inputs.CNPJ}
          />
          <MaskInput
            label="Telefone"
            name="phone"
            mask="(99) 9 9999-9999"
            {...inputs.phone}
          />
          <MaskInput label="CEP" name="cep" mask="99999-999" {...inputs.CEP} />

          {!action && (
            <>
              <Input
                label="Nome Fantasia"
                type="text"
                name="fantasy"
                disabled={state.disabled ? 'disabled' : ''}
                {...inputs.fantasy}
              />
              <Input
                label="Nome"
                type="text"
                name="name"
                disabled={state.disabled ? 'disabled' : ''}
                {...inputs.name}
              />
              <Input
                label="Email"
                type="email"
                name="email"
                disabled={state.disabled ? 'disabled' : ''}
                {...inputs.email}
              />
              <Input
                label="Data de Abertura"
                type="data"
                name="opening"
                disabled={state.disabled ? 'disabled' : ''}
                {...inputs.opening}
              />
              <Input
                label="Cidade"
                type="text"
                name="city"
                disabled={state.disabled ? 'disabled' : ''}
                {...inputs.city}
              />
              <Input
                label="Estado"
                type="text"
                name="UF"
                disabled={state.disabled ? 'disabled' : ''}
                {...inputs.UF}
              />
            </>
          )}
        </div>

        {action ? <Button>Cadastrar</Button> : <Button>Edidar</Button>}
      </form>
    </section>
  );
};

export default AddCompany;
