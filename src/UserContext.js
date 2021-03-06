import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from './services/api';
// import jwt_decode from 'jwt-decode';

export const UserContext = React.createContext();

export const UserStrorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [session, setSession] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setSession(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      // var token = window.localStorage.getItem('token');
      // var decode = jwt_decode(token, { header: true });
      // console.log(decode);
      window.localStorage.removeItem('token');
      navigate('/');
    },
    [navigate],
  );

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  async function getUser(token) {
    const dataRes = await api.get('users').catch((err) => {
      console.error('ops! ocorreu um erro' + err);
    });
    setData(dataRes.data);
    setLogin(true);
  }

  async function userLogin(email, password) {
    try {
      setError(null);
      setLoading(true);
      const dataRes = await api.post('session', {
        email,
        password,
      });
      if (dataRes.status !== 200)
        throw new Error(`Error: ${dataRes.statusText}`);
      const { token } = await dataRes.data;
      const { user } = await dataRes.data;
      window.localStorage.setItem('token', token);
      setSession(user);
      await getUser(token);
      // sessionUser();
      navigate('/home');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider
      value={{
        userLogin,
        userLogout,
        data,
        session,
        login,
        loading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Modificar a valida????o do usu??rio para ser via token
// N??o possu?? uma rota para a autentica??~ao do token
// Atualmente passando um filter para verificar o usu??rio que est?? sendo logado
