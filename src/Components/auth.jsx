import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  const login = ({ username }) => {
    setUser({ username });
    navigate('/home');
  };
  
  const logout = () => {
    setUser(null);
    navigate('/');
  };
  
  const auth = { user, login, logout };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const auth = React.useContext(AuthContext);
  return auth;
}