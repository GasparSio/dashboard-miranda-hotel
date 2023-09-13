import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImage from '../Img/18942381.jpg'

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = React.useState(null);
  const [authName, setAuthName] = React.useState('Username');
  const [authEmail, setAuthEmail] = React.useState('Email');
  const [avatarImage, setAvatarImage] = React.useState(profileImage);


  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedUserProfileName = localStorage.getItem('userprofilename');
    if (storedUserProfileName) {
      setAuthName(JSON.parse(storedUserProfileName));
    }
    const storedUserProfileEmail = localStorage.getItem('userprofileemail');
    if (storedUserProfileEmail) {
      setAuthEmail(JSON.parse(storedUserProfileEmail));
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
  const ModalOpen = () => {
    setOpenModal(true)
  }
  const ModalClose = () => {
    setOpenModal(false)
  }
  const ChangeName = ({name}) => {
    setAuthName(name)
    localStorage.setItem('userprofilename', JSON.stringify(name));
  }
  const ChangeEmail = ({email}) => {
    setAuthEmail(email)
    localStorage.setItem('userprofileemail', JSON.stringify(email));
  }
  const AvatarImageProfile = ({avatarUrl}) => {
    setAvatarImage(avatarUrl)
  }

  const auth = { 
    user,
     login,
     logout,
     ModalOpen,
     ModalClose,
     openModal,
     ChangeName,
     ChangeEmail,
     authName,
     authEmail, 
     AvatarImageProfile, 
     avatarImage 
};
    
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