import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = ({ username }) => {
    setUser({ username });
    localStorage.setItem('user', JSON.stringify({ username }));
    navigate('/home/dashboard');
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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