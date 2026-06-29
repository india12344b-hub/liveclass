import { createContext, useContext, useMemo, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const [token, setToken] = useState(() => localStorage.getItem('accessToken'));

  const login = async (payload) => {
    const { data } = await api.post('/auth/login', payload);
    const authData = data.data;
    setUser(authData.user);
    setToken(authData.accessToken);
    localStorage.setItem('user', JSON.stringify(authData.user));
    localStorage.setItem('accessToken', authData.accessToken);
    return authData;
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    const authData = data.data;
    setUser(authData.user);
    setToken(authData.accessToken);
    localStorage.setItem('user', JSON.stringify(authData.user));
    localStorage.setItem('accessToken', authData.accessToken);
    return authData;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  };

  const value = useMemo(() => ({ user, token, login, register, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
