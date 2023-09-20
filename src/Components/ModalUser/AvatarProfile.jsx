import React, { useState } from 'react';
import Avatar from 'react-avatar';
import profileImage from '../../Img/18942381.jpg';
// import { useAuth } from '../Login-Logout/auth';

export const AvatarProfile = ({ setSelectedAvatarUrl }) => {
    // const auth = useAuth()
    const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem("avatarImage") || profileImage); // Ruta de la imagen por defecto
    
    const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file) {
        const imageUrl = URL.createObjectURL(file);
        setAvatarUrl(imageUrl);
        setSelectedAvatarUrl(imageUrl);
        localStorage.setItem('avatarImage', imageUrl);
        console.log("avatar", avatarUrl, "avatar2", imageUrl);
    }
    };

  return (
    <div>
      <Avatar
        src={avatarUrl}
        round
        onClick={() => {
          document.getElementById('avatarInput').click();
        }}
      />
      <input
        type="file"
        id="avatarInput"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleAvatarChange}
      />
    </div>
  );
};
