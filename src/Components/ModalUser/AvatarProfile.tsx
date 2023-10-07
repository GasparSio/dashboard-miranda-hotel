import React, { useState, ChangeEvent } from 'react';
import Avatar from 'react-avatar';
import profileImage from '../../Img/18942381.jpg';
// import { useAuth } from '../Login-Logout/auth';

interface AvatarProfileProps {
  setSelectedAvatarUrl: (url: string) => void;
}

export const AvatarProfile: React.FC<AvatarProfileProps> = ({ setSelectedAvatarUrl }) => {
    const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem("avatarImage") || profileImage); // Ruta de la imagen por defecto
    
    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

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
          const input = document.getElementById('avatarInput') as HTMLInputElement;
          if (input) {
            input.click();
          }
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

