import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImage from '../../Img/18942381.jpg';
import { resetStatus } from '../../features/login/loginSlice';

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

interface AuthContextType {
  authState: AuthState;
  login: (userData: { password: string; email: string }) => void;
  logout: () => void;
  updateUser: (password: string, email: string, image: string) => void;
  ModalOpen: () => void;
  ModalClose: () => void;
  openModal: boolean;
}


interface AuthState {
  isAuthenticated: boolean;
  password: string | null;
  email: string | null;
  image: string;
}

const initialState: AuthState  = {
  isAuthenticated: false,
  email: null,
  password: null,
  image: profileImage,
}

type AuthAction =
  | { type: 'login'; payload: { password: string; email: string } }
  | { type: 'logout' }
  | { type: 'updateuser'; payload: { password: string; email: string; image: string } };


  const authReducer = (state: AuthState, action: AuthAction) => {
    switch (action.type) {
      case 'login':
        return { isAuthenticated: true, password: action.payload.password, email: action.payload.email, image: initialState.image };
      case 'logout':
        return { isAuthenticated: false, password: null, email: null, image: initialState.image };
      case 'updateuser':
        return { isAuthenticated: true, password: action.payload.password, email: action.payload.email, image: action.payload.image };
      default:
        return state;
    }
  };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Cargar la información de inicio de sesión desde localStorage
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      dispatch({ type: 'login', payload: { password: user.password, email: user.email } });
    }

  }, []);

  //funcion de login
  const login = ({ password, email }: { password: string; email: string }) => {
    dispatch({ type: 'login', payload: { password, email } });
    navigate('/home/dashboard');
    localStorage.setItem("loggedInUser", JSON.stringify({ password, email }));
    console.log(password, email);
  };

  //funcion de logout
  const logout = () => {
    dispatch({ type: 'logout' });
    
    navigate('/login');
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
  };
  const ModalOpen = () => {
    setOpenModal(true)
  };
  const ModalClose = () => {
    setOpenModal(false)
  };
  const updateUser = (password: string, email: string, image: string) => {
    dispatch({type: 'updateuser', payload: { password, email, image }})
    localStorage.setItem("loggedInUser", JSON.stringify({ 
      password: password || authState.password, 
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
  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return authContext;
};