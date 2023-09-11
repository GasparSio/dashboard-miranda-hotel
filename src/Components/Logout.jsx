import React from 'react';
import { useAuth } from './auth';

export const Logout = () => {
    const auth = useAuth();

  const logout = (e) => {
    e.preventDefault();
    auth.logout();
  };
  
  return (
    <>
      <form onSubmit={logout}>
        <button type="submit">Salir</button>
      </form>
    </>
  );
}