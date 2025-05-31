import React from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = React.useState(() => {
    const usuarioLocal = localStorage.getItem('usuario');
    return usuarioLocal ? usuarioLocal : null;
  });

  React.useEffect(() => {
    localStorage.setItem('usuario', usuario);
  }, [usuario]);

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
