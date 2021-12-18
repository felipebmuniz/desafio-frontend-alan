import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from './services/api';

export const UserContext = React.createContext();

export const UserStrorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
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
          // if (!response.ok) throw new Error('Token inválido');
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
    await api
      .get('users')
      .then(({ data }) => setData(data))
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err);
      });
    setLogin(true);
  }

  async function userLogin(email, password) {
    try {
      setError(null);
      setLoading(true);
      const tokenRes = await api.post('session', {
        email,
        password,
      });
      if (tokenRes.status !== 200)
        throw new Error(`Error: ${tokenRes.statusText}`);
      const { token } = await tokenRes.data;
      window.localStorage.setItem('token', token);
      await getUser(token);
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
      value={{ userLogin, userLogout, data, login, loading, error }}
    >
      {children}
    </UserContext.Provider>
  );
};
