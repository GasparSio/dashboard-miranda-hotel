import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthContextType {
  authState: AuthState;
  login: (userData: { password: string; email: string }) => void;
  logout: () => void;
  updateUser: (password: string, email: string, image: string, username: string) => void;
}


interface AuthState {
  isAuthenticated: boolean;
  password: string | null;
  email: string | null;
  image?: string | null;
  username?: string | null;
}
const initialImage = localStorage.getItem('image') ? localStorage.getItem('image') : 'https://robohash.org/gasparsio.png?set=any';
const initialEmail = localStorage.getItem('loggedInMailUser') ? localStorage.getItem('loggedInMailUser') : null;
const initialPassword = localStorage.getItem('loggedInPassUser') ? localStorage.getItem('loggedInPassUser') : null;
const initialUsername = localStorage.getItem('loggedInUsername') ? localStorage.getItem('loggedInUsername') : 'Username';

const initialState: AuthState  = {
  isAuthenticated: false,
  image: initialImage,
  email: initialEmail,
  password: initialPassword,
  username: initialUsername,
}

type AuthAction =
  | { type: 'login'; payload: { password: string; email: string } }
  | { type: 'logout' }
  | { type: 'updateuser'; payload: { password: string; email: string; image: string } };


  const authReducer = (state: AuthState, action: AuthAction) => {
    switch (action.type) {
      case 'login':
        return { isAuthenticated: true, password: action.payload.password, email: action.payload.email };
      case 'logout':
        return { isAuthenticated: false, password: null, email: null };
      case 'updateuser':
        return { isAuthenticated: true, password: action.payload.password, email: action.payload.email, image: action.payload.image };
      default:
        return state;
    }
  };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Cargar la información de inicio de sesión desde localStorage
  useEffect(() => {
    const loggedInMailUser = localStorage.getItem("loggedInMailUser");
    const loggedInPassUser = localStorage.getItem("loggedInPassUser");
    if (loggedInMailUser && loggedInPassUser) {
        const user = { email: loggedInMailUser, password: loggedInPassUser };
        dispatch({ type: 'login', payload: user });
    }
}, []);

  //funcion de login
  const login = ({ password, email }: { password: string; email: string }) => {
    dispatch({ type: 'login', payload: { password, email } });
    navigate('/home/dashboard');
    localStorage.setItem("loggedInMailUser", JSON.stringify({ email }));
    localStorage.setItem("loggedInPassUser", JSON.stringify({ password}));
  };

  //funcion de logout
  const logout = () => {
    dispatch({ type: 'logout' });
    navigate('/login');
    localStorage.removeItem("loggedInMailUser");
    localStorage.removeItem("loggedInPassUser");
    localStorage.removeItem("loggedInUsername");
    localStorage.removeItem("token");
  };

  const updateUser = (userData: { password: string; email: string; image: string; username: string }) => {
    dispatch({ type: 'updateuser', payload: userData });
  localStorage.setItem("loggedInMailUser", JSON.stringify({ email: userData.email }));
  localStorage.setItem("loggedInPassUser", JSON.stringify({ password: userData.password }));
  localStorage.setItem("loggedInUsername", JSON.stringify({ username: userData.username }));
  localStorage.setItem('image', userData.image);
  };


  const auth = { authState, login, logout, updateUser };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return authContext;
};