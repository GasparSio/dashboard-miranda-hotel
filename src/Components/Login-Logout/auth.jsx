import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImage from '../../Img/18942381.jpg'

const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  username: null,
  email: null,
  image: profileImage,
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { isAuthenticated: true, username: action.payload.username, email: action.payload.email };
    case 'logout':
      return { isAuthenticated: false, username: null, email: null };
    case 'updateuser':
      console.log("updateuser Reducer, estados: ", state.username, state.email, state.image);
      return {isAuthenticated: true,  username: action.payload.username, email: action.payload.email, image: action.payload.image };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Cargar la información de inicio de sesión desde localStorage
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      dispatch({ type: 'login', payload: { username: user.username, email: user.email } });
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
    navigate('/login');
    localStorage.removeItem("loggedInUser");
  };
  const ModalOpen = () => {
    setOpenModal(true)
  };
  const ModalClose = () => {
    setOpenModal(false)
  };
  const updateUser = (username, email, image) => {
    dispatch({type: 'updateuser', payload: { username, email, image }})
    localStorage.setItem("loggedInUser", JSON.stringify({ 
      username: username || authState.username, 
      email: email || authState.email,
    }));
    localStorage.getItem("avatarImage")
    console.log("localstorage in updateusers:", localStorage.getItem("avatarImage"));
  };


  const auth = { authState, login, logout, ModalOpen, ModalClose, updateUser, openModal };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  return useContext(AuthContext);
};