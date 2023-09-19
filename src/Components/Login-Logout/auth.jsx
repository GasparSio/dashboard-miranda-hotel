import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
// import profileImage from '../../Img/18942381.jpg'

const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  username: null,
  email: null,
  image: null,
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { isAuthenticated: true, username: action.payload.username, email: action.payload.email };
    case 'logout':
      return { isAuthenticated: false, username: null, email: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Cargar la información de inicio de sesión desde localStorage
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      dispatch({ type: 'login', payload: { username: user.username } });
    }
  }, []);

  //funcion de login
  const login = ({ username, email }) => {
    dispatch({ type: 'login', payload: { username, email } });
    navigate('/home/dashboard');
    localStorage.setItem("loggedInUser", JSON.stringify({ username, email }));
    console.log(username, email);
  };

  //funcion de logout
  const logout = () => {
    dispatch({ type: 'logout' });
    navigate('/');
    localStorage.removeItem("loggedInUser");
  };

  const auth = { authState, login, logout };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  return useContext(AuthContext);
};