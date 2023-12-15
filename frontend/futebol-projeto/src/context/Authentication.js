// Authentication.js
import React, { createContext, useState } from 'react';

const AuthenticationContext = createContext();

const Authentication = ({ children }) => {
  const [login, setLogin] = useState(false);

  const fecharLogin = () => {
    // setBarraAberta(prevState => !prevState);
    setLogin(false)
    console.log(`Estado atual login: ${login}`)
  };
  const abrirLogin= () => {
    setLogin(true);
    console.log(`Estado atual login: ${login}`)
  }
  return (
    <AuthenticationContext.Provider value={{ login, fecharLogin, abrirLogin }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export { Authentication, AuthenticationContext }; // Exportando o contexto


//NAO TO USANDO ISSO PRA NADA ATUALMENTE