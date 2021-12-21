import React from 'react';

const ListCompanies = () => {
  return (
    <>
      {companies &&
        companies.map((company) => (
          <div className={styles.company} key={company.id}>
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
              <ActionButton type="edit" onClick={() => EDIT_COMPANY(company)} />
              <ActionButton
                type="delete"
                onClick={() => clickDelete(company.id)}
              />
            </div>
          </div>
        ))}
    </>
  );
};

export default ListCompanies;
